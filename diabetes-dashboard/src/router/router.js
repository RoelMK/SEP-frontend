import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('@/views/Dashboard.vue'),
        props: { param: "optional" },
        name: "dashboard"
    },
    {
        path: '/test',
        component: () => import('@/views/Test.vue'),
        name: 'test'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

export default router;