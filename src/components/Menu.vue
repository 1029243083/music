<template>
  <div class="menu-wrapper">
    <ul>
      <li>
        <router-link to="/recommend">个性推荐</router-link>
      </li>
      <li>
        <router-link to="/songsheet">歌单</router-link>
      </li>
      <li>
        <router-link to="/singer">歌手</router-link>
      </li>
      <li>
        <router-link to="/rankinglist">排行榜</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.menu-wrapper {
  box-sizing: border-box;
  padding: 10px;
  border-right: 1px solid rgb(68, 68, 68);
  width: 100%;
  height: 100%;
  background-color: rgb(43, 43, 43);
}
.menu-wrapper ul {
  width: 100%;
  height: 100%;
  padding: 0;
  list-style: none;
}
.menu-wrapper ul li {
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  height: 35px;
  line-height: 35px;
}
.menu-wrapper ul li a {
  display: block;
  color: rgb(140, 140, 140);
  font-size: 16px;
  font-weight: 700;
}
.menu-wrapper ul li a.router-link-active {
  background-color: rgb(51, 51, 51);
  color: rgb(213, 213, 213);
  font-weight: bold;
}
</style>