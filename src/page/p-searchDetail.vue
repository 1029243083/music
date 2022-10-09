<script lang="ts" setup>
	import SongList from '../components/c-songList.vue';
	import { ref, watch } from 'vue';
	import { getCloudsearch } from '../http/http';
	import { searchStore, loading } from '../store/user';
	import { useRoute } from 'vue-router';
	const searchInfo = searchStore();
	const loadingInfo = loading();
	const songsRef = ref<any[]>([]);
	const route = useRoute();
	(async () => {
		if (songsRef.value.length === 0 && searchInfo.keywords) {
			getData(searchInfo.keywords);
		}
		if (route.query.keywords) {
			getData(route.query.keywords as string);
		}
	})();

	watch(searchInfo, async () => {
		console.log(searchInfo.keywords);
		if (!searchInfo.keywords) {
			return;
		}
		if (loadingInfo.show === false) {
			getData(searchInfo.keywords);
		}
	});

	async function getData(keywords: string) {
		const res = await getCloudsearch(keywords);
		songsRef.value = res.data.result.songs;
	}
</script>
<template>
	<div class="search-wrapper">
		<div class="name">{{ route.query.keywords }}</div>
		<div v-if="songsRef.length > 0" class="list">
			<SongList :data="songsRef" />
		</div>
	</div>
</template>
<style scoped lang="scss">
	@import '../global.scss';
	.search-wrapper {
		@include scroll();
		overflow-y: auto;
		height: 100%;
		padding: 0.3rem 0rem 0rem 0.8rem;
		.list {
			padding-bottom: 1rem;
		}
		.name {
			font-size: 0.2rem;
			font-weight: bolder;
			color: rgb(202, 202, 202);
			padding-bottom: 0.6rem;
		}
	}
</style>
