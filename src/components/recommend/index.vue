<template>
  <div class="banner-wrapper">
    <a-carousel :after-change="onChange" autoplay>
      <div v-for="item in bannerRef" :key="item.encodeId" class="img-box">
        <img :src="item.imageUrl" alt="" />
      </div>
    </a-carousel>
  </div>
  <div class="text">推荐歌单</div>
  <div class="list">
    <Card
      v-for="item in cardRef"
      :key="item.id"
      :card="item"
      @click="handleClick(item.id)"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref } from "vue";
import { getBanner, getPersonalized } from "../../Axios/axiosFuns";
import Card from "./Card.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const bannerRef: Ref<any[]> = ref([]);
    const cardRef: Ref<any[]> = ref([]);
    const router = useRouter();
    (async () => {
      const res = await getBanner();
      const carddata = await getPersonalized();
      console.log(carddata);
      bannerRef.value = res.banners;
      cardRef.value = carddata.result;
    })();

    const handleClick = (id: number) => {
      router.push(`/home/songlistdetails?id=${id}`);
    };

    return {
      bannerRef,
      cardRef,
      handleClick,
    };
  },
});
</script>

<style scoped>
.banner-wrapper {
  margin: 0 auto;
  width: 80%;
  height: 200px;
}

img {
  border-radius: 10px;
  width: 100%;
  height: 200px;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.text {
  margin-top: 15px;

  font-weight: bold;
  font-size: 20px;
  color: #fff;
}
</style>