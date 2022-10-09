<script setup lang="ts">
	const props = defineProps({
		comments: { type: Array, required: true },
		commentCount: { type: Number }
	});
</script>
<template>
	<div class="comment-list">
		<div class="title">最新评论（{{ props.commentCount }}）</div>
		<div v-for="item in (props.comments as any)" :key="item.commentId" class="item">
			<img :src="item.user.avatarUrl" alt="" />
			<div class="info">
				<div class="box">
					<div class="name">{{ item.user.nickname }}：</div>
					<div class="comment">{{ item.content }}</div>
				</div>
				<div v-if="item.beReplied && item.beReplied.length !== 0">
					<div
						v-for="subComment in item.beReplied"
						:key="subComment.beRepliedCommentId"
						class="sub"
					>
						<div class="name">{{ subComment.user.nickname }}：</div>
						<div class="content">{{ subComment.content }}</div>
					</div>
				</div>
				<div class="date">{{ item.timeStr }}</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.comment-list {
		.title {
			font-size: 0.2rem;
			font-weight: bolder;
			color: rgb(176, 176, 176);
			margin-bottom: 0.2rem;
		}
		.item {
			display: flex;
			align-items: center;
			padding-bottom: 0.2rem;
			padding-top: 0.2rem;
			border-bottom: 0.01rem solid rgb(56, 56, 56);
			img {
				width: 0.6rem;
				height: 0.6rem;
				margin-right: 0.1rem;
				border-radius: 50%;
			}
			.info {
				flex: 1;
				font-size: 0.18rem;
				.box {
					display: flex;
					align-items: center;
					.name {
						color: rgb(96, 171, 230);
					}
					.comment {
						color: rgb(176, 176, 176);
					}
				}
				.date {
					padding-top: 0.1rem;
					color: rgb(176, 176, 176);
				}
				.sub {
					display: flex;
					margin-top: 0.1rem;
					border-radius: 0.1rem;
					font-size: 0.14rem;
					align-items: center;
					padding: 0.1rem 0.1rem;
					background-color: rgb(57, 57, 57);
					.name {
						color: rgb(96, 171, 230);
					}
					.content {
						color: rgb(176, 176, 176);
					}
				}
			}
		}
	}
</style>
