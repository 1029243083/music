<template>
  <div class="card-wrapper">
    <div class="img-wrapper">
      <img :src="card.picUrl" alt="" />
      <div class="name-wrapper">
        <UserOutlined class="icon" />
        {{ card.name }}
      </div>
      <div class="palyCount">
        <PlayCircleOutlined class="icon" />
        {{
          card.playCount > 10000
            ? (card.playCount / 10000).toFixed(0) + "万"
            : card.playCount
        }}
      </div>
    </div>
    <div class="title"></div>
  </div>
</template>

<script lang="ts">
// 一个歌单的卡片页
import { defineComponent } from "vue";
import { UserOutlined, PlayCircleOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  props: ["card"],
  components: {
    UserOutlined,
    PlayCircleOutlined,
  },
});
</script>

<style scoped>
.card-wrapper {
  width: 248px;
  box-sizing: border-box;
  margin-right: 10px;
  cursor: pointer;
}
.card-wrapper .img-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
}
.card-wrapper .img-wrapper img {
  width: 100%;
  height: 100%;
}
.card-wrapper .title {
  height: 30px;
  margin-top: 5px;
  font-size: 12px;
  color: rgb(167, 167, 167);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name-wrapper {
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  color: #fff;
  width: 100%;
  font-size: 12px;
  padding-left: 9px;
  height: 30px;
  line-height: 37px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), #000);
}
.icon {
  margin-right: 3px;
}
.palyCount {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 12px;
  padding-right: 10px;
}
</style>