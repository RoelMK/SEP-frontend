import App from './App.vue';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import router from './router/router.js';
import store from './store/store.js';
import VCalendar from 'v-calendar';
import Toasted from 'vue-toasted';
import ECharts from 'vue-echarts';
import { use } from 'echarts/core';
import VueCompositionAPI from '@vue/composition-api';
import VueCookies from 'vue-cookies';

import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, ScatterChart, BarChart, CustomChart } from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TimelineComponent,
    VisualMapComponent,
    DataZoomComponent
} from 'echarts/components';
import i18n from './i18n';

Vue.config.productionTip = false;

use([
    CanvasRenderer,
    GridComponent,
    TooltipComponent,
    TimelineComponent,
    VisualMapComponent,
    DataZoomComponent,
    LegendComponent,
    ScatterChart,
    LineChart,
    BarChart,
    CustomChart
]);

Vue.use(VueCookies);
Vue.use(VueCompositionAPI);
Vue.use(VCalendar, { componentPrefix: 'vc' });
Vue.use(Toasted, {theme: 'bubble', position: 'top-center', duration: '2000'});

Vue.component('v-chart', ECharts);

new Vue({
    store,
    vuetify,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');