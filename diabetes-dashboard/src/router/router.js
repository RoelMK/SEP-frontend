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
        },
        meta: { showNavbar: true }
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue'),
        name: "login",
        meta: { showNavbar: false }
    },
    {
        path: '/profile:homeAccountId?:accessToken?:expiresOn?',
        component: () => import('@/views/UserProfile.vue'),
        name: "profile",
        beforeEnter: (to, from, next) => {
            auth(to, from, next);
        },
        meta: { showNavbar: true }
    },
    {
        path: '/history',
        component: () => import('@/views/History.vue'),
        name: "history",
        beforeEnter: (to, from, next) => {
            auth(to, from, next);
        },
        meta: { showNavbar: true }
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

export default router;
