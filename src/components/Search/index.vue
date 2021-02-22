<template>
  <div class="wrapper">
    <div class="song-wrapper">
      <div class="text" v-if="songList"><CustomerServiceOutlined />单曲</div>
      <div
        class="song"
        v-for="item in songList"
        :key="item.id"
        @click="palySong(item.id)"
      >
        <div class="name">{{ item.name }}</div>
        <div class="desc">
          <span v-for="al in item.alia" :key="al">{{ al }}</span>
        </div>
        <div class="singer">
          <span v-for="ar in item.ar" :key="ar.id">{{ ar.name }}</span>
        </div>
      </div>
    </div>
    <div class="singer-wrapper">
      <div class="text" v-if="songList"><UserOutlined />歌手</div>
      <div
        class="singer"
        v-for="singer in singerList"
        :key="singer.id"
        @click="handleClick(singer.id)"
      >
        {{ singer.name }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref, watchEffect } from "vue";
import { CustomerServiceOutlined, UserOutlined } from "@ant-design/icons-vue";
import { getSoneAllInfo } from "../../Axios/axiosFuns";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  props: ["data"],
  components: {
    CustomerServiceOutlined,
    UserOutlined,
  },
  setup(props) {
    const songList: Ref<any[]> = ref([]);
    const singerList: Ref<any[]> = ref([]);
    const store = useStore();
    const router = useRouter();
    watchEffect(() => {
      if (props.data) {
        songList.value = props.data.song;
        singerList.value = props.data.artists;
        console.log(songList.value);
        console.log(singerList.value);
      }
    });
    const palySong = async (id: number) => {
      const res = await getSoneAllInfo([{ id }]);
      if (res) {
        store.commit("setSong", res.songs[0]);
      }
    };
    const handleClick = (id: number) => {
      router.push(`/home/singerandsong?id=${id}`);
    };
    return {
      songList,
      singerList,
      palySong,
      handleClick,
    };
  },
});
</script>

<style scoped>
.wrapper {
  box-sizing: border-box;
  padding: 5px;
  width: 400px;
  height: 400px;
  border-radius: 9px;
  background-color: rgb(41, 41, 41);
  line-height: 22px;
}
.text {
}
.song {
  display: flex;
  padding: 3px;
}
.song:hover {
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}
.name {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(226, 226, 226);
}
.desc {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(143, 143, 143);
  margin-left: 9px;
}
.singer {
  width: 200px;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.singer-wrapper {
  margin-top: 5px;
}
.singer {
  color: rgb(95, 128, 238);
  text-align: left;
  cursor: pointer;
}
</style>