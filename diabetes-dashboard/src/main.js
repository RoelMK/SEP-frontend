import App from './App.vue';
import Vue from 'vue' ;
import vuetify from '@/plugins/vuetify';
import { routes } from './router/router.js';
import VueRouter from 'vue-router';

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
});


new Vue({
    vuetify,
    router,
    render: h => h(App)
  }).$mount('#app')