import App from './App.vue';
import Vue from 'vue' ;
import vuetify from '@/plugins/vuetify';

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
Vue.config.productionTip = false;

new Vue({
    vuetify,
    render: h => h(App)
  }).$mount('#app')