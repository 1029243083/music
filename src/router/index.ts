import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import Home from "../views/Home.vue";
import recommend from '../components/recommend/index.vue';
import songsheet from '../components/SongSheet.vue';
import singer from '../components/Singer/index.vue';
import rankinglist from '../components/RankingList/index.vue';
import songlistdetails from '../components/SongListDetails.vue';
import singerandsong from '../components/Singer/SingerAndSong.vue';


const routes: RouteRecordRaw[] = [
    { path: "/login", component: import('../views/Login.vue') },
    {
        path: '/', component: Home, children: [
            { path: '/recommend', component: recommend },
            { path: '/songsheet', component: songsheet },
            { path: '/singer', component: singer },
            { path: '/rankinglist', component: rankinglist },
            { path: '/songlistdetails', component: songlistdetails },
            { path: '/singerandsong', component: singerandsong },
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;