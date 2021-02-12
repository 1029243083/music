<template>
  <div class="loading">
    <div class="box">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="text">加载中......</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loading {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.loading .box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 32px;
  animation: rotate 1s linear infinite;
}
.loading .box div {
  width: 10px;
  margin: 3px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(170, 170, 170);
}
.text {
  color: rgb(156, 156, 156);
  font-size: 16px;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>