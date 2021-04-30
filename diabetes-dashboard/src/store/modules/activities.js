import axios from 'axios';

const state = {
    activities: [
        // {
        //     activityType: "Run",
        //     userId: 1,
        //     date: moment("20210429T000000+0200").format('L'),
        //     startTime: "16:00",
        //     endTime: "17:00",
        //     burntCalories: 159,
        // },
    ]
};

const getters = {
    allActivities: state => state.activities
};

const actions = {
    async fetchActivities({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        commit('setActivities', response.data)
    },
    async addActivity({ commit }, activity, date, duration) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/albums',
            { activity, date, duration, completed: false });

        commit('newActivity', response.data)
    },
    async deleteActivity({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);

        commit('removeActivity', id)
    },
    async updateActivity({ commit }, id, activity, date, duration) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`,
            { activity, date, duration, completed: false });

        commit('updateActivity', id, response.data)
    },
};

const mutations = {
    setActivities: (state, newActivities) => (state.activities = newActivities),
    newActivity: (state, newActivitiy) => state.activities.unshift(newActivitiy),
    removeActivity: (state, id) => state.activities = state.activities.filter(activity => activity.id !== id),
    updateActivity: (state, id, updatedActivity) => {
        const index = state.activities.findIndex(activity => activity.id === id);
        if (index !== -1) {
            state.activities.splice(index, 1, updatedActivity);
        } else {
            state.activities.splice(index, 0, updatedActivity);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};