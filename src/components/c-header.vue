<script setup lang="ts">
	import { ref } from 'vue';
	import sign from './c-sign.vue';
	import userType from '../store/user';
	import { useStore, searchStore } from '../store/user';
	import { useRouter } from 'vue-router';
	import { getCloudsearch, getSearchSuggest } from '../http/http';
	const router = useRouter();
	const searchInfo = searchStore();
	const showSign = ref(false); // 控制登录显示/隐藏
	const userInfo = ref(useStore()); // 用户信息
	const hotList = ref<any[]>([]); // 热搜数据
	const show = ref(false);
	let timer: number | undefined = undefined;

	// 本地获取数据登录
	const autoLogin = () => {
		let userInfoStorage: userType = JSON.parse(localStorage.getItem('userInfo') || '{}');
		if (userInfoStorage !== null && userInfoStorage.userId) {
			userInfo.value.avatarUrl = userInfoStorage.avatarUrl;
			userInfo.value.nickname = userInfoStorage.nickname;
			userInfo.value.userId = userInfoStorage.userId;
		}
	};
	autoLogin();

	// 获取热搜
	async function getSearchSuggestFun() {
		const res = await getSearchSuggest();
		console.log(res);
		hotList.value = res.data.data;
	}

	// 聚集事件
	const focus = () => {
		getSearchSuggestFun();
		show.value = true;
	};

	// 失交事件
	const blur = () => {
		setTimeout(() => {
			show.value = false;
		}, 200);
	};

	// 输入事件
	const input = (e: any) => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
			console.log(e.target.value);
			const res = await getCloudsearch(e.target.value);
			console.log(res);
			res.data.result.songs.forEach((item: any) => {
				item.searchWord = item.name;
				item.content = item.al.name;
			});
			hotList.value = res.data.result.songs;
		}, 300);
	};
	const handleClick = (item: any) => {
		// console.log(item, router);
		searchInfo.keywords = item.searchWord;
		router.push('/searchdetail?keywords=' + item.searchWord);
	};
	// 关闭登录框
	const changeShowSign = (type: boolean) => {
		showSign.value = type;
	};
	// 子组件触发关闭登录框
	const close = (e: boolean) => {
		changeShowSign(e);
	};
	// 本地获取数据
</script>
<template>
	<div class="wrapper">
		<!-- logo部分 -->
		<div class="logo">
			<img src="../assets/logo.png" />
			<div class="title">易网云音乐</div>
		</div>
		<!-- 导航按钮部分 -->
		<div class="navTo">
			<div class="left">
				<i class="iconfont icon">&#xe660;</i>
			</div>
			<div class="right">
				<i class="iconfont icon">&#xe65f;</i>
			</div>
		</div>
		<!-- 搜索部分 -->
		<div class="search-box">
			<i class="iconfont icon">&#xe600;</i>
			<input
				type="text"
				placeholder="天使的翅膀"
				class="inp"
				@input="input"
				@focus="focus"
				@blur="blur"
			/>
			<div v-show="show" class="box">
				<div class="title">热搜榜</div>
				<ul class="list">
					<li
						v-for="(item, index) in hotList"
						:key="item.score"
						class="item"
						@click="handleClick(item)"
					>
						<div class="index">{{ index + 1 }}</div>
						<div class="info-box">
							<div class="name">{{ item.searchWord }}</div>
							<div class="des">{{ item.content }}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 用户登录头像 -->
		<div class="user-box">
			<div class="av">
				<i v-if="userInfo.avatarUrl === ''" class="iconfont icon">&#xe624;</i>
				<img v-else :src="userInfo.avatarUrl" alt="" />
			</div>
			<div class="user-name" @click="changeShowSign(true)">
				<div class="name">{{ userInfo.nickname ? userInfo.nickname : '未登录' }}</div>
				<i class="iconfont icon">&#xe65a;</i>
			</div>
		</div>

		<!-- 登录 -->
		<sign v-if="showSign" @close="close" />
	</div>
</template>

<style scoped lang="scss">
	@import '../global.scss';
	.wrapper {
		@include flex-center(center);
		display: flex;
		align-items: center;
		width: 100%;
		height: 0.73rem;
		background-color: #212124;
		.logo {
			@include flex-center(center);
			width: 1.58rem;
			height: 0.32rem;
			margin-left: 0.2rem;
			img {
				width: 0.3rem;
				height: 0.3rem;
				border-radius: 50%;
				overflow: hidden;
			}
			.title {
				letter-spacing: 0.03rem;
				margin-left: 0.06rem;
				font-weight: 500;
				font-size: 0.2rem;
				color: #fff;
			}
		}
		.navTo {
			@include flex-center(center);
			margin-left: 1.08rem;
			.left,
			.right {
				width: 0.3rem;
				height: 0.3rem;
				text-align: center;
				font-weight: bolder;
				border-radius: 50%;
				font-size: 0.25rem;
				background-color: #1f1f22;
				cursor: pointer;
				.icon {
					line-height: 0.23rem;
					color: #545457;
				}
			}
			.right {
				margin-left: 0.1rem;
				margin-right: 0.19rem;
			}
		}
		.search-box {
			position: relative;
			@include flex-center(center);
			width: 2rem;
			height: 0.4rem;
			box-sizing: border-box;
			padding: 0.13rem 0.25rem;
			background-color: #29292c;
			font-size: 0.16rem;
			border-radius: 0.3rem;
			.icon {
				text-align: center;
				line-height: 0.23rem;
				color: #d4d4d5;
				flex: 1;
			}
			.inp {
				flex: 4;
				overflow: hidden;
				border: none;
				outline: none;
				color: #656567;
				background-color: transparent;
			}
			.inp::placeholder {
				color: #666668;
			}
			.box {
				@include scroll();
				position: absolute;
				top: 150%;
				left: 0;
				z-index: 999;
				border-radius: 0.1rem;
				overflow-y: auto;
				height: 10rem;
				box-shadow: 0rem 0rem 0.1rem 0.02rem rgb(38, 38, 38);
				background-color: rgb(54, 54, 54);
				.title {
					color: rgb(140, 140, 140);
					font-size: 0.18rem;
					padding: 0.3rem 0.2rem 0rem 0.2rem;
				}
				.list {
					.item {
						display: flex;
						color: #a2a2a2;
						align-items: center;
						font-size: 0.13rem;
						padding: 0.2rem;
						.index {
							text-align: center;
							width: 0.5rem;
							font-weight: bold;
						}
						.info-box {
							width: 3rem;
							.name {
								color: rgb(201, 201, 201);
								padding-bottom: 0.06rem;
							}
						}
						&:hover {
							background-color: rgb(51, 51, 51);
						}
					}
				}
			}
		}
		.user-box {
			@include flex-center(center);
			margin-left: 7.27rem;
			.av {
				width: 0.35rem;
				height: 0.35rem;
				overflow: hidden;
				border-radius: 50%;
				background-color: rgb(46, 46, 48);
				font-size: 0.35rem;
				.icon {
					text-align: center;
					font-size: 0.35rem;
					line-height: 0.23rem;
					color: #d4d4d5;
				}
				img {
					width: 100%;
					height: 100%;
				}
			}
			.user-name {
				@include flex-center(center);
				font-size: 0.16rem;
				color: #adafb2;
				cursor: pointer;
				.name {
					margin-left: 0.08rem;
				}
			}
		}
	}
</style>
