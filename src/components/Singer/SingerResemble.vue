<template>
  <div class="box">
    <SingerList :list="artistsRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watchEffect } from "vue";
import { getSimiSinger } from "../../Axios/axiosFuns";
import SingerList from "./singerList.vue";
import { useRoute } from "vue-router";
export default defineComponent({
  props: ["id"],
  components: {
    SingerList,
  },
  setup(props) {
    const artistsRef: Ref<any[]> = ref([]);
    const route = useRoute();
    (async () => {
      const res = await getSimiSinger(props.id);
      artistsRef.value = res.artists;
    })();

    watchEffect(async () => {
      if (route.query.id && typeof route.query.id === "string") {
        const res = await getSimiSinger(route.query.id);
        artistsRef.value = res.artists;
      }
    });

    return {
      artistsRef,
    };
  },
});
</script>

<style scoped>
.box {
  margin-top: 15px;
}
</style>