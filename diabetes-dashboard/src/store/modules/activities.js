import axios from 'axios';

const state = {
    activities: [
        {
            activity: "Run",
            date: new Date("04-28-2021").toLocaleDateString(),
            duration: "2 hours",
            calories: 159
        },
        {
            activity: "Yoga",
            date: new Date("04-05-2021").toLocaleDateString(),
            duration: "30 minutes",
            calories: 100,
        },
        {
            activity: "Chess",
            date: new Date("04-01-2021").toLocaleDateString(),
            duration: "1.5 hour",
            calories: null,
        },
        {
            activity: "Health check",
            date: new Date("03-24-2021").toLocaleDateString(),
            duration: null,
            calories: null,
        },
        {
            activity: "Ice hokey",
            date: new Date("03-16-2021").toLocaleDateString(),
            duration: "2.5 hours",
            calories: 349,
        },
    ]
};

const getters = {
    allActivities: state => state.activities
};

const actions = {
    async fetchActivities({ commit }) {
        const response = await axios.get('');

        console.log(response.data);
    }
};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
};