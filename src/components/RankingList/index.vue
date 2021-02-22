<template>
  <div>
    <ListCardSong :data="listData" />
  </div>
  <div class="card-wrapper">
    <Card :data="cardData" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, Ref, ref } from "vue";
import { getToplist } from "../../Axios/axiosFuns";
import ListCardSong from "./listCardSong.vue";
import Card from "./Card.vue";
export default defineComponent({
  components: {
    ListCardSong,
    Card,
  },
  setup() {
    let listData: Ref<any[]> = ref([]);
    let cardData: Ref<any[]> = ref([]);
    (async () => {
      const { list } = await getToplist();
      listData.value = list.slice(0, 4);
      cardData.value = list.slice(4);
    })();
    return {
      listData,
      cardData,
    };
  },
});
</script>

<style scoped>
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>