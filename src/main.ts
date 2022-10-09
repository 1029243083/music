import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './reset.css';
import App from './App.vue';
import router from './router/index';
import './assets/font/iconfont.css';
import './index.css';
import './assets/font/iconfont.js';
(function (doc, win, designWidth) {
	let html = doc.documentElement;
	function refreshRem() {
		let clientWidth = html.clientWidth;
		if (clientWidth >= designWidth) {
			html.style.fontSize = '100px';
		} else {
			html.style.fontSize = 100 * (clientWidth / designWidth) + 'px';
		}
	}
	doc.addEventListener('DOMContentLoaded', refreshRem);
})(document, window, 1920);
createApp(App).use(createPinia()).use(router).mount('#app');
