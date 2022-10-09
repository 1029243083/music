<script setup lang="ts">
	const props = defineProps({
		data: { type: Object }
	});
	function returnRes(obj: any, type: string) {
		if (type === 'img') {
			if (obj.song) {
				// 歌曲
				return obj.song.img80x80;
			}
			// 歌单
			return obj.playlist.coverImgUrl;
		} else if (type === 'title') {
			if (obj.song) {
				// 歌曲
				return obj.song.name;
			}
			// 歌单
			return obj.playlist.name;
		}
		if (obj.song) {
			// 歌曲
			return formatAr(obj.song.artists);
		}
		// 歌单
		return obj.playlist.creator.nickname;
	}

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
	<div class="gd">
		<div class="gd-img">
			<img :src="returnRes(props.data, 'img')" alt="" />
		</div>
		<div class="gd-info">
			<div class="box">
				<div v-if="props.data && props.data.playlist" class="tag">歌单</div>
				<div class="title">{{ returnRes(props.data, 'title') }}</div>
			</div>
			<div class="name">{{ returnRes(props.data, 'name') }}</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.gd {
		width: 10rem;
		display: flex;
		background-color: rgb(51, 51, 53);
		padding: 0.1rem;
		border-radius: 0.1rem;
		margin-bottom: 0.2rem;
		.gd-img {
			width: 0.5rem;
			height: 0.5rem;
			padding-right: 0.1rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.gd-info {
			width: 100%;
			.box {
				display: flex;
				align-items: center;
				.tag {
					text-align: center;
					width: 0.4rem;
					padding: 0.03rem 0;
					margin-right: 0.1rem;
					border-radius: 0.05rem;
					font-size: 0.12rem;
					border: 0.01rem solid rgb(199, 63, 64);
					color: rgb(199, 63, 64);
				}
			}
			.name {
				margin-top: 0.1rem;
				color: rgb(142, 142, 142);
			}
		}
	}
</style>
