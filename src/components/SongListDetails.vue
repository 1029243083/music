<template>
  <div class="header-wrapper">
    <div class="left-content">
      <img :src="imgRef ? imgRef : avDefault" alt="" />
    </div>
    <div class="right-content">
      <div class="title">
        <span class="title-tag">歌单</span>
        <span>{{ titleRef }}</span>
      </div>

      <div class="user">
        <div class="img-av">
          <img :src="avUrlRef ? avUrlRef : avDefault" alt="" />
        </div>
        <div class="name">{{ userNameRef }}</div>
        <div class="create-time color-g">{{ createTimeRef }}创建</div>
      </div>

      <div class="tags">
        <div class="text-tag">标签:</div>
        <div v-for="tag in tagsRef" :key="tag" class="tag">{{ tag }}</div>
      </div>

      <div class="playAll">
        <button @click="palyAllSong"><CaretRightOutlined />播放全部</button>
      </div>

      <div class="info">
        <div class="sone-count">
          <span>歌曲:</span>
          <span class="color-g">{{ soneCount }}</span>
        </div>
        <div class="sonePlay">
          <span>播放:</span>
          <span class="color-g">{{
            palyCount > 10000
              ? (palyCount / 10000).toFixed(0) + "万"
              : palyCount
          }}</span>
        </div>
      </div>
      <div class="desc">
        <span>简介:</span>
        <span class="color-g">{{ descRef }}</span>
      </div>
    </div>
  </div>
  <div class="song-wrapper"><SoneList :songListInfo="songListInfo" /></div>
</template>

<script lang="ts">
import {
  getPlaylistHot,
  getSoneAllInfo,
  getSongSheetInfo,
} from "../Axios/axiosFuns";
import { CaretRightOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { defineComponent, Ref, ref } from "vue";
import avDefault from "../assets/av.jpg";
import SoneList from "../components/SongList.vue";
import store from "../Store";

export default defineComponent({
  components: {
    SoneList,
    CaretRightOutlined,
  },
  setup() {
    const imgRef: Ref<string> = ref("");
    const titleRef: Ref<string> = ref("");
    const avUrlRef: Ref<string> = ref("");
    const userNameRef: Ref<string> = ref("");
    const createTimeRef: Ref<string> = ref("");
    const tagsRef: Ref<string[]> = ref([]);
    const soneCount: Ref<number> = ref(0);
    const palyCount: Ref<number> = ref(0);
    const descRef: Ref<string> = ref("");
    const trackIdsRef: Ref<any[]> = ref([]);
    const songListInfo: Ref<any> = ref([]);

    const route = useRoute();
    (async () => {
      const res = await getSongSheetInfo((route.query.id as unknown) as number);
      imgRef.value = res.playlist.coverImgUrl;
      titleRef.value = res.playlist.name;
      avUrlRef.value = res.playlist.creator.avatarUrl;
      userNameRef.value = res.playlist.creator.nickname;
      const time = new Date(res.playlist.createTime);
      const month = time.getMonth() + 1;
      const date = time.getDate();
      const year = time.getFullYear();
      createTimeRef.value = `${year}-${month}-${date}`;
      tagsRef.value = res.playlist.tags;
      soneCount.value = res.playlist.trackCount;
      palyCount.value = res.playlist.playCount;
      descRef.value = res.playlist.description;
      const result = await getSoneAllInfo(res.playlist.trackIds);
      // 能获取一个歌单的所有歌曲信息
      songListInfo.value = result;
    })();

    const palyAllSong = () => {
      store.commit("setSongList", songListInfo.value.songs);
      store.commit("setIndex", 0);
    };

    return {
      imgRef,
      titleRef,
      avUrlRef,
      userNameRef,
      createTimeRef,
      tagsRef,
      soneCount,
      palyCount,
      descRef,
      avDefault,
      songListInfo,
      palyAllSong,
    };
  },
});
</script>

<style scoped>
.header-wrapper {
  display: flex;
  width: 100%;
  height: 172px;
}
.left-content {
  width: 160px;
  height: 146px;
  border-radius: 10px;
  margin-right: 15px;
}
.left-content img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.right-content {
  flex: 1;
}
.title .title-tag {
  color: rgb(236, 65, 60);
  font-size: 14px;
  border: 1px solid rgb(236, 65, 60);
  border-radius: 5px;
  padding: 0 5px;
}
.title span:nth-of-type(2) {
  color: rgb(208, 208, 208);
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
}
.user {
  margin-top: 5px;
  display: flex;
  align-items: center;
}
.img-av {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}
.img-av img {
  width: 100%;
  height: 100%;
}
.user .name {
  color: rgb(33, 187, 221);
  margin-left: 3px;
  margin-right: 5px;
}
.create-time {
  font-size: 12px;
}
.color-g {
  color: rgb(135, 135, 129);
}
.tags {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.tags .text-tag {
  color: #fff;
  margin-right: 5px;
}
.tags .tag {
  color: rgb(33, 187, 221);
  margin-right: 5px;
}
.info {
  display: flex;
  color: #fff;
  margin: 5px 0;
}
.sone-count {
  margin-right: 5px;
}
.sone-count span:nth-of-type(1),
.sonePlay span:nth-of-type(1) {
  margin-right: 3px;
}
.desc {
  display: flex;
}
.desc span:nth-of-type(1) {
  color: #fff;
  margin-right: 5px;
}
.desc span:nth-of-type(2) {
  display: block;
  width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.playAll {
  margin-top: 5px;
}
.playAll button {
  outline: none;
  border: none;
  background-color: #f40;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
}
</style>