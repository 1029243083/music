<template>
  <div class="header-wrapper">
    <div class="title">网易云音乐</div>
    <div class="user">
      <div class="img-wrapper">
        <img :src="imgUrlRef ? imgUrlRef : img" alt="" />
      </div>

      <div class="name" @click="goLogin">
        {{ nameRef ? nameRef : "去登录" }}
      </div>

      <a-button
        type="dashed"
        ghost
        class="outLogin"
        @click="outLogin"
        v-if="nameRef"
        >退出登陆</a-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { Store, useStore } from "vuex";
import { useRouter } from "vue-router";
import { IState } from "../Store";
import img from "../assets/av.jpg";
export default defineComponent({
  setup() {
    const store: Store<IState> = useStore();
    const imgUrlRef: Ref<string> = ref("");
    const nameRef: Ref<string> = ref("");
    const router = useRouter();

    /**
     * 获取数据
     */
    (() => {
      const { name, avatarUrl } = store.state.user;
      nameRef.value = name;
      imgUrlRef.value = avatarUrl;
    })();

    /**
     * 去登录
     */
    const goLogin = () => {
      const { id } = store.state.user;
      if (!id) {
        router.push("/login");
        return;
      }
    };

    /**
     * 退出登录
     */
    const outLogin = () => {
      store.dispatch("outLogin").then(() => {
        nameRef.value = "";
        imgUrlRef.value = "";
        store.commit("setUser", { id: "", name: "", avatarUrl: "" });
      });
    };
    return {
      imgUrlRef,
      nameRef,
      img,
      outLogin,
      goLogin,
    };
  },
});
</script>

<style scoped>
.header-wrapper {
  box-sizing: border-box;
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  color: rgb(139, 139, 139);
  background-color: rgb(32, 32, 35);
  border-bottom: 2px solid rgb(153, 24, 24);
}
.title {
  font-size: 16px;
  color: #fff;
  font-weight: bold;
}
.user {
  display: flex;
  align-items: center;
}
.user .img-wrapper {
  position: relative;
  width: 30px;
  border-radius: 50%;
  overflow: hidden;
  height: 30px;
}
.user .img-wrapper img {
  position: absolute;
  top: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.name {
  margin-left: 8px;
  cursor: 6666566;
  cursor: pointer;
}
.outLogin {
  margin-left: 15px;
}
</style>