import Vuex from 'vuex';
import Vue from 'vue';
import Data from '@/repositories/Data.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        toast: { message: '', color: '', btnColor: '' },
        filter: { show: false },
        data: [],
        healthSettings: {
            unit: "mmol/L",
            veryHighThreshold: 13.9,
            highRangeMin: 10.1,
            highRangeMax: 13.9,
            normalRangeMin: 3.9,
            normalRangeMax: 10.0,
            lowRangeMin: 3.0,
            lowRangeMax: 3.8,
            veryLowThreshold: 3.0,
            fastingRangeMin: 4.4,
            fastingRangeMax: 7.2,
            ppRangeThreshold: 10.0,
            goalA1C: 7,
        },
    },
    getters: {
        getHealthSettings: state => state.healthSettings,
    },
    actions: {
        showMessage({ commit }, toast) {
            commit('SHOW_MESSAGE', toast);
        },
        showFilter({ commit }, filter) {
            commit('SHOW_FILTER', filter);
        },
        async retrieveData({ commit }, options) {
            // Data.fetch(options.parameters, options.token)
            Data.testFetch().then(
                (res) =>  {
                    const data = res.data;
                    commit('UPDATE_DATA', data);
                },
                (err) => console.log(err)
            );
        },
        setData({ commit }, data) {
            commit('UPDATE_DATA', data);
        }
    },

    mutations: {
        SHOW_MESSAGE(state, toast) {
            state.toast.message = toast.message;
            state.toast.color = toast.color;
            state.toast.btnColor = toast.btnColor;
        },
        SHOW_FILTER(state, filter) {
            state.filter.show = filter.show;
        },
        UPDATE_DATA(state, data) {
            state.data = data;
        }
    },
});

export default store;