<template>
  <div
    class="box"
    v-for="item in data"
    :key="item.id"
    @click="handleClick(item.id)"
  >
    <div class="wrapper">
      <img :src="item.coverImgUrl" alt="" />
      <div class="playCount">
        <RightCircleOutlined />
        {{
          item.playCount > 10000
            ? (item.playCount / 10000).toFixed(0) + "万"
            : item.playCount
        }}
      </div>
    </div>
    <div class="title">{{ item.name }}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, Ref, ref, watchEffect } from "vue";
import { RightCircleOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    RightCircleOutlined,
  },
  props: ["data"],
  setup(props) {
    let data: Ref<any[]> = ref([]);
    const router = useRouter();
    watchEffect(() => {
      if (props.data) {
        data.value = props.data;
      }
    });
    const handleClick = (id: number) => {
      router.push(`/songlistdetails?id=${id}`);
    };
    return {
      data,
      handleClick,
    };
  },
});
</script>

<style scoped>
.box {
  margin-bottom: 20px;
  margin-right: 15px;
}
.wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: aqua;
  border-radius: 5px;
  overflow: hidden;
}
.wrapper img {
  width: 100%;
  height: 100%;
}
.playCount {
  position: absolute;
  top: 3px;
  right: 3px;
  color: #fff;
  font-size: 12px;
}
.title {
  color: rgb(138, 138, 138);
  cursor: pointer;
}
</style>