<template>
  <div class="wrapper">
    <div class="img-box">
      <img :src="imgUrlRef ? imgUrlRef : defineImg" alt="" />
    </div>
    <div class="info-box">
      <div class="name">
        {{ nameRef }}
      </div>
      <div class="size">
        <div class="single">
          <span>单曲数：</span>
          <span>{{ singleRef }}</span>
        </div>
        <div class="album">
          <span>专辑</span>
          <span>{{ albumRef }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang='ts'>
type artistType = {
  cover: string;
  name: string;
  albumSize: number;
  musicSize: number;
  id: number;
};
// 歌手详情
import { defineComponent, ref, Ref, watchEffect } from "vue";
import { getSingerInfo } from "../../Axios/axiosFuns";
import { useRoute } from "vue-router";
import defineImg from "../../assets/av.jpg";
export default defineComponent({
  props: ["id"],
  setup(props) {
    const imgUrlRef: Ref<string> = ref("");
    const nameRef: Ref<string> = ref("");
    const singleRef: Ref<number> = ref(0);
    const albumRef: Ref<number> = ref(0);
    const route = useRoute();
    /**
     * 获取歌手信息
     */
    (async () => {
      const res: { data: { artist: artistType } } = await getSingerInfo(
        props.id
      );
      const { artist } = res.data;
      imgUrlRef.value = artist.cover;
      nameRef.value = artist.name;
      singleRef.value = artist.musicSize;
      albumRef.value = artist.albumSize;
    })();

    watchEffect(async () => {
      if (route.query.id && typeof route.query.id === "string") {
        const res: { data: { artist: artistType } } = await getSingerInfo(
          route.query.id
        );
        const { artist } = res.data;
        imgUrlRef.value = artist.cover;
        nameRef.value = artist.name;
        singleRef.value = artist.musicSize;
        albumRef.value = artist.albumSize;
      }
    });

    return {
      imgUrlRef,
      nameRef,
      singleRef,
      albumRef,
      defineImg,
    };
  },
});
</script>

<style scoped>
.wrapper {
  color: #fff;
  display: flex;
}
.img-box {
  width: 180px;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 15px;
}
.img-box img {
  width: 100%;
  height: 100%;
}
.name {
  font-size: 20px;
  font-weight: bold;
}
.size {
  display: flex;
  color: rgb(156, 156, 156);
}
.size .single {
  margin-right: 9px;
  font-size: 12px;
}
.size .album {
  font-size: 12px;
}
</style>