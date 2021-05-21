import App from './App.vue';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import router from './router/router.js';
import store from './store/store.js';
import VCalendar from 'v-calendar';
import Toasted from 'vue-toasted';

import '@mdi/font/css/materialdesignicons.css';
import 'chartjs-adapter-moment';
Vue.config.productionTip = false;

Vue.use(VCalendar, { componentPrefix: 'vc' });
Vue.use(Toasted, {theme: 'bubble', position: 'top-center', duration: '2000'});

new Vue({
    store,
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app');