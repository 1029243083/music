<script lang="ts" setup>
	import { useRouter } from 'vue-router';
	import { GDresultType } from '../http/resultTypes';
	const router = useRouter();

	function getPalyNum(num: number) {
		if (num === undefined) return;
		if (10000000 / num > 0.01) {
			return (10000000 / num).toFixed(2) + '亿';
		}
		if (10000 / num > 0.1) {
			return (10000 / num).toFixed(2) + '万';
		}
		return num + '万';
	}
	function hangleCLick(obj: any) {
		router.push('/gddetail?id=' + obj.id);
	}
	const result = defineProps<{
		res: GDresultType[];
	}>();
</script>
<template>
	<ul class="list">
		<!-- {{
			result
		}} -->
		<li v-for="item in result.res" :key="item.id" class="item" @click="hangleCLick(item)">
			<div class="playNum">
				<span class="iconfont icon">&#xea6d;</span>
				<span>{{ getPalyNum(item.playCount) }}</span>
			</div>
			<div v-if="item.creator" class="playName">
				<span>{{ item.creator.nickname }}</span>
				<img
					:src="
						item.creator.avatarDetail ? item.creator.avatarDetail.identityIconUrl : ''
					"
					alt=""
				/>
			</div>
			<img :src="item.picUrl ? item.picUrl : item.coverImgUrl" alt="" />
			<div class="title">{{ item.name }}</div>
		</li>
	</ul>
</template>
<style scoped lang="scss">
	.list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		.item {
			position: relative;
			width: 2.75rem;
			// background-color: red;
			margin-bottom: 0.22rem;
			margin-left: 0.11rem;
			margin-right: 0.11rem;
			border-radius: 0.07rem;
			// overflow: hidden;
			&:last-child {
				margin-right: 0rem;
			}
			img {
				width: 2.75rem;
				overflow: hidden;
				height: 2.75rem;
			}
			.title {
				margin-top: 0.02rem;
				height: 0.5rem;
				line-height: 0.24rem;
				font-size: 0.18rem;
				color: #d0d0d0;
			}
			.playNum {
				position: absolute;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				width: 100%;
				font-size: 0.03rem;
				box-sizing: border-box;
				padding: 0.03rem;
				padding-right: 0.07rem;
				color: #fff;
				background-image: linear-gradient(rgba(0, 0, 0, 0.2), transparent);
				.icon {
					margin-right: 0.03rem;
					font-size: 0.03rem;
				}
			}
			.playName {
				position: absolute;
				display: flex;
				align-items: center;
				bottom: 0.6rem;
				padding-bottom: 0.03rem;
				width: 100%;
				box-sizing: border-box;
				padding-left: 0.1rem;
				font-size: 0.1rem;
				background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
				color: #fff;
				img {
					padding-left: 0.03rem;
					width: 0.2rem;
					height: 0.2rem;
				}
			}
		}
	}
</style>
