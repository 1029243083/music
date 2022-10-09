<script setup lang="ts">
	import { ref } from 'vue';
	import { artistList } from '../../http/http';

	const languagesArr = [
		{ text: '全部', id: -1 },
		{ text: '华语', id: 7 },
		{ text: '欧美', id: 96 },
		{ text: '日本', id: 8 },
		{ text: '韩国', id: 16 },
		{ text: '其他', id: 0 }
	];
	const typeArr = [
		{ text: '全部', id: -1 },
		{ text: '男歌手', id: 1 },
		{ text: '女歌手', id: 2 },
		{ text: '乐队组合', id: 3 }
	];
	const AToZIndex = ref(0);
	const languagesIndex = ref(0);
	const typeIndex = ref(0);
	const gsArr = ref<any[]>([]);

	const submitInfo = {
		type: typeArr[0].id,
		area: languagesArr[0].id,
		initial: null
	};

	// eslint-disable-next-line camelcase
	const A_ZArr = ref(generateArrayUpper());

	// 2、实现生成 A 到 Z 的数组
	function generateArrayUpper() {
		let arrGenerate = [];
		for (let i = 0; i < 26; i++) {
			const letter = String.fromCharCode(65 + i);
			arrGenerate.push(letter);
		}
		arrGenerate.unshift('热门');
		return arrGenerate;
	}

	// 点击事件
	async function handleClick(item: any, index: number, typeStr: string) {
		switch (typeStr) {
			case 'languages':
				languagesIndex.value = index;
				submitInfo.area = languagesArr[index].id;
				break;
			case 'types':
				typeIndex.value = index;
				submitInfo.type = typeArr[index].id;
				break;
			case 'A2Z':
				AToZIndex.value = index;
				if (index === 0) {
					submitInfo.initial = null;
					break;
				}
				submitInfo.initial = item;
				break;
			default:
		}
		const { type, area, initial } = submitInfo;
		const res = await artistList(type, area, initial);
		gsArr.value = res.data.artists;
		console.log(res);
	}

	(async () => {
		const { type, area, initial } = submitInfo;
		const res = await artistList(type, area, initial);
		gsArr.value = res.data.artists;
	})();
</script>
<template>
	<div class="wrapper">
		<div class="box languages">
			<div class="title">语种:</div>
			<ul class="list">
				<li
					v-for="(item, index) in languagesArr"
					:key="item.id"
					:class="['item', { active: languagesIndex === index }]"
					@click="handleClick(item, index, 'languages')"
				>
					{{ item.text }}
				</li>
			</ul>
		</div>
		<div class="box types">
			<div class="title">分类:</div>
			<ul class="list">
				<li
					v-for="(item, index) in typeArr"
					:key="item.id"
					:class="['item', { active: typeIndex === index }]"
					@click="handleClick(item, index, 'types')"
				>
					{{ item.text }}
				</li>
			</ul>
		</div>
		<div class="box A2Z">
			<div class="title">分类:</div>
			<ul class="list">
				<li
					v-for="(item, index) in A_ZArr"
					:key="item"
					:class="['item', { active: AToZIndex === index }]"
					@click="handleClick(item, index, 'A2Z')"
				>
					{{ item }}
				</li>
			</ul>
		</div>
		<div class="card-box">
			<ul class="card">
				<li v-for="item in gsArr" :key="item.id" class="card-item">
					<div class="img-box">
						<img :src="item.picUrl" alt="" />
					</div>
					<div class="name">{{ item.name }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<style scoped lang="scss">
	@import '../../global.scss';
	.wrapper {
		@include scroll();
		width: 100%;
		box-sizing: border-box;
		padding-left: 1rem;
		height: 100%;
		padding-top: 0.5rem;
		padding-bottom: 1rem;
		overflow: auto;
		.box {
			display: flex;
			width: 100%;
			padding: 0.1rem 0;
			.title {
				width: 0.5rem;
				color: #d5d5d5;
				font-size: 0.15rem;
			}
			.list {
				display: flex;
				flex-wrap: wrap;
				font-size: 0.15rem;
				.item {
					text-align: center;
					margin-bottom: 0.15rem;
					color: #afafaf;
					width: 0.8rem;
					cursor: pointer;
					border-right: 0.01rem solid #afafaf2d;
					&.item:last-child {
						border: none;
					}
					&.active {
						color: rgb(236, 65, 65);
					}
				}
			}
		}
		.card-box {
			width: 100%;
			// background-color: red;
			.card {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.card-item {
					width: 2.5rem;
					margin-bottom: 0.5rem;
					margin-right: 0.5rem;
					display: flex;
					align-items: center;
					flex-direction: column;
					.img-box {
						width: 100%;
						height: 2.5rem;
						img {
							height: 100%;
							width: 100%;
						}
					}
					.name {
						font-size: 0.2rem;
						padding-top: 0.2rem;
						color: #d5d5d5;
					}
				}
			}
		}
	}
</style>
