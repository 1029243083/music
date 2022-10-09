<script lang="ts" setup>
	import SongList from '../components/c-songList.vue';
	import Comment from '../components/c-comment.vue';
	import CommentList from '../components/c-commentList.vue';
	import Collectors from '../components/c-Collectors.vue';
	import { ref } from 'vue';
	import {
		getCommentPlayList,
		GetdgDetail,
		getPlaylistSubscribers,
		getSongDetail
	} from '../http/http';
	import { useRoute } from 'vue-router';
	import { fromatDate } from '../util/index';
	import { songStore } from '../store/user';
	const route = useRoute();
	const songID = songStore();
	const navItem = ['歌曲列表', '评论', '收藏者'];
	const curIndex = ref(0); // tabs当前选择
	const changeNav = (i: number) => {
		// 点击tabs
		curIndex.value = i;
	};

	const info = ref<any>(null); // 歌单信息
	const songDetailRef = ref<any[]>([]); // 歌曲信息
	const comments = ref<any[]>([]); // 评论信息
	const collectors = ref<any[]>([]); // 收藏者信息

	// 歌曲的
	let limit = 30; // 一次取30条歌曲数据
	let page = 0; // 第一次从0开始取
	let trackIds: any[] = []; // 歌曲全部的ID

	// 评论的
	let commentLimit = 30;
	let commentOffset = 1;

	// 歌单收藏者
	let CollectorsLimit = 30;
	let CollectorsOffset = 1;

	// 计算播放量
	function getPalyNum(num: number) {
		if (num === undefined) {
			return;
		}
		if (10000000 / num > 1) {
			return (10000000 / num).toFixed(2) + '亿';
		}
		if (10000 / num > 1) {
			return (10000 / num).toFixed(2) + '万';
		}
		return num + '万';
	}
	// 歌单id
	const id = route.query.id as unknown as number;

	// 获取数据
	async function getData(id: number) {
		const res = await GetdgDetail(id);

		trackIds = res.data.playlist.trackIds;
		info.value = res.data.playlist;
		getSongInfo(trackIds);
		getCommentInfo(id);
		getPlaylistSubscribersInfo(id);
	}

	// 格式化请求歌曲详情的参数
	function getSongDetailData(arr: any[]) {
		const ids = arr.slice(page, limit);
		// 发送请求
		let str = '';

		ids.forEach((item, index) => {
			str += item.id;
			if (index !== ids.length - 1) {
				str += ',';
			}
		});
		return str;
	}

	// 播放全部
	function playAll() {
		songID.id = info.value.trackIds;
		songID.index = 0;
	}

	// 滚动条到底
	function scroll(e: any) {
		if (e.target) {
			const { scrollTop, scrollHeight, clientHeight } = e.target;
			const disY = scrollHeight - scrollTop - clientHeight;
			if (disY === 0 && curIndex.value === 0) {
				// 歌曲
				if (limit > trackIds.length) {
					return;
				}
				page = limit;
				limit = limit * 2;
				getSongInfo(trackIds);
			} else if (disY === 0 && curIndex.value === 1) {
				// 评论
				commentOffset++;
				getCommentInfo(info.value.id);
			} else if (disY === 0 && curIndex.value === 2) {
				CollectorsOffset++;
				getPlaylistSubscribersInfo(info.value.id);
			}
		}
	}

	// 获取歌曲数据
	async function getSongInfo(trackIds: any[]) {
		const str = getSongDetailData(trackIds);
		const songDetail = await getSongDetail(str);
		songDetailRef.value = [...songDetailRef.value, ...songDetail.data.songs];
	}

	// 获取评论数据
	async function getCommentInfo(id: number) {
		const comment = await getCommentPlayList(
			id,
			commentLimit,
			(commentOffset - 1) * commentLimit
		);
		comments.value = [...comments.value, ...comment.data.comments];
	}

	// 获取歌单收藏者
	async function getPlaylistSubscribersInfo(id: number) {
		const res = await getPlaylistSubscribers(
			id,
			CollectorsLimit,
			(CollectorsOffset - 1) * CollectorsLimit
		);
		collectors.value = [...collectors.value, ...res.data.subscribers];
	}
	getData(id);
