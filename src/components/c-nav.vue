<script lang="ts" setup>
	import { ref } from 'vue';
	import { RouteRecordRaw } from 'vue-router';

	/**
   *  0: 个性推荐
      1: 专属定制
      2: 歌单
      3: 排行榜
      4: 歌手
      5: 最新音乐
   */
	interface propsTypes {
		navData: RouteRecordRaw[];
		current: number;
	}
	const emit = defineEmits(['change']);
	const props = defineProps<propsTypes>();
	const currenIndex = ref(props.current);
	const changeCurrent = (i: number, item: RouteRecordRaw) => {
		if (i !== currenIndex.value) {
			currenIndex.value = i;
			emit('change', item);
		}
	};
</script>
<template>
	<ul class="nav-wrapper">
		<li
			v-for="(item, index) in props.navData"
			:key="item.path"
			:class="['item', { active: currenIndex === index }]"
			@click="changeCurrent(index, item)"
		>
			{{ item.meta?.title }}
		</li>
	</ul>
</template>
<style scoped lang="scss">
	.nav-wrapper {
		display: flex;
		align-items: center;
		font-size: 0.2rem;
		color: #afafaf;
		padding-top: 0.31rem;
		padding-left: 0.37rem;
		.item {
			margin-right: 0.25rem;
			padding-bottom: 0.1rem;
			cursor: pointer;
			&:last-child {
				margin-right: 0rem;
			}
			&.active {
				font-weight: bold;
				font-size: 0.25rem;
				color: #d0d0d0;
				border-bottom: 0.03rem solid #ec4141;
			}
		}
	}
</style>
