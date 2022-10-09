<script setup lang="ts">
	import { ref } from 'vue';
	import { getPersonalizedNewsong } from '../../http/http';
	const dataList = ref<any[]>([]);
	(async () => {
		const res = await getPersonalizedNewsong(20);
		dataList.value = res.data.result;
	})();

	// 循环歌手显示
	function formatAr(arr: any[]) {
		if (arr.length === 1) {
			return arr[0].name;
		}
		let str = '';
		arr.forEach((item, index) => {
			if (index === 0) {
				str += `${item.name}`;
			} else {
				str += `/${item.name}`;
			}
		});
		return str;
	}

	// 格式化时间
	function formatTime(duration: number) {
		const minutes = parseInt((duration % (1000 * 60 * 60)) / (1000 * 60) + '');
		const seconds = parseInt((duration % (1000 * 60)) / 1000 + '');
		return minutes + ' : ' + seconds;
	}
</script>
<template>
	<div class="wrapper">
		<ul class="list">
			<li v-for="(item, index) in dataList" :key="item.id" class="item">
				<div class="index">{{ index + 1 }}</div>
				<div class="img-box">
					<img :src="item.picUrl" alt="" />
				</div>
				<div class="title">{{ item.name }}</div>
				<div class="name-box">{{ formatAr(item.song.artists) }}</div>
				<div class="des">{{ item.disc }}</div>
				<div class="time">{{ formatTime(item.song.duration) }}</div>
			</li>
		</ul>
	</div>
</template>
<style scoped lang="scss">
	@import '../../global.scss';
	.wrapper {
		width: 100%;
		box-sizing: border-box;
		padding-left: 1rem;
		height: 100%;
		padding-top: 0.5rem;
		overflow: auto;
		padding-bottom: 1rem;

		@include scroll();
		.list {
			width: 90%;
			padding-bottom: 2rem;
			.item {
				width: 100%;
				font-size: 0.15rem;
				display: flex;
				align-items: center;
				background-color: rgb(46, 46, 46);
				padding: 0.2rem 0.2rem;
				color: #7d7d7d;
				.index {
					width: 3%;
					text-align: center;
				}
				.img-box {
					width: 0.5rem;
					height: 0.5rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.title {
					margin-left: 0.2rem;
					width: 60%;
				}
				.name-box {
					text-align: center;
					flex: 1;
				}
				.des {
					text-align: center;
					flex: 1;
				}
				.time {
					text-align: center;
					flex: 1;
				}
				&:nth-child(even) {
					background-color: transparent;
				}
				&:hover {
					background-color: rgb(68, 68, 68);
				}
			}
		}
	}
</style>
