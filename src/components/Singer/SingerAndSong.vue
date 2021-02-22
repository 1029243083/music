<template>
  <div class="header-wrapper">
    <SingerInfo :id="id" />
  </div>
  <div class="songList-wrapper">
    <div class="btn">
      <div @click="changeType('album')" :class="{ active: type === 'album' }">
        专辑
      </div>
      <div @click="changeType('info')" :class="{ active: type === 'info' }">
        歌手详情
      </div>
      <div
        @click="changeType('resemble')"
        :class="{ active: type === 'resemble' }"
      >
        相似歌手
      </div>
    </div>
    <SingerSong :id="id" v-if="type === 'album'" />
    <SingerMess :id="id" v-if="type === 'info'" />
    <SingerResemble :id="id" v-if="type === 'resemble'" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import SingerInfo from "./SingerInfo.vue";
import SingerSong from "./SingerSong.vue";
import SingerMess from "./SingerMess.vue";
import SingerResemble from "./SingerResemble.vue";
export default defineComponent({
  components: {
    SingerInfo,
    SingerSong,
    SingerMess,
    SingerResemble,
  },
  setup() {
    const id: Ref<string> = ref("");
    const route = useRoute();
    const type: Ref<string> = ref("album");
    const qId = ref(route.query.id);
    if (qId.value && typeof qId.value === "string") {
      id.value = qId.value;
    }

    const changeType = (t: string) => {
      type.value = t;
    };

    watchEffect(() => {
      //纯属监控路由变化

      if (route.query.id && typeof route.query.id === "string") {
        type.value = "album";
      }
    });

    return {
      id,
      type,
      changeType,
    };
  },
});
</script>

<style scoped>
.btn {
  display: flex;
  color: rgb(201, 201, 201);
  font-size: 20px;
  font-weight: bold;
}
.btn div {
  margin-right: 15px;
  cursor: pointer;
}
.btn div.active {
  border-bottom: 3px solid rgb(145, 64, 64);
}
</style>