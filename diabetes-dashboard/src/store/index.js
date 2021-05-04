import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

// Load Vuex
Vue.use(Vuex);

// Create store
const store = new Vuex.Store({
    state: {
        activities: [
            // {
            //     activityType: "Run",
            //     userId: 1,
            //     date: moment("20210429T000000+0200").format('L'),
            //     startTime: "16:00",
            //     endTime: "17:00",
            //     burntCalories: 159,
            // },
        ],
        emotions: [
            // {
            //     emotionType: "Happy", // or encoded as number, e.g. 1
            //     userId: 1,
            //     date: moment("20210429T000000+0200").format('L'),
            //     time: "16:00",
            // },
        ],
        foodItems: [
            // {
            //     foodItemName: "Pasta",
            //     userId: 1,
            //     date: moment("20210429T000000+0200").format('L'),
            //     time: "16:00",
            //     calories: 600,
            //     carbs: 60,
            // },
        ],
        glucoseData: [
            // {
            //     value: 6.0
            //     userId: 1,
            //     date: moment("20210429T000000+0200").format('L'),
            //     startTime: "16:00",
            //     endTime: "16:05",
            //     // or just time
            //     time: "16:00",
            // },
        ],
        users: [
            // {
            //     userId: 1,
            //     age: 20,
            //     weight: 75,
            //     height: 180,
            //     email: fake@gmail.com,
            // },
        ],
    },
    
    getters: {
        allActivities: state => state.activities,
        allEmotions: state => state.emotions,
        allFoodItems: state => state.foodItems,
        allGlucoseData: state => state.glucoseData,
        allUsers: state => state.users,
    },
    
    actions: {
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
    },
    
    mutations: {
        setActivities: (state, newActivities) => state.activities = newActivities,
        resetActivities: state => Object.assign(state.activities, []),
        newActivity: (state, newActivitiy) => state.activities.unshift(newActivitiy),
        removeActivity: (state, id) => state.activities = state.activities.filter(activity => activity.id !== id),
        updateActivity: (state, { originalId, updatedActivity }) => {         
            const index = state.activities.findIndex(activity => activity.id === originalId);
            if (index !== -1) {
                state.activities.splice(index, 1, updatedActivity);
            }
        },

        setEmotions: (state, newEmotions) => state.emotions = newEmotions,
        resetEmotions: state => Object.assign(state.emotions, []),
        newEmotion: (state, newEmotion) => state.emotions.unshift(newEmotion),
        removeEmotion: (state, id) => state.emotions = state.emotions.filter(emotion => emotion.id !== id),
        updateEmotion: (state, { originalId, updatedEmotion }) => {         
            const index = state.emotions.findIndex(emotion => emotion.id === originalId);
            if (index !== -1) {
                state.emotions.splice(index, 1, updatedEmotion);
            }
        },

        setFoodItems: (state, newFoodItems) => state.foodItems = newFoodItems,
        resetFoodItems: state => Object.assign(state.foodItems, []),
        newFoodItem: (state, newFoodItem) => state.foodItems.unshift(newFoodItem),
        removeFoodItem: (state, id) => state.foodItems = state.foodItems.filter(foodItem => foodItem.id !== id),
        updateFoodItem: (state, { originalId, updatedFoodItem }) => {         
            const index = state.foodItems.findIndex(foodItem => foodItem.id === originalId);
            if (index !== -1) {
                state.foodItems.splice(index, 1, updatedFoodItem);
            }
        },

        setGlucoseData: (state, newGlucoseData) => state.glucoseData = newGlucoseData,
        resetGlucoseData: state => Object.assign(state.glucoseData, []),
        newGlucoseValue: (state, newGlucoseValue) => state.glucoseData.unshift(newGlucoseValue),
        removeGlucoseValue: (state, id) => state.glucoseData = state.glucoseData.filter(glucoseValue => glucoseValue.id !== id),
        updateGlucoseValue: (state, { originalId, updatedGlucoseValue }) => {         
            const index = state.glucoseData.findIndex(glucoseValue => glucoseValue.id === originalId);
            if (index !== -1) {
                state.glucoseData.splice(index, 1, updatedGlucoseValue);
            }
        },

        setUsers: (state, newUsers) => state.users = newUsers,
        resetUsers: state => Object.assign(state.users, []),
        newUser: (state, newUser) => state.users.unshift(newUser),
        removeUser: (state, id) => state.users = state.users.filter(user => user.id !== id),
        updateUser: (state, { originalId, updatedUser }) => {         
            const index = state.users.findIndex(user => user.id === originalId);
            if (index !== -1) {
                state.users.splice(index, 1, updatedUser);
            }
        },
    },
});

export default store;