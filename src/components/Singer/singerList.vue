<template>
  <div class="singer-box">
    <Singer
      v-for="data in singerListRef"
      :key="data.id"
      :data="data"
      @click="handleClick(data)"
    />
  </div>
</template>

<script lang='ts'>
/**
 * 数据的里面的属性
 */
type ISingerType = {
  id?: number;
  img1v1Url?: string;
  musicSize?: number;
  name?: string;
  picId?: number;
  picUrl?: string;
  topicPerson?: number;
};
import { defineComponent, ref, Ref, watchEffect } from "vue";
import Singer from "./Singer.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  props: ["list"],
  components: {
    Singer,
  },
  setup(
    props: Readonly<{
      list?: ISingerType[]; // 数据为以数组
    }>
  ) {
    const singerListRef: Ref<any[]> = ref([]);
    const router = useRouter();

    watchEffect(() => {
      // 数据改变能获取到新的数据
      const { list } = props;
      if (list && list.length > 0) {
        singerListRef.value = list;
      }
    });

    /**
     * 点击歌手
     */
    const handleClick = (data: ISingerType) => {
      router.push(`/home/singerandsong?id=${data.id}`);
    };

    return {
      singerListRef,
      handleClick,
    };
  },
});
</script>

<style scoped>
.singer-box {
  display: flex;
  flex-wrap: wrap;
}
</style>