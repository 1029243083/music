<script setup lang="ts">
	import { ref } from 'vue';
	import { getVideoListById, getVideoTags } from '../http/http';
	interface categoryType {
		id: number;
		name: string;
	}
	const category = ref<categoryType[]>([]);
	const videoListRef = ref<any[]>([]);
	const currIndex = ref(0);

	async function getData() {
		const res = await getVideoTags();
		console.log(res);
		category.value = res.data.data;
		const videoList = await createPromise(5, res.data.data[0].id);

		videoListRef.value = videoList;
	}
	const changeCategory = async (index: number, id: number) => {
		currIndex.value = index;
		const videoList = await createPromise(5, id);
		videoListRef.value = videoList;
	};

	const createPromise = async (number: number, typId: number) => {
		const promiseArr = [];
		const resultArr: any[] = [];
		for (let i = 0; i < number; i++) {
			promiseArr.push(getVideoListById(typId, i * 8));
		}
		const res = await Promise.all(promiseArr);

		res.forEach(item => {
			resultArr.push(...item.data.datas);
		});
		return resultArr;
	};
	function getPalyNum(num: number) {
		if (num / 10000 > 1) {
			return (num / 10000).toFixed(2) + '万';
		}
		return num + '万';
	}
	// 格式化时间
	function formatTime(duration: number) {
		const minutes = parseInt((duration % (1000 * 60 * 60)) / (1000 * 60) + '');
		const seconds = parseInt((duration % (1000 * 60)) / 1000 + '');
		return minutes + ' : ' + seconds;
	}

	getData();
</script>
<template>
	<div class="wrapper">
		<ul class="tag-list">
			<li
				v-for="(item, index) in category"
				:key="item.id"
				:class="['tag', { active: currIndex === index }]"
				@click="changeCategory(index, item.id)"
			>
				{{ item.name }}
			</li>
		</ul>
		<ul class="video-list">
			<li v-for="(item, index) in videoListRef" :key="index" class="video">
				<div class="img-box">
					<div class="playNum pos">{{ getPalyNum(item.data.praisedCount) }}万</div>
					<img :src="item.data.coverUrl" alt="" />
					<div class="timer pos">{{ formatTime(item.data.playTime) }}</div>
				</div>
				<div class="info-box">
					<div class="title">{{ item.data.title }}</div>
					<div class="name">{{ item.data.creator.nickname }}</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<style scoped lang="scss">
	@import '../global.scss';
	.wrapper {
		@include scroll();
		width: 100%;
		box-sizing: border-box;
		padding-left: 1rem;
		height: 100%;
		padding-top: 0.5rem;
		padding-bottom: 1rem;
		overflow: auto;
		.tag-list {
			display: flex;
			justify-content: flex-end;
			flex-wrap: wrap;
			.tag {
				font-size: 0.15rem;
				color: #a7a7a7;
				cursor: pointer;
				border-right: 0.01rem solid #57575776;
				padding-right: 0.2rem;
				padding-left: 0.2rem;
				&:last-child {
					border: none;
				}
				&:hover {
					color: #fff;
				}
				&.active {
					color: rgb(236, 65, 65);
				}
			}
		}
		.video-list {
			width: 100%;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 0.5rem;
			font-size: 0.18rem;
			.video {
				width: 2.6rem;
				margin-right: 0.2rem;
				margin-bottom: 0.2rem;
			}
			.img-box {
				position: relative;
				width: 100%;
				height: 1.48rem;
				img {
					width: 100%;
					height: 100%;
				}
				.pos {
					left: 0;
					width: 100%;
					color: #fff;
					font-size: 0.15rem;
					text-align: right;
					box-sizing: border-box;
					padding: 0.02rem 0.1rem 0rem 0rem;
					position: absolute;
				}
				.playNum {
					top: 0;
					background-image: linear-gradient(to top, transparent, rgba(0, 0, 0, 0.1));
				}
				.timer {
					bottom: 0;
					background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));
				}
			}
			.info-box {
				width: 100%;
				margin-top: 0.1rem;
				.title {
					color: #fff;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 0.15rem;
				}
				.name {
					color: #a7a7a7;
					font-size: 0.14rem;
					padding-top: 0.04rem;
				}
			}
		}
	}
</style>
