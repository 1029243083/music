<template>
  <div class="login-wrapper">
    <div class="box">
      <div class="box-info">
        <span>用户名:</span>
        <div class="inp-wrapper">
          <Input v-model:value="loginId" placeholder="输入手机号" />
        </div>
      </div>

      <div class="box-info">
        <span>密码:</span>
        <div class="inp-wrapper">
          <Input
            v-model:value="loginPwd"
            placeholder="输入密码"
            type="password"
          />
        </div>
      </div>

      <Button type="primary" ghost class="loginBtn" @click="login"
        >Login</Button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { message, Input, Button } from "ant-design-vue";
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Input,
    Button,
  },
  setup() {
    const loginId: Ref<string> = ref("");
    const loginPwd: Ref<string> = ref("");
    const store = useStore();
    const router = useRouter();
    const login = () => {
      if (!loginId.value || !loginPwd.value) {
        message.error("请填写账号密码");
        return;
      }
      store
        .dispatch("loginAction", {
          phone: loginId.value,
          password: loginPwd.value,
        })
        .then((res) => {
          if (res) {
            message.success("登录成功");
            router.push("/");
          } else {
            message.error("登录失败");
          }
        });
    };
    return {
      loginId,
      loginPwd,
      login,
    };
  },
});
</script>

<style scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  color: #fff;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  overflow: hidden;
}
.box {
  width: 1000px;
  height: 500px;
  box-sizing: border-box;
  padding: 15px;
  margin: 100px auto;
}
.box-info {
  display: flex;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 20px;
  align-items: center;
}
.box-info span {
  display: inline-block;
  width: 50px;
  text-align: right;
}
.inp-wrapper {
  flex: 1;
  margin-left: 15px;
}
.inp-wrapper input {
  background-color: transparent;
  outline: none;
}
.loginBtn {
  display: block;
  margin: 0 auto;
}
</style>