<script lang="ts" setup></script>
<template>
	<div class="inp-wrapper">
		<textarea class="textarea" autofocus></textarea>
		<div class="btn">评论</div>
	</div>
</template>
<style scoped lang="scss">
	.inp-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
		.textarea {
			width: 100%;
			height: 1.4rem;
			outline: none;
			background-color: rgb(58, 58, 58);
			color: rgb(214, 214, 214);
			border-radius: 0.1rem;
			box-sizing: border-box;
			padding: 0.067rem;
			font-size: 0.18rem;
			resize: none;
		}
		.btn {
			margin-top: 0.1rem;
			color: #fff;
			border: 0.01rem solid rgb(107, 107, 107);
			text-align: center;
            padding: 0.1rem;
            border-radius: 0.2rem;
            cursor: pointer;
			width: 0.5rem;
			margin-right: 0rem;
			font-size: 0.13rem;
		}
	}
</style>
