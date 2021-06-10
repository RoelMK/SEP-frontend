import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function auth(to, from, next) {
    let jwt = Vue.$cookies.get("JWT");
    if (jwt) {
        return next();
    }
    return next("/login");
}

const routes = [
    {
        path: '/',
        component: () => import('@/views/Dashboard.vue'),
        name: "dashboard",
        beforeEnter: (to, from, next) => {
            auth(to, from, next);
        }
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue'),
        name: "login"
    },
    {
        path: '/profile',
        component: () => import('@/views/UserProfile.vue'),
        name: "profile",
        beforeEnter: (to, from, next) => {
            auth(to, from, next);
        }
    },
    {
        path: '/emotions',
        component: () => import('@/views/Emotions.vue'),
        name: "emotions",
        beforeEnter: (to, from, next) => {
            auth(to, from, next);
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

export default router;
