<script setup lang="ts">
	import { onMounted, ref, watch } from 'vue';
	import { getCheckMusic, getSongDetail, getSongUrlV1 } from '../http/http';
	import { songStore } from '../store/user';
	import { fromaTime, b0 } from '../util/index';
	const songID = songStore(); // 音乐id
	const urlRef = ref(''); // 音乐url
	const audioDom = ref<any>(); // DOM
	const songInfoRef = ref<any>(); // 歌曲信息
	const currentDate = ref('');
	const widthRef = ref(0); // 进度条
	const state = ref(false); // 是否真正播放
	onMounted(() => {
		if (audioDom.value && songID.id) {
			audioDom.value.addEventListener('canplaythrough', () => {
				audioDom.value.play();
			});
		}
		// 歌曲播放时触发
		audioDom.value.addEventListener('timeupdate', () => {
			widthRef.value =
				(Math.round(audioDom.value.currentTime * 1000) / songInfoRef.value.dt) * 100;
			currentDate.value = fromaTime(audioDom.value.currentTime * 1000);
		});

		// 播放
		audioDom.value.addEventListener('play', () => {
			state.value = true;
		});

		// 暂停
		audioDom.value.addEventListener('pause', () => {
			state.value = false;
		});

		audioDom.value.addEventListener('ended', () => {
			next();
		});
	});
	watch(songID, async () => {
		if (!Array.isArray(songID.id)) {
			console.log(songID.id);

			playMuisic(songID.id);
		} else {
			console.log(123);

			playMuisic(songID.id[songID.index].id);
		}
	});

	// 播放音乐
	async function playMuisic(id: string) {
		const res: any = await getCheckMusic(id); // 检查音乐是否可以播放
		if (res.data.success) {
			const url = await getSongUrlV1(id); // 获取音乐url
			const songInfo = await getSongDetail(id); // 获取音乐信息
			songInfoRef.value = songInfo.data.songs[0];
			urlRef.value = url.data.data[0].url;
			currentDate.value = '';
		}
	}

	// 上一首
	const prev = () => {
		if (Array.isArray(songID.id)) {
			if (songID.index >= 1) {
				songID.index--;
			}
		}
	};

	// 下一首
	const next = () => {
		if (Array.isArray(songID.id)) {
			if (songID.index <= songID.id.length) {
				songID.index++;
			}
		}
	};

	// 格式化歌手名字
	const formatAr = (ar: any[]) => {
		let str = '';
		if (ar.length === 1) {
			return ar[0].name;
		}
		ar.forEach((item, i) => {
			str += item.name;
			if (i !== ar.length - 1) {
				str += '/';
			}
		});
		return str;
	};

	const changeState = (s: boolean) => {
		if (s === false) {
			audioDom.value.pause();
			state.value = s;
		} else if (s === true && songID.id) {
			state.value = s;
			audioDom.value.play();
		}
	};
</script>
<template>
	<div class="play-wrapper">
		<div class="info-box">
			<div class="info">
				<img :src="!!songInfoRef ? songInfoRef.al.picUrl : `/src/assets/logo.png`" alt="" />
			</div>
			<div class="user">
				<div class="title">{{ songInfoRef ? songInfoRef.name : '暂无' }}</div>
				<div class="name">{{ songInfoRef ? formatAr(songInfoRef.ar) : '暂无' }}</div>
			</div>
		</div>
		<div class="control">
			<div class="btn">
				<div @click="prev" class="prev">
					<i class="iconfont icon">&#xe603;</i>
				</div>
				<div class="start">
					<!-- 播放 -->
					<i v-if="state === false" class="iconfont icon" @click="changeState(true)"
						>&#xe87c;</i
					>
					<!-- 暂停 -->
					<i v-else class="iconfont icon" @click="changeState(false)">&#xe67b;</i>
				</div>
				<div @click="next" class="last">
					<i class="iconfont icon">&#xe602;</i>
				</div>
			</div>
			<div class="line">
				<div>{{ currentDate ? b0(currentDate) : '00:00' }}</div>
				<div class="tiao">
					<div class="bg"></div>
					<div class="active" :style="{ width: `${widthRef}%` }"></div>
				</div>
				<div>{{ songInfoRef ? b0(fromaTime(songInfoRef.dt)) : '00:00' }}</div>
			</div>
		</div>
		<div>
			<audio ref="audioDom" :src="urlRef" autoplay>您的浏览器不支持 audio 元素。</audio>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.play-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		box-sizing: border-box;
		padding: 0 0.2rem;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1rem;
		background-color: rgb(33, 33, 36);
		border-top: 0.01rem solid rgb(57, 57, 57);
		.info-box {
			width: 3rem;
			height: 100%;
			font-size: 0.18rem;

			display: flex;
			align-items: center;
			.info {
				width: 0.7rem;
				height: 0.7rem;
				margin-right: 0.1rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.user {
				color: rgb(181, 181, 181);
				.title {
					padding-bottom: 0.1rem;
				}
			}
		}
		.control {
			font-size: 0.14rem;
			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				& > div {
					padding-bottom: 0.2rem;
					border-radius: 50%;
					width: 0.4rem;
					height: 0.2rem;
					text-align: center;
					background-color: rgb(76, 76, 76);
					.icon {
						line-height: 0.4rem;
						cursor: pointer;
						color: rgb(240, 240, 240);
					}
				}
				.start {
					margin: 0 0.5rem;
				}
			}
			.line {
				color: #fff;
				display: flex;
				padding-top: 0.1rem;
				align-items: center;
				.tiao {
					position: relative;
					width: 6rem;
					margin: 0 0.1rem;
					height: 0.03rem;
					.bg {
						width: 100%;
						height: 100%;
						background-color: #fff;
					}
					.active {
						position: absolute;
						height: 100%;
						width: 0.1%;
						top: 0;
						background-color: rgb(236, 65, 65);
					}
				}
				.tiao:hover {
					height: 0.07rem;
				}
			}
		}
	}
</style>
