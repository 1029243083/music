import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Store from './Store';
import './index.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);

app.use(Antd).use(router).use(Store).mount('#app');
