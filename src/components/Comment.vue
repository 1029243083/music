<template>
  <div class="box">
    <div class="time" v-for="item in list" :key="item.commentId">
      <div class="user">
        <img :src="item.user.avatarUrl" alt="" />
      </div>
      <div class="content">
        <div class="top-box">
          <span class="name">{{ item.user.nickname }}：</span>
          <span class="text">{{ item.content }}</span>
        </div>
        <div class="date">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watchEffect, computed } from "vue";
import { getCommit } from "../Axios/axiosFuns";
export default defineComponent({
  props: ["id"],
  setup(props) {
    const name: Ref<string> = ref("");
    const text: Ref<string> = ref("");
    const list: Ref<any[]> = ref([]);
    const limit = 20;

    watchEffect(async () => {
      if (!props.id) return;
      const res = await getCommit(props.id, limit);
      list.value = res.comments;
      list.value.forEach((item) => {
        const date = new Date(item.time);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        item.time = `${month}月${day}日 ${hours}:${minutes}`;
      });
    });

    return {
      name,
      text,
      list,
    };
  },
});
</script>

<style scoped>
.box {
  box-sizing: border-box;
  padding: 0 130px;
  overflow: auto;
}
.time {
  display: flex;
  width: 600px;
  padding-bottom: 15px;
  padding-top: 5px;
  border-bottom: 1px solid rgb(73, 73, 73);
}
.time .user {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 15px;
  overflow: hidden;
}
.user img {
  width: 100%;
  height: 100%;
}
.content {
  font-size: 14px;
}
.top-box .name {
  color: rgb(109, 150, 240);
  margin-right: 5px;
  cursor: pointer;
}
.content .date {
  margin-top: 8px;
  color: rgb(90, 90, 90);
  font-size: 12px;
}
</style>