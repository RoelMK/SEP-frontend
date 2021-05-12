import App from './App.vue';
import Vue from 'vue' ;
import vuetify from '@/plugins/vuetify';
import router from './router/router.js';
import VCalendar from 'v-calendar';

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
Vue.config.productionTip = false;

Vue.use(VCalendar, { componentPrefix: 'vc' });

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')