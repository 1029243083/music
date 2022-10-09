import * as VueRouter from 'vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/fxyy'
	},
	{
		path: '/fxyy',
		redirect: '/fxyy/gxtj',
		component: () => import('../page/p-fxyy.vue'),
		meta: {
			title: '发现音乐'
		},
		children: [
			{
				path: 'gxtj',
				component: () => import('../page/fxyy/p-gxtj.vue'),
				meta: {
					title: '个性推荐'
				}
			},
			{
				path: 'zsdz',
				component: () => import('../page/fxyy/p-zsdz.vue'),
				meta: {
					title: '专属定制'
				}
			},
			{
				path: 'gd',
				component: () => import('../page/fxyy/p-gd.vue'),
				meta: {
					title: '歌单'
				}
			},
			{
				path: 'phb',
				component: () => import('../page/fxyy/p-phb.vue'),
				meta: {
					title: '排行榜'
				}
			},
			{
				path: 'gs',
				component: () => import('../page/fxyy/p-gs.vue'),
				meta: {
					title: '歌手'
				}
			},
			{
				path: 'zxyy',
				component: () => import('../page/fxyy/p-zxyy.vue'),
				meta: {
					title: '最新音乐'
				}
			}
		]
	},

	{
		path: '/sp',
		component: () => import('../page/p-sp.vue'),
		meta: {
			title: '视频'
		}
	},
	{
		path: '/gz',
		component: () => import('../page/p-gz.vue'),
		meta: {
			title: '关注'
		}
	},
	{
		path: '/fm',
		component: () => import('../page/p-fm.vue'),
		meta: {
			title: '私人FM'
		}
	},
	{
		path: '/gddetail',
		component: () => import('../page/p-gddetail.vue'),
		meta: {
			title: '歌单详情',
			noHhow: true
		}
	},
	{
		path: '/searchdetail',
		component: () => import('../page/p-searchDetail.vue')
	}
];

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes: routes as RouteRecordRaw[]
});

export default router;
