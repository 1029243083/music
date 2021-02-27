<template>
  <audio :ref="getItemRef"></audio>
  <div class="box">
    <div class="info-wrapper">
      <div class="img-wraper" @click="changeIshowInfoPlay">
        <img :src="imgUrl ? imgUrl : defaultImg" alt="" />
      </div>
      <div class="author-wrapper">
        <div class="name">{{ songName }}</div>
        <div class="author">
          <span v-for="(ar, i) in author" :key="ar.id"
            >{{ ar.name }}{{ i >= author.length - 1 ? "" : "/" }}</span
          >
        </div>
      </div>
    </div>
    <div class="control-wrapper">
      <div class="inco-wrapper">
        <div class="prev" @click="handleClick('prev')">
          <StepBackwardOutlined />
        </div>
        <div class="play" @click="isPlay">
          <CaretRightOutlined v-if="show" /><PauseCircleOutlined v-else />
        </div>
        <div class="next" @click="handleClick('next')">
          <StepForwardOutlined />
        </div>
      </div>
      <div class="strip-wrapper">
        <span>{{ currentVlaue ? currentVlaue : "00:00" }}</span>

        <div>
          <Slider
            id="test"
            :tipFormatter="null"
            @change="silderChange"
            v-model:value="value1"
          />
        </div>
        <span class="end">{{ songTime }}</span>
      </div>
    </div>
    <div class="list-wrapper">
      <div class="icon-list" @click="showList">
        <BarsOutlined />
      </div>
      <div class="songList-wrapper" v-show="isShowList">
        <SongList :songListInfo="songListRef" />
      </div>
    </div>
    <div class="song-info-play" v-if="isshowInfoPlay">
      <Lyric :type="type" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, watchEffect, onMounted, ref, Ref } from "vue";
import { Store, useStore } from "vuex";
import { getSongUrl } from "../Axios/axiosFuns";
import { arType, IState } from "../Store";
import defaultImg from "../assets/av.jpg";
import SongList from "../components/SongList.vue";
import Lyric from "../components/Lyric.vue";

import {
  StepBackwardOutlined,
  CaretRightOutlined,
  StepForwardOutlined,
  PauseCircleOutlined,
  BarsOutlined,
} from "@ant-design/icons-vue";
import { message, Slider } from "ant-design-vue";

export default defineComponent({
  components: {
    StepBackwardOutlined,
    CaretRightOutlined,
    StepForwardOutlined,
    PauseCircleOutlined,
    BarsOutlined,
    SongList,
    Lyric,
    Slider,
  },
  setup() {
    const store: Store<IState> = useStore();
    const imgUrl: Ref<string> = ref("");
    const songName: Ref<string> = ref("");
    const author: Ref<arType[]> = ref([]);
    const value1: Ref<number> = ref(0);
    let timer: number | null = null;
    let timer1: number | null = null;
    const currentTime: Ref<number> = ref(0);
    let duration: Ref<number> = ref(0);
    const show: Ref<boolean> = ref(true);
    const currentVlaue: Ref<string> = ref("");
    const songTime: Ref<string> = ref("");
    const isOk: Ref<boolean> = ref(false);
    const songListRef: Ref<any[]> = ref([]);
    const isShowList: Ref<boolean> = ref(false);
    const isshowInfoPlay: Ref<boolean> = ref(false);
    const type: Ref<string> = ref("");

    let Auiod: any = null;
    const getItemRef = (el: any) => {
      Auiod = el;
    };
    onMounted(() => {
      Auiod.addEventListener("loadedmetadata", function (e: any) {
        //当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。
        songTime.value = ((e.target.duration as number) / 60)
          .toFixed(2)
          .replace(/\./, ":");
      });
    });
    watchEffect(async () => {
      /**
       * 当url变化时
       * 获取url
       * 开始播放
       * 开始进度条
       */

      if (!store.state.song.id) return;

      value1.value = 0;
      const res = await getSongUrl(store.state.song.id); // 根据id获取音乐的url

      if (res) {
        // 改变audio标签的url
        const { name, ar, al, dt } = store.state.song;
        if (dt) {
          duration.value = dt / 100;
        }
        if (al) {
          imgUrl.value = al.picUrl;
        }
        if (name) {
          songName.value = name;
        }
        if (ar) {
          author.value = ar;
        }
        Auiod.src = res.data.data[0].url;
        Auiod.play();
        show.value = false; // 变化播放的图标
        if (timer1) {
          // 换歌时清除进度条的定时器，然后在重新开启
          clearInterval(timer1);
        }
        if (timer) {
          clearInterval(timer);
        }
        timer1 = setInterval(() => {
          value1.value++;
          if (value1.value >= 100) {
            if (timer1) {
              clearInterval(timer1);
              isOk.value = true; // 播放结束
              if (timer) {
                clearInterval(timer);
                currentVlaue.value = songTime.value;
              }
              show.value = true;
            }
          }
        }, duration.value);
        timer = setInterval(() => {
          if (Auiod) {
            currentVlaue.value = (Auiod.currentTime / 60)
              .toFixed(2)
              .replace(/\./, ":");
          }
        }, 800);
      }
    });
    /**
     * 拖动进度条
     */
    const silderChange = (value: number) => {
      currentTime.value = duration.value * value;
      Auiod.currentTime = currentTime.value / 1000; // currentTime 接收秒
      show.value = false;
      Auiod.play();
    };

    /**
     * 播放 / 暂停
     */
    const isPlay = () => {
      if (!Auiod.paused) {
        // 正在播放
        Auiod.pause();
        type.value = "pause";
        show.value = true;
        if (timer1) {
          clearInterval(timer1);
        }
      } else {
        if (isOk.value) {
          value1.value = 0;
          currentVlaue.value = "00:00";
          songTime.value = ((Auiod.duration as number) / 60)
            .toFixed(2)
            .replace(/\./, ":");
          isOk.value = false;
          Auiod.currentTime = 0;
          timer = setInterval(() => {
            if (Auiod) {
              currentVlaue.value = (Auiod.currentTime / 60)
                .toFixed(2)
                .replace(/\./, ":");
            }
          }, 800);
        }
        Auiod.play();
        type.value = "play";
        show.value = false;
        timer1 = setInterval(() => {
          value1.value++;
          if (value1.value >= 100) {
            if (timer1) {
              clearInterval(timer1);
              isOk.value = true; // 播放结束
              if (timer) {
                clearInterval(timer);
                currentVlaue.value = songTime.value;
              }
              show.value = true;
              clearInterval(timer1);
            }
          }
        }, duration.value);
      }
    };

    /**
     * 上一首 | 下一首
     */
    const handleClick = (type: "prev" | "next") => {
      if (type === "prev") {
        // 上一首
        if (store.state.index === 0) {
          return;
        } else {
          store.commit("setIndex", --store.state.index);
        }
      } else if (type === "next") {
        // 下一首
        if (store.state.index === store.state.songList.length) {
          return;
        } else {
          store.commit("setIndex", ++store.state.index);
        }
      }
    };

    /**
     * 显示播放列表
     */
    const showList = () => {
      if (store.state.songList.length === 0) {
        message.info("没有播放列表，请点击播放全部");
        isShowList.value = false;
      } else {
        if (songListRef.value.length !== 0 && isShowList.value) {
          isShowList.value = false;
          return;
        } else {
          songListRef.value = store.state.songList;
          isShowList.value = true;
        }
      }
    };

    const changeIshowInfoPlay = () => {
      if (imgUrl.value) {
        isshowInfoPlay.value = !isshowInfoPlay.value;
      }
    };
    return {
      getItemRef,
      imgUrl,
      songName,
      author,
      defaultImg,
      silderChange,
      value1,
      currentTime,
      isPlay,
      show,
      currentVlaue,
      songTime,
      handleClick,
      showList,
      isShowList,
      songListRef,
      isshowInfoPlay,
      changeIshowInfoPlay,
      type,
    };
  },
});
</script>

