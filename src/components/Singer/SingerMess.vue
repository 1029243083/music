<template>
  <div class="box">
    <div>
      <div class="s">简史</div>
      <p class="message">
        {{ messageText }}
      </p>
    </div>

    <div>
      <div v-for="item in introduction" :key="item.ti" class="introduction">
        <div class="s">{{ item.ti }}</div>
        <div class="message" v-html="item.txt"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { getSingerMess } from "../../Axios/axiosFuns";
export default defineComponent({
  props: ["id"],
  setup(props) {
    const messageText: Ref<string> = ref("");
    const introduction: Ref<any[]> = ref([]);
    (async () => {
      const res = await getSingerMess(props.id);
      messageText.value = res.briefDesc;
      introduction.value = res.introduction;
    })();

    return {
      messageText,
      introduction,
    };
  },
});
</script>

<style scoped>
.box {
  margin-top: 15px;
}
.message {
  color: rgb(156, 156, 156);
  line-height: 28px;
  text-indent: 2em;
}
.s {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.introduction {
  margin-bottom: 20px;
}
</style>