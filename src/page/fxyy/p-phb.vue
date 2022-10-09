<script setup lang="ts">
	import { AxiosResponse } from 'axios';
	import { GDresultType } from '../../http/resultTypes';
	import cCardListVue from '../../components/c-cardList.vue';
	import { ref } from 'vue';
	// import { ref } from 'vue';
	import { getPlaylistDetail, getToplist } from '../../http/http';
	import { useRouter } from 'vue-router';
	const router = useRouter();
	const topListRef = ref<any[]>();
	const autherListRef = ref<GDresultType[]>([]);
	(async () => {
		const data = (await getToplist()).data.list; // 排行榜全部数据
		const { topList, autherList } = filterTopList(data); // 官方榜4条
		await getSong(topList); // 获取歌曲
		console.log(autherList);
		autherListRef.value = autherList;
	})();

	// 筛选前4条
	function filterTopList(data: any[]) {
		const topList: any[] = [];
		const autherList: any[] = [];
		data.forEach((item: { ToplistType: any }) => {
			if (item.ToplistType !== undefined) {
				topList.push(item);
			} else {
				autherList.push(item);
			}
		});
		return {
			topList,
			autherList
		};
	}

	// 获取歌单的前5首歌，拼接数据
	async function getSong(topList: any[]) {
		const arr: Promise<AxiosResponse<any, any>>[] = [];
		topList.forEach(async item => {
			arr.push(getPlaylistDetail(item.id, 5));
		});
		const res = await Promise.all(arr);
		topList.forEach((item, index) => {
			item.songs = res[index].data.songs;
		});
		topListRef.value = topList;
	}

	// 到歌单详情页面
	function handleClick(info: any) {
		router.push('/gddetail?id=' + info.id);
	}
</script>
<template>
	<div class="wrapper">
		<div class="title">官方榜</div>
		<div class="gf">
			<div
				v-for="item in topListRef"
				:key="item.id"
				class="gf-item"
				@click="handleClick(item)"
			>
				<div class="left">
					<img :src="item.coverImgUrl" alt="" />
				</div>
				<ul class="right">
					<li v-for="(song, i) in item.songs" :key="song.id" class="song-item">
						<div :class="['index', { active: i + 1 < 4 }]">{{ i + 1 }}</div>
						<div class="title">{{ song.name }}</div>
						<div class="name">{{ song.ar[0].name }}</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="title">全球榜</div>
		<div class="GD">
			<cCardListVue :res="autherListRef" />
		</div>
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
		padding-bottom: 1rem;
		overflow: auto;
		.title {
			font-size: 0.25rem;
			font-weight: bold;
			color: #fff;
		}
		.gf {
			margin-top: 0.3rem;
			width: 90%;
			.gf-item {
				width: 100%;
				margin-bottom: 0.7rem;
				display: flex;
				align-items: center;
				.left {
					width: 2.3rem;
					height: 2.3rem;
					background-color: aqua;
					border-radius: 0.1rem;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.right {
					flex: 1;
					height: 2.3rem;
					box-sizing: border-box;
					padding-left: 0.3rem;
					font-size: 0.2rem;
					border-radius: 0.3rem;
					.song-item {
						display: flex;
						height: 0.46rem;
						line-height: 0.46rem;
						box-sizing: border-box;
						padding: 0.03rem 0rem;
						align-items: center;
						cursor: pointer;
						background-color: rgb(55, 55, 55);
						.index {
							text-align: center;
							width: 0.4rem;
							font-size: 0.16rem;
							color: #afafaf;
							&.active {
								color: rgb(236, 65, 65);
								font-weight: 800;
							}
						}
						.title {
							margin-left: 0.3rem;
							flex: 1;
							color: #d5d5d5;
							font-size: 0.16rem;
							font-weight: 500;
						}
						.name {
							text-align: right;
							margin-right: 0.2rem;
							width: 2rem;
							font-size: 0.16rem;
							color: #afafaf;
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
		}
		.GD {
			margin-top: 0.3rem;
		}
		@include scroll();
	}
</style>
