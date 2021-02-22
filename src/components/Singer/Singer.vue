<template>
  <div class="sing-box">
    <div class="img-box">
      <img :src="data.img1v1Url" alt="" />
    </div>
    <div class="name-box">
      <div class="name">{{ data.name }}</div>
      <div class="icon">
        <UserOutlined
          :style="{
            backgroundColor: '#f40',
            borderRadius: '50%',
            padding: '2px',
            color: '#fff',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    UserOutlined,
  },
  props: ["data"],
});
</script>

<style scoped>
.sing-box {
  position: relative;
  width: 208px;
  height: 244px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.img-box {
  position: absolute;
  width: 100%;
  z-index: 50;
  top: 0;
  border-radius: 5px;
  overflow: hidden;
  bottom: 30px;
}
.img-box img {
  width: 100%;
  height: 100%;
}
.name-box {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
  color: rgb(192, 192, 192);
}
</style>