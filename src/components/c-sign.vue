<!-- 登录组件 -->
<script setup lang="ts">
	import { useStore } from '../store/user';
	import { computed, ref } from 'vue';
	import {
		getLoginKey,
		getLoginCreate,
		getloginStatus,
		getloginStatusCookie,
		getUserDetail,
		loginByPhone,
		getVerifyCode,
		verifyCode,
		getStatus
	} from '../http/http';
	import { setLocalStorage } from '../util';
	const methonds = ref('qr'); // 控制二维码登录还是手机号登录 qr是二维码 inp是手机号
	const passOrCode = ref(true); // 控制密码登录还是验证码登录
	const emit = defineEmits(['close']); // 触发父组件关闭登录框
	const qr = ref(''); // 二维码url
	const num = ref(0); // 验证码倒计时
	const phone = ref(''); // 手机号
	const VCode = ref(''); // 验证码
	const password = ref(''); // 密码
	const userInfoStore = useStore();
	// eslint-disable-next-line no-unused-vars
	let timer: number;

	// 登录
	// ===============================二维码登录=============================================
	(async () => {
		// 获取key
		const key = await getLoginKey();
		const qrImg = await getLoginCreate(key);
		qr.value = qrImg;
		timer = setInterval(async () => {
			const res = await getloginStatus(key);
			const { code, cookie } = res;
			if (code === 803) {
				// 授权成功
				const id = await getloginStatusCookie(cookie);
				const userDetail = await getUserDetail(id); // 获取用户详细信息
				const { userId, avatarUrl, nickname } = userDetail.data.profile;
				changeStoreState(userId, avatarUrl, nickname); // 改变pinia数据
				setLocalStorage(
					// 信息存入本地
					'userInfo',
					JSON.stringify({
						userId,
						avatarUrl,
						nickname
					})
				);
				setLocalStorage(
					// 信息存入本地
					'cookie',
					cookie
				);
				// 登录框消失
				emit('close', false);
				clearInterval(timer); // 清楚轮询的定时器
			} else if (code === 800) {
				// 二维码过期
				const qrImg = await getLoginCreate(key);
				qr.value = qrImg;
			}
		}, 3000);
	})();

	// 切换登录方式二维码或手机
	const changeSingMethond = (type: string) => {
		methonds.value = type;
	};

	// 切换密码还是验证码登录
	const changePassOrCode = () => {
		passOrCode.value = !passOrCode.value;
	};

	// 关闭登录框
	const close = () => {
		emit('close', false);
	};

	// 点击按钮获取验证码
	const handleVerifyCode = () => {
		if (num.value !== 0) {
			return;
		}
		getVerifyCode('15295860739'); //获取验证码
		num.value = 60;
		const timer = setInterval(() => {
			num.value--;
			if (num.value <= 0) {
				num.value = 0;
				clearInterval(timer);
			}
		}, 1000);
	};

	// 获取验证码和倒计时文字
	const txtRef = computed(() => {
		if (num.value === 0) {
			return '获取验证码';
		}
		return num.value;
	});

	// 登录
	const commit = async () => {
		try {
			if (passOrCode.value === true) {
				// ===============================手机密码登录=============================================
				// 手机密码登录
				const res = await loginByPhone(phone.value, password.value);
				changeStoreState(res.profile.userId, res.profile.avatarUrl, res.profile.nickname);
			} else {
				// ===============================验证码登录=============================================
				// 验证码登录
				const res = await verifyCode(phone.value, VCode.value);
				if (res === true) {
					console.log('登录成功');
					const info = await getStatus();
					changeStoreState(
						info.profile.userId,
						info.profile.avatarUrl,
						info.profile.nickname
					);
					// 信息存入本地
					setLocalStorage(
						'userInfo',
						JSON.stringify({
							userId: info.profile.userId,
							avatarUrl: info.profile.avatarUrl,
							nickname: info.profile.nickname
						})
					);
					return;
				}
				console.log('登录失败');
			}
		} catch (error) {
			console.log('登录失败');
		}
	};

	// 改变pinia数据
	function changeStoreState(userId: string, avatarUrl: string, nickname: string) {
		userInfoStore.$patch(state => {
			state.userId = userId;
			state.avatarUrl = avatarUrl;
			state.nickname = nickname;
		});
	}
