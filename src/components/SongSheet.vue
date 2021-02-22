<template>
  <div class="tags-wrapper">
    <div class="title">热门分类</div>
    <div class="tags">
      <span :class="{ active: catRef === '全部' }" @click="all">全部</span>
      <span
        v-for="item in tags"
        :key="item.id"
        :class="{ active: item.name === catRef }"
        @click="changeTag(item)"
        >{{ item.name }}</span
      >
    </div>
  </div>
  <div class="card-content">
    <Card
      v-for="card in cardRef"
      :key="card.id"
      :card="card"
      @click="handleCard(card)"
    />
  </div>

  <div class="pagination-wrapper">
    <a-pagination
      v-model:current="offset"
      :total="totalRef"
      @change="offsetChange"
    />
  </div>
  <div class="loading-wrapper" v-if="showRef">
    <Loading />
  </div>
</template>

<script lang='ts'>
// 全部歌单列表页
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import {
  getPlaylistHot,
  getSoneAllInfo,
  getSongSheetInfo,
} from "../Axios/axiosFuns";
import { getData } from "./ts";
import Card from "./SongSheetCard.vue";
import Loading from "./Loading.vue";
export default defineComponent({
  components: {
    Card,
    Loading,
  },
  setup() {
    const tags: Ref<object[]> = ref([]);
    const cardRef: Ref<object[]> = ref([]);
    const catRef: Ref<string> = ref("全部");
    const limitRef: Ref<number> = ref(50);
    const offset: Ref<number> = ref(1);
    const totalRef: Ref<number> = ref(0);
    const orderRef: Ref<"new" | "hot"> = ref("hot");
    const showRef: Ref<boolean> = ref(false);
    const trackIdsRef: Ref<object[]> = ref([]); // 歌曲的id数组
    const router = useRouter();

    (async () => {
      const res = await getPlaylistHot();
      tags.value = res.tags;
      showRef.value = true;
      const result = await getData(orderRef, catRef, limitRef, offset);
      cardRef.value = result.playlists;
      totalRef.value = result.total;
      showRef.value = false;
    })();

    const offsetChange = async (page: number) => {
      offset.value = page;
      showRef.value = true;
      const result = await getData(orderRef, catRef, limitRef, offset);
      cardRef.value = result.playlists;
      totalRef.value = result.total;
      showRef.value = false;
    };

    const changeTag = async (tag: any) => {
      offset.value = 1;
      catRef.value = tag.name;
      showRef.value = true;
      const result = await getData(orderRef, catRef, limitRef, offset);
      cardRef.value = result.playlists;
      totalRef.value = result.total;
      showRef.value = false;
    };

    const all = async () => {
      catRef.value = "全部";
      offset.value = 1;
      showRef.value = true;
      const result = await getData(orderRef, catRef, limitRef, offset);
      cardRef.value = result.playlists;
      totalRef.value = result.total;
      showRef.value = false;
    };
    const handleCard = async (card: any) => {
      router.push("/home/songlistdetails?id=" + card.id);
    };
    return {
      tags,
      offset,
      cardRef,
      totalRef,
      catRef,
      offsetChange,
      changeTag,
      showRef,
      all,
      handleCard,
    };
  },
});
</script>

<style scoped>
.tags-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}
.tags-wrapper .title {
  color: rgb(223, 223, 223);
  cursor: pointer;
  font-size: 18px;
  margin-right: 10px;
  font-weight: bold;
}
.tags {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.tags span {
  display: block;
  color: rgb(202, 202, 202);
  width: 100px;
  cursor: pointer;
  height: 25px;
  text-align: center;
  line-height: 25px;
}
.tags span:hover {
  color: #fff;
}
.tags .active {
  color: #f40;
  font-weight: bold;
}
.tags .active:hover {
  color: #f40;
  font-weight: bold;
}
.card-content {
  overflow: auto;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
}
.pagination-wrapper {
  display: flex;
  margin-top: 15px;
  padding-right: 15px;
  padding-bottom: 30px;
  justify-content: flex-end;
}
.loading-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>