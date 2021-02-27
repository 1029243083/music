<template>
  <div class="wrapper">
    <div class="header"><IHeader /></div>

    <div class="box">
      <div class="menu-box"><Menu /></div>
      <div class="content"><router-view></router-view></div>
    </div>

    <div class="footer"><Audio /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IHeader from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import Audio from "../components/Audio.vue";
export default defineComponent({
  components: {
    IHeader,
    Menu,
    Audio,
  },
});
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 9%;
}
.box {
  display: flex;
  width: 100%;
  height: 81%;
}
.menu-box {
  width: 13%;
  height: 100%;
}
.content {
  width: 87%;
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  background: rgb(56, 56, 56);
  overflow: auto;
}
.content::-webkit-scrollbar {
  width: 8px;
  background: rgba(0, 0, 0, 0.5);
}
.content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.9);
  border-radius: 5px;
}
.footer {
  width: 100%;
  height: 10%;
}
</style>