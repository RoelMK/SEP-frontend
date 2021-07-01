import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * Check whether user is authenticated if not redirect to the login view
 * @param { any } to Object containing information about next route
 * @param { any } from Object containing information about current route
 * @param { function } next Function that handles transition between routes
 * @returns
 */
function auth(to, from, next) {
    let jwt = Vue.$cookies.get("JWT");
    if (jwt) {
        return next();
    }
    return next("/login");
}

// Map routes in the application to the corresponding view
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

// Router settings
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

export default router;
