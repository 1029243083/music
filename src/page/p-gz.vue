<script setup lang="ts">
	import { ref } from 'vue';
	import GdCard from '../components/c-gdCard.vue';
	import { getEvent } from '../http/http';
	import { fromatDate } from '../util/index';
	const list = ref<any[]>([]);
	(async () => {
		const res = await getEvent();
		res.data.event.forEach((item: { json: any }) => {
			item.json = JSON.parse(item.json);
		});
		list.value = res.data.event;
		console.log(list.value);
	})();
</script>
<template>
	<div class="box">
		<div v-for="item in list" :key="item" class="wrapper">
			<div class="av">
				<img :src="item.user.avatarUrl" alt="" />
			</div>
			<div class="info">
				<div class="name">{{ item.user.nickname }}</div>
				<div class="date">{{ fromatDate(item.eventTime) }}</div>
				<div class="des">{{ item.json.msg }}</div>
				<GdCard :data="item.json" />
				<div class="bg">
					<img
						v-for="img in item.pics"
						:key="img.originUrl"
						:src="img.originUrl"
						alt=""
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	@import '../global.scss';
	.box {
		@include scroll();
		overflow-y: auto;
		height: 100%;
	}
	.wrapper {
		display: flex;
		padding: 0.2rem 0rem 0rem 0.2rem;
		font-size: 0.16rem;
		border-bottom: 0.01rem solid rgb(74, 74, 74);
		padding-bottom: 0.3rem;
		.av {
			width: 0.5rem;
			height: 0.5rem;
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.info {
			padding-left: 0.1rem;
			color: rgb(207, 207, 207);
			.name {
				color: rgb(133, 185, 230);
			}
			.date {
				padding: 0.1rem 0;
				color: rgb(142, 142, 142);
			}
			.des {
				padding-bottom: 0.1rem;
			}
			.bg {
				display: flex;
				width: 2rem;
				// height: 1.4rem;
				img {
					margin: 0 0.1rem;
					width: 100%;
					// height: 100%;
					border-radius: 0.1rem;
					overflow: hidden;
				}
			}
		}
	}
</style>
