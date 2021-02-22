import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/home/recommend' },
    { path: "/login", component: import('../views/Login.vue') },
    {
        path: '/home', component: import('../views/Home.vue'), redirect: '/home/recommend',
        children: [
            { path: 'songsheet', component: import('../components/SongSheet.vue') },
            { path: 'songlistdetails', component: import('../components/SongListDetails.vue') },
            { path: 'singer', component: import('../components/Singer/index.vue') },
            { path: 'singerandsong', component: import('../components/Singer/SingerAndSong.vue') },
            { path: 'rankinglist', component: import('../components/RankingList/index.vue') },
            { path: 'recommend', component: import('../components/recommend/index.vue') }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;