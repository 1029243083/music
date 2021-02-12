import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    { path: "/login", component: import('../views/Login.vue') },
    {
        path: '/home', component: import('../views/Home.vue'), children: [
            { path: 'songsheet', component: import('../components/SongSheet.vue') },
            { path: 'songlistdetails', component: import('../components/SongListDetails.vue') },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;