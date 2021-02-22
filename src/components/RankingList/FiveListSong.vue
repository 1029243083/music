<template>
  <div class="box">
    <ul class="list-wrapper">
      <li
        class="item"
        v-for="(item, i) in songInfoRef"
        :key="item.id"
        @click="playSong(item.id)"
      >
        <div class="index" :class="{ active: i <= 2 }">{{ i + 1 }}</div>
        <div class="m">-</div>
        <div class="name">{{ item.name }}</div>
        <div class="desc">
          <span v-for="al in item.alia" :key="al">{{ al }}</span>
        </div>
        <div class="singer">
          <span v-for="ar in item.ar" :key="ar.id">{{ ar.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref } from "vue";
import { getSoneAllInfo, getSongSheetInfo } from "../../Axios/axiosFuns";
import { useStore } from "vuex";
export default defineComponent({
  props: ["id"],
  setup(
    props: Readonly<{
      id?: number;
    }>
  ) {
    const songInfoRef: Ref<any[]> = ref([]);
    const stort = useStore();
    (async () => {
      if (props.id) {
        const res = await getSongSheetInfo(props.id);
        const ids: any[] = res.playlist.trackIds.slice(0, 5);
        const songInfo = await getSoneAllInfo(ids);
        songInfoRef.value = songInfo.songs;
      }
    })();

    const playSong = async (id: number) => {
      const res = await getSoneAllInfo([{ id }]);
      if (res) {
        stort.commit("setSong", res.songs[0]);
      }
    };

    return {
      songInfoRef,
      playSong,
    };
  },
});
</script>

<style scoped>
.box {
  box-sizing: border-box;
  padding: 9px;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
ul li.item {
  position: relative;
  display: flex;
  cursor: pointer;
  height: 32px;
  line-height: 28px;
  padding: 3px;
}
ul li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.index {
  width: 15px;
  text-align: center;
  color: rgb(172, 172, 172);
}
.index.active {
  color: #f40;
  font-weight: bold;
}
.m {
  margin: 0 5px;
  color: rgb(172, 172, 172);
}
.name {
  color: #fff;
  margin-right: 15px;
}
.desc {
  color: rgb(172, 172, 172);
  font-size: 12px;
}
.singer {
  position: absolute;
  right: 10px;
  color: rgb(172, 172, 172);
}
</style>