</script>
<template>
	<div class="wrapper" @scroll="scroll">
		<div v-if="info" class="top">
			<div class="left">
				<img :src="info.coverImgUrl" alt="" />
			</div>
			<div class="info">
				<div class="title-box">
					<div class="tag">歌单</div>
					<div class="title">{{ info.name }}</div>
				</div>
				<div v-show="info.creator" class="user-box">
					<div class="user">
						<img :src="info.coverImgUrl" alt="" />
						<div class="name">{{ info.creator ? info.creator.nickname : '' }}</div>
					</div>
					<div class="timer">
						<span>最近更新：{{ fromatDate(info.updateTime) }}</span>
					</div>
				</div>
				<div class="btn-box">
					<div @click="playAll" class="play-all">播放全部</div>
				</div>
				<div class="song-info">
					<div>
						<div>歌曲：</div>
						<span>{{ info.trackIds.length }}</span>
					</div>
					<div>
						<div>播放：</div>
						<span>{{ getPalyNum(info.playCount) }}</span>
					</div>
				</div>
				<div class="des">
					<div>简介：</div>
					<span>{{ info.description }}</span>
				</div>
			</div>
		</div>
		<div class="main">
			<div class="nav-box">
				<ul v-if="info" class="nav">
					<li
						v-for="(item, index) in navItem"
						:key="item"
						:class="['item', { active: curIndex === index }]"
						@click="changeNav(index)"
					>
						{{ item }}{{ index === 1 ? `(${info.commentCount})` : '' }}
					</li>
				</ul>
			</div>
			<div v-show="curIndex === 0">
				<SongList :data="songDetailRef" />
			</div>
			<div v-show="curIndex === 1">
				<Comment />
				<CommentList :comments="comments" :comment-count="info && info.commentCount" />
			</div>
			<div v-show="curIndex === 2">
				<Collectors :collectors="collectors" />
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	@import '../global.scss';
	.wrapper {
		@include scroll();
		box-sizing: border-box;
		overflow-y: auto;
		padding: 0.3rem 0.3rem 0rem 0.3rem;
		.top {
			display: flex;
			.left {
				width: 2.3rem;
				height: 2.3rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.info {
				font-size: 0.15rem;
				padding-left: 0.2rem;
				color: rgb(153, 153, 153);
				.title-box {
					display: flex;
					align-items: center;
					margin-bottom: 0.1rem;
					.tag {
						border: 0.01rem solid rgb(202, 56, 56);
						color: rgb(202, 56, 56);
						padding: 0.02rem 0.05rem;
						border-radius: 0.03rem;
						margin-right: 0.06rem;
					}
					.title {
						font-size: 0.26rem;
						font-weight: bolder;
						color: rgb(208, 208, 208);
					}
				}
				.user-box {
					display: flex;
					padding-bottom: 0.17rem;
					padding-top: 0.1rem;
					align-items: center;
					.user {
						display: flex;
						align-items: center;
						img {
							width: 0.3rem;
							height: 0.3rem;
							border-radius: 50%;
							margin-right: 0.06rem;
						}
						.name {
							color: rgb(59, 136, 218);
						}
					}
					.timer {
						margin-left: 0.06rem;
					}
				}
				.btn-box {
					margin-bottom: 0.17rem;
					.play-all {
						width: 1rem;
						text-align: center;
						padding: 0.1rem 0.05rem;
						color: #fff;
						cursor: pointer;
						font-weight: bolder;
						border-radius: 0.3rem;
						background-color: rgb(236, 65, 65);
					}
				}
				.song-info {
					display: flex;
					padding-bottom: 0.17rem;
					align-items: center;
					& > div {
						display: flex;
						align-items: center;
						padding-right: 0.2rem;
					}
				}
				.des {
					display: flex;
					align-items: center;
					div {
						width: 0.5rem;
					}
					span {
						display: block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 10rem;
					}
				}
			}
		}
		.main {
			margin-top: 0.4rem;
			.nav-box {
				padding-bottom: 0.3rem;
				.nav {
					font-size: 0.2rem;
					color: #fff;
					cursor: pointer;
					display: flex;
					align-items: center;
					.item {
						font-weight: bolder;
						margin-right: 0.42rem;
						padding-bottom: 0.07rem;
						border-bottom: 0.03rem solid transparent;
						&.active {
							border-bottom: 0.03rem solid rgb(236, 65, 65);
						}
					}
				}
			}
		}
	}
</style>
