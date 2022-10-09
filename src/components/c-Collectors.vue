<script lang="ts" setup>
	const props = defineProps({
		collectors: {
			type: Array
		}
	});
</script>
<template>
	<div v-if="props.collectors" class="Collectors-box">
		<div
			v-for="item in (props.collectors as any)"
			:key="item.avatarImgId"
			class="Collectors-item"
		>
			<img :src="item.avatarUrl" alt="" />
			<div class="name">{{ item.nickname }}</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.Collectors-box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.Collectors-item {
			width: 33.33%;
			display: flex;
			padding-bottom: 0.3rem;
			align-items: center;
			img {
				width: 0.7rem;
				height: 0.7rem;
				border-radius: 50%;
			}
			.name {
				font-size: 0.18rem;
				padding-left: 0.1rem;
				color: rgb(178, 178, 178);
			}
		}
	}
</style>
