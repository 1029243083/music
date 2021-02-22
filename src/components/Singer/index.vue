<template>
  <div class="wrapper">
    <div class="header-box">
      <div class="lang">
        <span>语种：</span>
        <span
          :class="{ active: item.id === langRef }"
          v-for="item in area"
          :key="item.id"
          class="lang-item"
          @click="changeLang(item.id)"
          >{{ item.value }}</span
        >
      </div>
      <div class="type">
        <span>分类：</span>
        <span
          v-for="item in type"
          :class="{ active: item.id === typeRef }"
          :key="item.id"
          class="type-item"
          @click="changeType(item.id)"
          >{{ item.value }}</span
        >
      </div>
      <div class="name">
        <div>筛选：</div>
        <div>
          <span @click="changeName(-1)" :class="{ active: nameRef === -1 }"
            >热门</span
          >
          <span
            v-for="item in name"
            :key="item"
            @click="changeName(item)"
            :class="{ active: item === nameRef }"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <div class="list-box">
      <SingerList :list="listRef" />
      <div class="next" @click="loadNext">
        点击加载更多<LoadingOutlined v-if="showIcom" />
      </div>
    </div>
    <div class="m" v-show="shoeRef"><Loading /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted } from "vue";
import { getSinger } from "../../Axios/axiosFuns";
import SingerList from "./singerList.vue";
import Loading from "../../components/Loading.vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    SingerList,
    Loading,
    LoadingOutlined,
  },
  setup() {
    let name: string[] = []; // 26字母
    const arr: string[] = [];
    const langRef: Ref<number> = ref(-1);
    const typeRef: Ref<number> = ref(-1);
    const nameRef: Ref<number> = ref(-1);
    const listRef: Ref<any[]> = ref([]);
    const shoeRef: Ref<boolean> = ref(true);
    const showIcom: Ref<boolean> = ref(false);

    for (var i = 0; i < 26; i++) {
      arr.push(String.fromCharCode(97 + i));
    }

    /**
     * 改变 area  的值
     */
    const changeLang = (id: number) => {
      langRef.value = id;
      getSingerInfo();
    };

    /**
     * 改变 type
     */
    const changeType = (id: number) => {
      typeRef.value = id;
      getSingerInfo();
    };

    /**
     * 改变name
     */
    const changeName = (name: number) => {
      nameRef.value = name;
      getSingerInfo();
    };

    /**
     * 获取数据 并赋值
     */
    async function getSingerInfo() {
      shoeRef.value = true;
      const res = await getSinger(
        30,
        typeRef.value,
        langRef.value,
        nameRef.value
      );
      if (res.code === 200) {
        listRef.value = res.artists;
        shoeRef.value = false;
      }
    }

    onMounted(async () => {
      shoeRef.value = true;
      getSingerInfo();
      shoeRef.value = false;
    });

    /**
     * 点击加载更多
     */
    const loadNext = async () => {
      showIcom.value = true;
      const newLimit = listRef.value.length + 30;
      const res = await getSinger(
        newLimit,
        typeRef.value,
        langRef.value,
        nameRef.value
      );
      if (res.code === 200) {
        const newList = res.artists.splice(listRef.value.length);
        listRef.value.push(...newList);
        shoeRef.value = false;
        showIcom.value = false;
      }
    };

    name = arr;
    return {
      type: [
        { id: -1, value: "全部" },
        { id: 1, value: "男歌手" },
        { id: 2, value: "女歌手" },
        { id: 3, value: "乐队" },
      ],
      area: [
        {
          id: -1,
          value: "全部",
        },
        {
          id: 7,
          value: "华语",
        },
        {
          id: 96,
          value: "欧美",
        },
        {
          id: 8,
          value: "日本",
        },
        {
          id: 16,
          value: "韩国",
        },
        {
          id: 0,
          value: "其他",
        },
      ],
      name,
      changeLang,
      changeType,
      changeName,
      langRef,
      typeRef,
      nameRef,
      listRef,
      shoeRef,
      showIcom,
      loadNext,
    };
  },
});
</script>

<style scoped>
.wrapper {
  position: relative;
}
.header-box {
  font-size: 12px;
}
.header-box .lang span:nth-of-type(1),
.header-box .type span:nth-of-type(1),
.header-box .name div:nth-of-type(1) {
  color: rgb(192, 192, 192);
}
.header-box .lang {
  margin-bottom: 15px;
}
.header-box .lang span.lang-item,
.header-box .type span.type-item {
  display: inline-block;
  width: 60px;
  text-align: center;
  cursor: pointer;
  color: rgb(102, 102, 102);
}
.header-box .lang span.lang-item:hover {
  color: #fff;
}
.header-box .type span.type-item:hover {
  color: #fff;
}
.header-box .type {
  margin-bottom: 15px;
}
.header-box .name {
  display: flex;
}
.header-box .name div:nth-of-type(1) {
  width: 46px;
}

.header-box .name span {
  display: inline-block;
  width: 60px;
  text-align: center;
  color: rgb(102, 102, 102);
  height: 35px;
  cursor: pointer;
}
.header-box .name span:hover {
  color: #fff;
}
.header-box .active {
  color: #f40 !important;
}
.m {
  position: fixed;
  z-index: 99;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.8);
}
.next {
  text-align: center;
  color: rgb(126, 126, 126);
  cursor: pointer;
}
</style>