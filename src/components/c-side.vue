<script setup lang="ts">
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	const currentIndex = ref(0);
	const { routes } = useRouter().options;

	// 去除首页路径/ 因为有重定向
	const router = routes.filter(item => {
		if (item.path !== '/') {
			if (item.meta && !item.meta.noHhow) {
				return item;
			}
		}
	});

	// 当前进入页面根据页面路径来判断当前选择项
	for (let i = 0; i < routes.length; i++) {
		if (routes[i].path === '/') {
			continue;
		}
		if (history.state.current === routes[i].path) {
			currentIndex.value = i - 1;
			break;
		}
	}

	// 当前选择项
	const handleCliclk = (i: number) => {
		currentIndex.value = i;
	};
</script>
<template>
	<ul class="list">
		<li
			v-for="(item, index) in router"
			:key="(item.meta?.title as string)"
			:class="[
				'item',
				{
					active: currentIndex === index
				}
			]"
			@click="handleCliclk(index)"
		>
			<router-link :to="item.path">{{ item.meta?.title }}</router-link>
		</li>
	</ul>
</template>
<style scoped lang="scss">
	.list {
		width: 100%;
		box-sizing: border-box;
		padding-top: 0.15rem;
		padding-right: 0.03rem;
		.item {
			font-size: 0.18rem;
			color: #d5d5d5;
			margin-left: 0.16rem;
			height: 0.45rem;
			line-height: 0.45rem;
			border-radius: 0.05rem;
			padding-left: 0.09rem;
			cursor: pointer;
			&.active {
				background-color: #333;
			}
			a {
				display: block;
				width: 100%;
				height: 100%;
				color: #d5d5d5;
				text-decoration: none;
			}
		}
	}
</style>
