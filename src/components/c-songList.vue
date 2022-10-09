<script lang="ts" setup>
	import { fromaTime } from '../util/index';
	import { songStore } from '../store/user';
	const songId = songStore();
	const props = defineProps({
		data: { type: Array, required: true }
	});

	// 格式化歌手名字
	const formatAr = (ar: any[]) => {
		let str = '';
		if (ar.length === 1) {
			return ar[0].name;
		}
		ar.forEach((item, i) => {
			str += item.name;
			if (i !== ar.length - 1) {
				str += '/';
			}
		});
		return str;
	};

	const dblClick = (item: any) => {
		if (Array.isArray(songId.id)) {
			songId.index = 0;
			songId.id = [{ id: item.id }, ...songId.id];
			return;
		}
		songId.id = item.id;
	};
</script>
<template>
	<div class="box">
		<div class="title-item">
			<div class="operation">操作</div>
			<div class="title">音乐标题</div>
			<div class="Soaring-rate">飙升率</div>
			<div class="singer title">歌手</div>
			<div class="Album">专辑</div>
			<div class="duration">时长</div>
		</div>
		<div
			v-for="(item, index) in (props.data as any[])"
			:key="index"
			class="song-item"
			@dblclick="dblClick(item)"
		>
			<div>{{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}</div>
			<div class="title">{{ item.name }}</div>
			<div>{{ item.pop }}%</div>
			<div class="title">{{ formatAr(item.ar) }}</div>
			<div>{{ item.al.name }}</div>
			<div>{{ fromaTime(item.dt) }}</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.wrapper {
		.title-item {
			display: flex;
			padding: 0.1rem;
			cursor: pointer;
			font-size: 0.2rem;
			align-items: center;
			color: rgb(164, 164, 164);
			& > div {
				flex: 1;
			}

			& > div.title {
				flex: 2;
			}
		}
		.song-item {
			display: flex;
			font-size: 0.2rem;
			background-color: rgb(56, 56, 56);
			align-items: center;
			cursor: pointer;
			padding: 0.2rem 0.1rem;
			color: rgb(164, 164, 164);
			& > div {
				flex: 1;
			}

			& > div.title {
				flex: 2;
				cursor: pointer;
			}

			&:nth-child(odd) {
				background-color: transparent;
			}
			&:hover {
				background-color: rgb(85, 85, 85);
			}
		}
	}
</style>
