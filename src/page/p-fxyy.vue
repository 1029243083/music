<script lang="ts" setup>
	import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';
	import Nav from '../components/c-nav.vue';
	let navData: RouteRecordRaw[] = [];
	const router = useRouter();
	const route = useRoute();
	let current = 0;
	// 从路由配置中获取当前页的子页面
	const macth = router.options.routes.filter(item => {
		if (item.meta) {
			return item.meta.title === '发现音乐';
		}
	})[0];

	// 当前进入页面根据页面路径来判断当前选择项
	(() => {
		if (macth.children) {
			macth.children.forEach((item, index) => {
				if (item.meta && item.meta.title === route.meta.title) {
					current = index;
				}
			});
		}
	})();

	// 获取子页面的元数据(这里是标题)
	if (macth && macth.children && macth.children.length > 0) {
		navData = macth.children;
	}

	const change = (routeOPtions: RouteRecordRaw) => {
		router.push(routeOPtions.path);
	};
</script>
<template>
	<div class="wrapper">
		<Nav :nav-data="navData" :current="current" @change="change" />
		<router-view />
	</div>
</template>
<style scoped>
	.wrapper {
		width: 100%;
	}
</style>
