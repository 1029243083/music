<template>
  <div class="title-wrapper">
    <div></div>
    <div>音乐标题</div>
    <div>歌手</div>
    <div>专辑</div>
    <div>时长</div>
  </div>
  <div class="song-list-wrapper">
    <div
      class="song-wrapper"
      v-for="(song, i) in songList"
      :key="song.id"
      @click="playSone(song, song.id, i)"
      :class="{ active: i === current }"
    >
      <div class="index">{{ i + 1 }}</div>
      <div class="title">
        <span>{{ song.name }}</span>
        <span>
          <span v-for="desc in song.tns" :key="desc">({{ desc }})</span>
          <span v-for="item in song.alia" :key="item">({{ item }})</span>
        </span>
      </div>
      <div class="singer">
        <span v-for="singer in song.ar" :key="singer.id">{{
          singer.name
        }}</span>
      </div>
      <div class="album">{{ song.al.name }}</div>
      <div class="duration">{{ getDuration(song.dt) }}</div>
    </div>
    <div class="show" v-if="show">
      <Loading />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, Ref, ref } from "vue";
import { Store, useStore } from "vuex";
import { IState } from "../Store";
import Loading from "./Loading.vue";
export default defineComponent({
  components: {
    Loading,
  },
  props: ["songListInfo"],
  setup(prop) {
    const songList: Ref<any[]> = ref([]);
    const show: Ref<boolean> = ref(true);
    const store: Store<IState> = useStore();
    const current: Ref<number> = ref(0);

    show.value = true;
    watchEffect(() => {
      if (prop.songListInfo.songs) {
        songList.value = prop.songListInfo.songs;
      } else {
        songList.value = prop.songListInfo;
      }
      if (songList.value) {
        show.value = false;
      }
      current.value = store.state.index;
    });
    const getDuration = (duration: number) => {
      return (duration / 1000 / 60).toFixed(2).replace(/\./, ":");
    };
    const playSone = (song: any, id: number, i: number) => {
      store.commit("setSong", song);
      store.commit("setIndex", i);
      current.value = store.state.index;
    };
    return {
      songList,
      show,
      getDuration,
      playSone,
      current,
    };
  },
});
</script>

<style scoped>
.title-wrapper {
  display: flex;
  width: 100%;
  color: rgb(107, 107, 107);
}
.title-wrapper div {
  flex: 1;
  box-sizing: border-box;
  height: 30px;
  line-height: 19px;
  padding: 5px;
}
.title-wrapper div:hover {
  background-color: rgb(65, 65, 65);
}
.song-wrapper {
  display: flex;
  width: 100%;
  cursor: pointer;
}
.song-wrapper > div {
  flex: 1;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding-left: 5px;
  color: rgb(107, 107, 107);
}
.song-wrapper .title,
.song-wrapper .singer,
.song-wrapper .album {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.song-wrapper.active .title span {
  color: #f40 !important;
}
.song-wrapper .title span:nth-of-type(1) {
  color: rgb(206, 206, 206);
  margin-right: 5px;
}

.song-wrapper .title span:nth-of-type(2) {
  color: rgb(107, 107, 107);
}
.song-wrapper .title span:nth-of-type(2) span {
  color: rgb(107, 107, 107);
}
.song-wrapper:hover {
  background-color: rgb(61, 61, 61);
}
.song-wrapper .index {
  text-align: center;
}
.show {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>