</script>
<template>
	<div class="wrappera">
		<div class="box">
			<!-- 二维码登录 -->
			<div v-if="methonds === 'qr'">
				<div class="title">扫码登录</div>
				<div class="qr">
					<img v-if="qr" :src="qr" alt="" />
				</div>
				<div class="other" @click="changeSingMethond('inp')">
					<div class="txt">选择其他方式登录</div>
					<i class="iconfont icon">&#xe65f;</i>
				</div>
			</div>
			<!-- 手机号登录 -->
			<div v-else class="inp-box">
				<div class="logo">
					<img src="../assets/logo.png" alt="" />
				</div>
				<div class="phone-box">
					<!-- 手机号框 -->
					<div class="phone">
						<div class="icon-box">
							<i class="iconfont icon">&#xe601;</i>
						</div>
						<input v-model="phone" type="text" placeholder="请输入手机号" />
					</div>
					<!-- 密码框 -->
					<div v-if="passOrCode" class="password">
						<div class="icon-box">
							<i class="iconfont icon">&#xe669;</i>
						</div>
						<input v-model="password" type="text" placeholder="请输入密码" />
					</div>
					<!-- 验证码框 -->
					<div v-else class="v">
						<div class="icon-box">
							<i class="iconfont icon">&#xe669;</i>
						</div>
						<input v-model="VCode" type="text" placeholder="请输入验证码" />
						<div class="getcode" @click="handleVerifyCode">{{ txtRef }}</div>
					</div>
				</div>
				<!-- 忘记密码/验证码登录 -->
				<div class="code-box">
					<span>忘记密码</span>
					<span>|</span>
					<span @click="changePassOrCode">{{
						passOrCode ? '验证码登录' : '密码登录'
					}}</span>
				</div>
				<!-- 登录按钮 -->
				<div class="btn" @click="commit">登录</div>
			</div>
			<!-- 返回二维码登录或关闭 -->
			<div class="pos">
				<i
					v-if="methonds === 'inp'"
					class="iconfont qr-icon"
					@click="changeSingMethond('qr')"
					>&#xe653;</i
				>
				<i class="iconfont close-icon" @click="close">&#xeaf2;</i>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '../global.scss';
	.wrappera {
		@include flex-center(center, center);
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: transparent;
		.box {
			position: relative;
			@include flex-center(center, center);
			flex-direction: column;
			width: 4.5rem;
			height: 6.67rem;
			background-color: #fff;
			.title {
				text-align: center;
				font-size: 0.32rem;
			}
			.qr {
				@include flex-center(center, center);
				width: 2.14rem;
				height: 2.14rem;
				margin-top: 0.43rem;

				img {
					width: 100%;
					height: 100%;
				}
			}
			.other {
				@include flex-center(center, center);
				font-size: 0.1rem;
				margin-top: 1.16rem;
				cursor: pointer;
				color: rgb(102, 102, 102);
				text-align: center;
				.icon {
					font-size: 0.05rem;
				}
			}
			.pos {
				position: absolute;
				top: 0.1rem;
				left: 0.1rem;
				right: 0.1rem;
				font-size: 0rem;
				@include flex-center(center, space-between);
				.qr-icon {
					cursor: pointer;
					color: rgb(216, 216, 216);
					font-size: 0.6rem;
				}
				.close-icon {
					color: rgb(102, 102, 102);
					cursor: pointer;
					font-size: 0.3rem;
					font-weight: 100;
				}
			}
		}
		.inp-box {
			.logo {
				margin: 0 auto;
				width: 0.67rem;
				height: 0.67rem;
				overflow: hidden;
				font-size: 0;
				margin-bottom: 0.6rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.phone-box {
				width: 3.27rem;
				height: 1rem;
				font-size: 0;
				border: 0.01rem solid rgb(216, 216, 216);
				border-radius: 0.03rem;
				.phone,
				.password,
				.v {
					font-size: 0;
					@include flex-center(center);
					height: 0.5rem;

					.icon-box {
						text-align: center;
						line-height: 0.5rem;
						width: 0.4rem;
						height: 100%;
						.icon {
							color: rgb(216, 216, 216);
							font-size: 0.3rem;
						}
					}
					input {
						flex: 1;
						height: 100%;
						border: none;
						padding: 0;
						font-size: 0.1rem;
						outline: none;
						color: rgb(51, 51, 108);
					}
					.getcode {
						flex: 1;
						text-align: center;
						box-sizing: border-box;
						padding: 0 0.05rem;
						border-left: 0.01rem solid rgb(216, 216, 216);
						font-size: 0.1rem;
						cursor: pointer;
						color: rgb(216, 216, 216);
					}
				}
				.phone {
					height: 0.49rem;
					border-bottom: 0.01rem solid rgb(216, 216, 216);
				}
			}

			.code-box {
				font-size: 0;
				margin-top: 0.3rem;
				text-align: right;
				span {
					margin: 0 0.06rem;
					font-size: 0.16rem;
					cursor: pointer;
					color: rgb(12, 136, 211);
					&:last-child {
						margin-right: 0;
					}
				}
			}

			.btn {
				box-sizing: border-box;
				color: #fff;
				font-size: 0.25rem;
				border-radius: 0.07rem;
				text-align: center;
				background-color: rgb(229, 52, 52);
				padding: 0.1rem 0;
				margin-top: 0.6rem;
			}
		}
	}
</style>
