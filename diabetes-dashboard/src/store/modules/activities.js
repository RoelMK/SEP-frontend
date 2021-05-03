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
    async addActivity({ commit }, {id, title, userId}) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/albums',
            { userId, id, title, completed: false });

        commit('newActivity', response.data)
    },
    async deleteActivity({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);

        commit('removeActivity', id)
    },
    async updateActivity({ commit }, {originalId, userId, id, title}) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/albums/${originalId}`,
            { userId, id, title, completed: false });
        const data = response.data;

        commit('updateActivity', {originalId: originalId, updatedActivity: data})
    },
};

const mutations = {
    setActivities: (state, newActivities) => (state.activities = newActivities),
    newActivity: (state, newActivitiy) => state.activities.unshift(newActivitiy),
    removeActivity: (state, id) => state.activities = state.activities.filter(activity => activity.id !== id),
    updateActivity: (state, { originalId, updatedActivity }) => {         
        const index = state.activities.findIndex(activity => activity.id === originalId);
        if (index !== -1) {
            state.activities.splice(index, 1, updatedActivity);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};