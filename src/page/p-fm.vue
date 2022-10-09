<script setup lang="ts">
	import { ref } from 'vue';
	import { getPersonalFm, getComment } from '../http/http';
	import CommentList from '../components/c-commentList.vue';
	const fmData = ref<any[]>([]);
	const commentData = ref<any[]>([]);
	const curIndex = ref(0);
	async function getData() {
		const res = await getPersonalFm();
		console.log(res);
		fmData.value = res.data.data;
		const comment = await getComment(fmData.value[curIndex.value].id, 0);
		commentData.value = comment.data.data.comments;
		console.log(commentData.value);
	}
	getData();

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
</script>
<template>
	<div class="wrapper">
		<div v-if="fmData[curIndex]" class="song">
			<div class="name">{{ fmData[curIndex].name }}</div>
			<div class="box">
				<div class="al">专辑: {{ fmData[curIndex].album.name }}</div>
				<div class="user">歌手: {{ formatAr(fmData[curIndex].artists) }}</div>
			</div>
			<div class="bg">
				<img :src="fmData[curIndex].album.picUrl" alt="" />
			</div>
		</div>
		<CommentList :comments="commentData" :comment-count="commentData.length" />
	</div>
</template>
<style scoped lang="scss">
	@import '../global.scss';
	.wrapper {
		@include scroll();
		overflow: auto;
		height: 100%;
		padding-top: 0.3rem;
		display: flex;
		align-items: center;
		flex-direction: column;
		.song {
			width: 80%;
			text-align: center;
			margin: 0 auto;
			.name {
				font-size: 0.3rem;
				color: #fff;
				font-weight: bolder;
			}
			.box {
				justify-content: center;
				font-size: 0.2rem;
				color: rgb(139, 139, 139);
				padding: 0.2rem 0;
				display: flex;
				div {
					margin: 0 0.1rem;
				}
			}
			.bg {
				img {
					width: 4rem;
				}
			}
		}
	}
</style>
