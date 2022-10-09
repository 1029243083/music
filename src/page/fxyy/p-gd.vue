<script setup lang="ts">
	import { ref } from 'vue';
	import cCardListVue from '../../components/c-cardList.vue';
	import { getHighquality, getTagsList } from '../../http/http';
	import { GDresultType, TagsType } from '../../http/resultTypes';

	const tagsData = ref<TagsType[]>([]);
	const listData = ref<GDresultType[]>([]);
	const currentIndex = ref(0);
	const handleChange = (i: number, name: string) => {
		if (currentIndex.value !== i) {
			currentIndex.value = i;
		}
		getListData(name);
	};

	async function getListData(name: string) {
		const res = await getHighquality(name);

		listData.value = res.data.playlists;
	}

	async function getTagsData() {
		const res = await getTagsList();
		tagsData.value = res.data.tags;
		getListData(res.data.tags[0].name);
	}
	getTagsData();
</script>
<template>
	<div class="wrapper">
		<ul class="tags-wrapper">
			<li
				v-for="(item, index) in tagsData"
				:key="item.id"
				:class="['tag', { active: currentIndex === index }]"
				@click="handleChange(index, item.name)"
			>
				{{ item.name }}
			</li>
		</ul>
		<cCardListVue :res="listData" />
	</div>
</template>
<style scoped lang="scss">
	@import '../../global.scss';
	.wrapper {
		width: 100%;
		box-sizing: border-box;
		padding-left: 1rem;
		height: 100%;
		padding-bottom: 1rem;
		padding-top: 0.5rem;
		overflow: auto;
		@include scroll();
	}
	.tags-wrapper {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		align-items: center;
		box-sizing: border-box;
		padding-left: 0.1rem;
		padding-right: 2rem;
		padding-top: 0.03rem;
		padding-bottom: 1rem;

		.tag {
			font-size: 0.16rem;
			color: rgb(135, 135, 129);
			cursor: pointer;
			margin-right: 0.2rem;
			margin-bottom: 0.2rem;
			&:last-child {
				margin-right: 0;
			}
			&.active {
				color: rgb(224, 51, 45);
			}
		}
	}
</style>
