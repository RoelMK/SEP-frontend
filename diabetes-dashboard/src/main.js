// Import varios modules
import App from './App.vue';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import router from './router/router.js';
import store from './store/store.js';
import VCalendar from 'v-calendar';
import snackbarPlugin from './plugins/toaster.js';
import ECharts from 'vue-echarts';
import { use } from 'echarts/core';
import VueCompositionAPI from '@vue/composition-api';
import VueCookies from 'vue-cookies';

import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
// In order to prevent importing entire eCharts library we only import
// necessary for our application modules
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, ScatterChart, BarChart, CustomChart } from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TimelineComponent,
    VisualMapComponent,
    DataZoomComponent,
    ToolboxComponent,
} from 'echarts/components';
// Import i18n to enable different localizations
import i18n from './i18n';

import CountryFlag from 'vue-country-flag';

// Disable production tip
Vue.config.productionTip = false;

// Register libraries
use([
    CanvasRenderer,
    GridComponent,
    TooltipComponent,
    TimelineComponent,
    VisualMapComponent,
    DataZoomComponent,
    LegendComponent,
    ToolboxComponent,
    ScatterChart,
    LineChart,
    BarChart,
    CustomChart
]);

Vue.use(VueCookies);
Vue.use(VueCompositionAPI);
Vue.use(VCalendar, { componentPrefix: 'vc' });
Vue.use(snackbarPlugin, { store });

// Register external components
Vue.component('country-flag', CountryFlag);
Vue.component('v-chart', ECharts);

// Create entry point of the application
new Vue({
    store,
    vuetify,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');