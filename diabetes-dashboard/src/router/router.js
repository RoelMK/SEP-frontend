import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('@/views/Dashboard.vue'),
        name: "dashboard"
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue'),
        name: "login"
    },
    {
        path: '/profile',
        component: () => import('@/views/UserProfile.vue'),
        name: "profile"
    },
    {
        path: '/emotions',
        component: () => import('@/views/Emotions.vue'),
        name: "emotions"
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

export default router;
