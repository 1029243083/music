<script setup lang="ts">
	import Header from './components/c-header.vue';
	import Side from './components/c-side.vue';
	import Play from './components/c-play.vue';
	import { loading } from './store/user';
	const isShow = loading();
</script>
<template>
	<div class="wrapper">
		<div class="header">
			<Header />
		</div>
		<div class="main">
			<div class="left">
				<Side />
			</div>
			<div class="right">
				<router-view />
			</div>
			<Play />
		</div>
		<div v-show="isShow.show" class="pos">
			<div class="c"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.wrapper {
		height: 100%;
		/* overflow: hidden; */
	}
	.header {
		height: 0.73rem;
		box-sizing: border-box;
		border-bottom: 0.02rem solid #8a1313;
		/* overflow: hidden; */
	}
	.main {
		display: flex;
		height: calc(100% - 0.73rem - 1rem);
		/* padding-bottom: 1.6rem; */
		background-color: #2b2b2b;
	}
	.left {
		width: 2.4rem;
		border-right: 0.01rem solid #444;
	}
	.right {
		overflow: hidden;
		flex: 1;
	}
	.pos {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 0.3rem;
		padding: 1rem;
		.c {
			width: 0.5rem;
			height: 0.5rem;
			border-radius: 50%;
			border: 0.03rem solid #ff0000;
			border-top: none;
			border-left: none;
			animation: routerz 1s infinite linear;
		}
	}
	@keyframes routerz {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(360deg);
		}
	}
</style>
