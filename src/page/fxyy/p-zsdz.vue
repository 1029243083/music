<script setup lang="ts">
	import { getrEcommendResource } from '../../http/http';
	import cCardListVue from '../../components/c-cardList.vue';
	import { GDresultType } from '../../http/resultTypes';
	import { ref } from 'vue';
	const result = ref<GDresultType[]>([]);
	const getData = async () => {
		const res = await getrEcommendResource();
		result.value = res.data.result;
	};
	getData();
</script>
<template>
	<div class="wrapper">
		<cCardListVue :res="result" />
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
	}
</style>
