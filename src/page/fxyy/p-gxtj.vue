<script lang="ts" setup>
	import { ref } from 'vue';
	import { getrEcommendResource } from '../../http/http';
	import cardList from '../../components/c-cardList.vue';
	import { GDresultType } from '../../http/resultTypes';
	const result = ref<GDresultType[]>([]);
	(async () => {
		const res = await getrEcommendResource();
		if (res.data.code === 200) {
			result.value = res.data.result;
		}
	})();
</script>
<template>
	<ul class="wrapper">
		<div class="gd">
			<cardList :res="result" />
		</div>
	</ul>
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

		.gd {
			width: 100%;
		}
	}
</style>