<style scoped>
.box {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: rgb(68, 68, 68);
  color: rgb(223, 223, 223);
}
.info-wrapper {
  display: flex;
}
.info-wrapper .img-wraper {
  width: 50px;
  height: 50px;
  margin-right: 8px;
  cursor: pointer;
}

.info-wrapper .img-wraper img {
  width: 100%;
  height: 100%;
}
.author-wrapper .name:hover {
  color: #fff;
  cursor: pointer;
}
.author-wrapper .author span {
  margin-right: 5px;
  font-size: 12px;
}
.control-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding-top: 10px;
  width: 600px;
  height: 100%;
  color: rgb(214, 214, 214);
}
.control-wrapper .prev,
.control-wrapper .play,
.control-wrapper .next {
  font-size: 20px;
  display: inline-block;
  border-radius: 50%;
  text-align: center;
  padding: 0 5px;
  background-color: rgb(41, 41, 41);
  cursor: pointer;
}
.control-wrapper .inco-wrapper {
  display: flex;
  box-sizing: border-box;
  padding: 0 212px;
  justify-content: space-around;
}
.strip-wrapper {
  box-sizing: border-box;
  align-items: center;
}
.strip-wrapper {
  position: relative;
}
.strip-wrapper span {
  position: absolute;
  left: -37px;
  top: -7px;
}
.strip-wrapper span.end {
  position: absolute;
  left: 605px;
  top: -7px;
}
.strip-wrapper #test .ant-slider-rail {
  background-color: rgb(0, 0, 0) !important;
}
.list-wrapper {
  position: absolute;
  right: 300px;
}
.list-wrapper .icon-list {
  font-size: 20px;
  cursor: pointer;
  background-color: rgb(39, 39, 39);
  border-radius: 50%;
  padding: 0 5px;
}
.songList-wrapper {
  position: absolute;
  top: -621px;
  right: -300px;
  width: 364px;
  height: 606px;
  background-color: blanchedalmond;
  overflow: auto;
  border-radius: 5px;
  transition: all 0.5s;
  background-color: rgb(32, 27, 27);
}
.songList-wrapper::-webkit-scrollbar {
  width: 8px;
  background-color: rgb(65, 65, 65);
}
.songList-wrapper::-webkit-scrollbar-thumb {
  width: 2px;
  background-color: rgba(0, 0, 0, 0.473);
  border-radius: 5px;
}
.song-info-play {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 62px;
}
</style>