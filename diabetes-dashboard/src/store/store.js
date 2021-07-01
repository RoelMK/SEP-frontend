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
        setData({ commit }, data) {
            commit('UPDATE_DATA', data);
        },
    },

    mutations: {
        /**
         * Change state of the toaster message
         * @param { string } state vuex state
         * @param { any } toast options for creating a toaster
         */
        SHOW_MESSAGE(state, toast) {
            state.toast.message = toast.message;
            state.toast.color = toast.color;
            state.toast.btnColor = toast.btnColor;
        },
        /**
         * Change state of the filter pop up
         * @param { string } state vuex state
         * @param { any } filter filter pop up options
         */
        SHOW_FILTER(state, filter) {
            state.filter.show = filter.show;
        },
        /**
         * Update vuex state of the emotional status
         * @param { string } state vuex state
         * @param { any } data data object containing emotional status options
         */
        UPDATE_EMOTION_STATUS(state, data) {
            if (data.type === 'arousal')
                state.arousalIcon = data.icon;
            else
                state.valenceIcon = data.icon;
        },
        /**
         * Update vuex state of the data object
         * @param { string } state vuex state
         * @param { any } data data object that is fetched from backend
         */
        UPDATE_DATA(state, data) {
            state.filteredData = data;
            state.data = data;
        },
        /**
         * Update vuex state of the filteredData object
         * @param { string } state vuex state
         * @param { any } data data object containing filtered data values
         */
        UPDATE_FILTERED_DATA(state, data) {
            state.filteredData = data;
        },
        /**
         * Update date of the fetched data
         * @param { string } state vuex state
         * @param { any } data data containing start and end dates
         */
        SET_DATE(state, data) {
            state.date = data;
        },
        /**
         * Reset data, user and supervising states upon logout
         * @param { string } state vuex state
         */
        LOGOUT(state) {
            state.data = [];
            state.user = {};
            state.supervising = {};
        },
        /**
         * Set user
         * @param { string } state vuex state
         * @param { any } user user data
         */
        SET_USER(state, user) {
            state.user = user;
        },
        /**
         * Update newTimeFrame state which is used for creating a link between
         * data slider and statistics component
         * @param { string } state vuex state
         * @param { any } timeFrame selected time frame in data slider
         */
        UPDATE_TIME_FRAME(state, timeFrame) {
            state.newTimeFrame = timeFrame;
        },
        /**
         * Update data object of supervised user
         * @param { string } state vuex state
         * @param { any } data data object fetched from backend
         */
        SUPERVISING(state, data) {
            state.supervising = data;
        },
        /**
         * Add an emotion to the local data
         * @param { string } state vuex state
         * @param { any } data new mood data
         */
        ADD_EMOTION(state, data) {
            state.data.mood.unshift(data);
        },
        /**
         * Delete an emotion from the local data
         * @param { string } state vuex state
         * @param { any } data new mood data
         */
        DELETE_EMOTION(state, id) {
            state.data.mood = state.data.mood
                .filter(emotion => emotion.activityId !== id);
        },
        /**
         * Update an emotion from the local data
         * @param { string } state vuex state
         * @param { any } data new mood data
         */
        UPDATE_EMOTION(state, data) {
            state.data.mood.splice(
                state.data.mood.findIndex(emotion =>
                    emotion.activityId === data.activityId), 1, data);
        },
        /**
         * Add an insulin input to the local data
         * @param { string } state vuex state
         * @param { any } data new insulin data
         */
        ADD_INSULIN(state, data) {
            state.data.insulin.unshift(data);
        },
        /**
         * Delete an insulin input from the local data
         * @param { string } state vuex state
         * @param { any } data new insulin data
         */
        DELETE_INSULIN(state, id) {
            state.data.insulin = state.data.insulin
                .filter(insulinInput => insulinInput.activityId !== id);
        },
        /**
         * Update an insulin input from the local data
         * @param { string } state vuex state
         * @param { any } data new insulin data
         */
        UPDATE_INSULIN(state, data) {
            state.data.insulin.splice(
                state.data.insulin.findIndex(insulinInput =>
                    insulinInput.activityId === data.activityId), 1, data);
        },
    },
});

export default store;