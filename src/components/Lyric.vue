<template>
  <div class="wrapper">
    <div class="center">
      <div class="top-wrapper">
        <div class="left-wrapper">
          <div class="img-wrapper">
            <div class="dot">
              <div>
                <div>
                  <div></div>
                </div>
              </div>
            </div>

            <img
              :src="imgUrl"
              alt=""
              v-bind:style="{ transform: `rotateZ(${rotateZ}deg)` }"
            />
          </div>
        </div>

        <div class="right-wrapper">
          <div class="title">{{ album }}</div>
          <div class="info">
            <!-- 专辑 -->
            <div class="album">
              <span>专辑:</span>
              <span>{{ album }}</span>
            </div>
            <!-- 歌手 -->
            <div class="singer">
              <span>歌手:</span>
              <span>{{ singer }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-wrapper">
        <Comment :id="songId" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
  Ref,
  watchEffect,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { Store, useStore } from "vuex";
import { getSoneAllInfo } from "../Axios/axiosFuns";
import { IState } from "../Store";
import Comment from "./Comment.vue";
export default defineComponent({
  components: {
    Comment,
  },
  props: ["type"],
  setup(props) {
    const store: Store<IState> = useStore();
    const imgUrl: Ref<string> = ref("");
    const rotateZ: Ref<number> = ref(0);
    let timer: Ref<number | null> = ref(null);
    const album: Ref<string> = ref("");
    const singer: Ref<string> = ref("");
    const songId: Ref<number> = ref(0);
    /**
     * 当歌曲改变
     */
    watchEffect(async () => {
      if (!store.state.song) return;
      const res = await getSoneAllInfo([store.state.song]);
      const info = res.songs[0];
      imgUrl.value = info.al.picUrl;
      album.value = info.name;
      singer.value = info.ar
        .map((item: any) => {
          return item.name;
        })
        .join("/");
      songId.value = info.id;
    });

    /**
     * 当暂停 / 播放
     */
    watchEffect(() => {
      if (props.type === "pause") {
        if (timer.value) {
          clearInterval(timer.value);
          timer.value = null;
        }
      } else if (props.type === "play") {
        ChangeRotateZ();
      }
    });
    /**
     * 当挂载完成启动计时器
     */
    onMounted(() => {
      ChangeRotateZ();
    });

    /**
     * 组件销毁停止计时器
     */
    onBeforeUnmount(() => {
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
      }
    });

    /**
     * 改变rotateZ的值 来旋转
     */
    const ChangeRotateZ = () => {
      timer.value = setInterval(() => {
        rotateZ.value++;
        if (rotateZ.value >= 360) {
          rotateZ.value = 0;
        }
      }, 50);
    };

    return {
      imgUrl,
      rotateZ,
      singer,
      album,
      songId,
    };
  },
});
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 99%;
  display: flex;
  justify-content: center;
  overflow: auto;
  background-color: #2b2b2b;
}
.wrapper .center {
  width: 1200px;
}
.wrapper .center .top-wrapper {
  display: flex;
}
.left-wrapper {
  position: relative;
  width: 50%;
  height: 473px;
}
.img-wrapper {
  display: flex;
  justify-content: center;
}
.dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  background-color: #000;
  border-radius: 50%;
}
.dot > div {
  width: 284px;
  height: 284px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 4px solid rgb(80, 80, 80);
}
.dot > div > div {
  display: flex;

  align-items: center;
  justify-content: center;
  width: 251px;
  height: 251px;
  border-radius: 50%;
  border: 4px solid rgb(80, 80, 80);
}
.dot > div > div > div {
  width: 216px;
  height: 216px;
  border-radius: 50%;
  border: 4px solid rgb(80, 80, 80);
}
.img-wrapper {
}
.img-wrapper img {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  top: 11%;
  overflow: hidden;
}
.right-wrapper {
  flex: 1;
}
.title {
  font-size: 20px;
  color: rgb(185, 185, 185);
}
.right-wrapper .info {
  display: flex;
}
.right-wrapper .info .album {
  margin-right: 15px;
}
.right-wrapper .title {
  margin-bottom: 10px;
}
.right-wrapper .info .album span:nth-of-type(2),
.right-wrapper .info .singer span:nth-of-type(2) {
  margin-left: 5px;
  cursor: pointer;
  color: rgb(114, 223, 223);
}
</style>