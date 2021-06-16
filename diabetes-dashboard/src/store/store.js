import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        toast: { message: '', color: '', btnColor: '', timeout: 5000 },
        filter: { show: false },
        user: {},
        supervising: {},
        data: [],
        date: {
            start: '',
            end: '',
        },
        filteredData: [],
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
        emotionReminderStatus: false,
    },
    getters: {
        getHealthSettings: state => state.healthSettings,
        getEmotionReminderStatus: state => state.emotionReminderStatus,
    },
    actions: {
        showMessage({ commit }, toast) {
            commit('SHOW_MESSAGE', toast);
        },
        showFilter({ commit }, filter) {
            commit('SHOW_FILTER', filter);
        },
        setEmotionReminderStatus({ commit }, newStatus) {
            commit('SET_REMINDER_STATUS', newStatus);
        },
        setData({ commit }, data) {
            commit('UPDATE_DATA', data);
        },
        setDate({ commit }, data) {
            commit('SET_DATE', data);
        },
        setFilteredData({ commit }, data) {
            commit('UPDATE_FILTERED_DATA', data);
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
        },
        UPDATE_FILTERED_DATA(state, data) {
            state.filteredData = data;
        },
        SET_DATE(state, data) {
            state.date = data;
        },
        SET_REMINDER_STATUS: (state, newEmotionReminderStatus) => {
            state.emotionReminderStatus = newEmotionReminderStatus;
        },
        LOGOUT(state) {
            state.data = [];
            state.user = {};
            state.supervising = {};
        },
        SET_USER(state,user) {
            state.user = user;
        },
        SUPERVISING(state, data) {
            state.supervising = data;
        }
    },
});

export default store;