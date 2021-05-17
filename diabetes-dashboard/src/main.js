import App from './App.vue';
import Vue from 'vue' ;
import vuetify from '@/plugins/vuetify';
import router from './router/router.js';
import store from './store/store.js';
import VCalendar from 'v-calendar';
import VueApexCharts from "vue-apexcharts";

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
Vue.config.productionTip = false;

Vue.use(VCalendar, { componentPrefix: 'vc' });
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

new Vue({
    store,
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')