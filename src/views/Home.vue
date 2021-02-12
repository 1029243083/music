<template>
  <a-layout class="layout-wrapper">
    <a-layout-header class="layout-header"><Header /></a-layout-header>
    <a-layout>
      <a-layout-sider class="layout-sider"><Menu /></a-layout-sider>
      <a-layout-content class="content"
        ><router-view></router-view
      ></a-layout-content>
    </a-layout>
    <a-layout-footer class="layout-footer"><Audio /></a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import Audio from "../components/Audio.vue";

export default defineComponent({
  name: "App",
  components: { Header, Menu, Audio },
});
</script>

<style scoped>
.layout-wrapper {
  height: 100%;
}
.layout-header,
.layout-sider,
.layout-footer {
  background-color: transparent;
  padding: 0;
}
.content {
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  background-color: rgb(43, 43, 43);
}
.content::-webkit-scrollbar {
  width: 8px;
  background-color: rgb(65, 65, 65);
}
.content::-webkit-scrollbar-thumb {
  width: 2px;
  background-color: rgba(0, 0, 0, 0.473);
  border-radius: 5px;
}
</style>