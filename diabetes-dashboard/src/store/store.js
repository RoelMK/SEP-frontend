import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        toast: { message: '', color: '', btnColor: '', timeout: 5000 },
        filter: { show: false },
        user: {},
        supervising: {},
        arousalIcon: null,
        valenceIcon: null,
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
        // time frame of selected table item
        newTimeFrame: null,
        emotionToValue: {
            valence: {
                'fas fa-angry': 1,
                'fas fa-smile-beam': 2,
                'fas fas fa-laugh-beam': 3
            },
            arousal: {
                'fas fa-tired': 1,
                'fas fa-smile-beam': 2,
                'fas fa-grin-stars': 3
            },
        },
        valueToEmotion: {
            valence: {
                1: 'fas fa-angry',
                2: 'fas fa-smile-beam',
                3: 'fas fa-laugh-beam',
            },
            arousal: {
                1: 'fas fa-tired',
                2: 'fas fa-smile-beam',
                3: 'fas fa-grin-stars',
            },
        }
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
        },
        // set newTimeFrame to the time frame of the latest selected table entry
        setNewTimeFrame({ commit }, timeFrame) {
            commit('UPDATE_TIME_FRAME', timeFrame);
        },
        setEmotion({ commit }, data) {
            commit('UPDATE_EMOTION_STATUS', data);
        }
    },

    mutations: {
        SHOW_MESSAGE(state, toast) {
            state.toast.message = toast.message;
            state.toast.color = toast.color;
            state.toast.btnColor = toast.btnColor;
        },
        FILTER(state, lessThan) {
            console.log(state.data);
            const clone = Object.create(state.data);
            state.filteredData.insulin = clone.insulin.filter(
                function(value) {
                    return value.insulinAmount <= lessThan;
                }
            ).map(function(x) {
                return x;
            });
        },
        SHOW_FILTER(state, filter) {
            state.filter.show = filter.show;
        },
        UPDATE_EMOTION_STATUS(state, data) {
            if (data.type === 'arousal')
                state.arousalIcon = data.icon;
            else
                state.valenceIcon = data.icon;
        },
        UPDATE_DATA(state, data) {
            state.filteredData = data;
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
        SET_USER(state, user) {
            state.user = user;
        },
        // change newTimeFrame
        UPDATE_TIME_FRAME(state, timeFrame) {
            state.newTimeFrame = timeFrame;
        },
        SUPERVISING(state, data) {
            state.supervising = data;
        },
        // add an emotion to the local data
        ADD_EMOTION(state, data) {
            state.data.mood.unshift(data);
        },
        // delete an emotion from the local data
        DELETE_EMOTION(state, id) {
            state.data.mood = state.data.mood
                .filter(emotion => emotion.activityId !== id);
        },
        // update an emotion from the local data
        UPDATE_EMOTION(state, data) {
            state.data.mood.splice(
                state.data.mood.findIndex(emotion =>
                    emotion.activityId === data.activityId), 1, data);
        },
        // add an insulin input to the local data
        ADD_INSULIN(state, data) {
            state.data.insulin.unshift(data);
        },
        // delete an insulin input from the local data
        DELETE_INSULIN(state, id) {
            state.data.insulin = state.data.insulin
                .filter(insulinInput => insulinInput.activityId !== id);
        },
        // update an insulin input from the local data
        UPDATE_INSULIN(state, data) {
            state.data.insulin.splice(
                state.data.insulin.findIndex(insulinInput =>
                    insulinInput.activityId === data.activityId), 1, data);
        },
    },
});

export default store;