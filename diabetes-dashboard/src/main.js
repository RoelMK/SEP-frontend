import App from './App.vue';
import Vue from 'vue' ;
import vuetify from '@/plugins/vuetify';
import store from './store'

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
Vue.config.productionTip = false;

new Vue({
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')