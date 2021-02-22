<template>
  <div class="wrapper" v-for="item in data" :key="item.id">
    <div class="img-wrapper" @click="handleClick(item.id)">
      <img :src="item.coverImgUrl" alt="" />
      <div class="date">{{ item.updateTime }}</div>
    </div>
    <div class="songList-wrapper">
      <FiveListSong :id="item.id" />
      <span @click="handleClick(item.id)" class="showAll">查看全部 ></span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, Ref, ref, watchEffect } from "vue";
import FiveListSong from "./FiveListSong.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    FiveListSong,
  },
  props: ["data"],
  setup(props) {
    const data: Ref<any[]> = ref([]);
    const router = useRouter();
    watchEffect(() => {
      if (props.data.length) {
        data.value = props.data;
        data.value = data.value.map((item) => {
          const date = new Date(item.updateTime);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          item.updateTime = `${month > 10 ? month : "0" + month}月${day}日更新`;
          return item;
        });
      }
    });
    const handleClick = (id: number) => {
      router.push(`/home/songlistdetails?id=${id}`);
    };
    return {
      data,
      handleClick,
    };
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
}
.img-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
}
.img-wrapper .date {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 12px;
  color: #fff;
  transform: translate(-50%, 144%);
}
.img-wrapper img {
  width: 100%;
  height: 100%;
}
.songList-wrapper {
  flex: 1;
}
.songList-wrapper .showAll {
  margin-left: 10px;
  font-size: 12px;
  color: rgb(161, 161, 161);
  cursor: pointer;
}
.songList-wrapper .showAll:hover {
  color: #fff;
}
</style>