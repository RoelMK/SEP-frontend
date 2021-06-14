import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        toast: { message: '', color: '', btnColor: '', timeout: 5000 },
        filter: { show: false },
        emotions: [
            {
                happiness: 2,
                excitement: 2,
                date: '07/30/2021',
                time: '16:00',
                id: 0
            },
            {
                happiness: 3,
                excitement: 3,
                date: '07/07/2011',
                time: '18:00',
                id: 1
            },
            {
                happiness: 1,
                excitement: 1,
                date: '07/07/2017',
                time: '16:00',
                id: 2
            },
            {
                happiness: 1,
                excitement: 2,
                date: '07/07/2018',
                time: '18:00',
                id: 3
            },
            {
                happiness: 1,
                excitement: 3,
                date: '08/22/2020',
                time: '18:00',
                id: 4
            },
            {
                happiness: 2,
                excitement: 1,
                date: '06/12/2019',
                time: '16:00',
                id: 5
            },
            {
                happiness: 1,
                excitement: 1,
                date: '07/07/2014',
                time: '18:00',
                id: 6
            },
            {
                happiness: 1,
                excitement: 2,
                date: '07/07/2015',
                time: '18:00',
                id: 7
            },
            {
                happiness: 2,
                excitement: 1,
                date: '07/07/2019',
                time: '16:00',
                id: 8
            },
            {
                happiness: 2,
                excitement: 1,
                date: '06/07/2020',
                time: '18:00',
                id: 9
            },
            {
                happiness: 2,
                excitement: 2,
                date: '06/06/2020',
                time: '18:00',
                id: 10
            },
        ],
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
        SET_REMINDER_STATUS: (state, newEmotionReminderStatus) => {
            state.emotionReminderStatus = newEmotionReminderStatus;
        },
    },
});

export default store;