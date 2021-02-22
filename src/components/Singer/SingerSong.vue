<template>
  <SongList :songListInfo="list" />
</template>

<script lang='ts'>
// 歌手歌曲
import { message } from "ant-design-vue";
import { defineComponent, ref, Ref } from "vue";
import { getSingerSong } from "../../Axios/axiosFuns";
import SongList from "../../components/SongList.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    SongList,
  },
  props: ["id"],
  setup(props) {
    const list: Ref<any[]> = ref([]);
    const store = useStore();
    message.info("只显示此歌手的50首热门歌曲");
    (async () => {
      const res = await getSingerSong(props.id);
      list.value = res.hotSongs;
      store.commit("setSongList", list.value);
    })();

    return {
      list,
    };
  },
});
</script>

<style>
</style>