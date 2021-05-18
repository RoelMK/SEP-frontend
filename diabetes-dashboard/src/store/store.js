import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import { AxiosWrapper } from '@/helpers/wrapper.js'

/* Create a new instance of AxiosWrapper with required headers */
const wrapper = new AxiosWrapper()

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
        insulinData: [
            // {
            //     value: 6.0
            //     type: 'fasting'
            //     userId: 1,
            //     date: moment("20210429T000000+0200").format('L'),
            //     time: "16:00",
            // },
        ],
        users: [
            // {
            //     userId: 1,
            //     name: 'Peter',
            //     age: 20,
            //     weight: 75,
            //     height: 180,
            //     email: fake@gmail.com,
            // },
        ],
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
            hypoThreshold: 4.0,
            hyperThreshold: 10.0,
            fastingRangeMin: 4.4,
            fastingRangeMax: 7.2,
            ppRangeThreshold: 10.0,
            goalA1C: 7,
          },
    },
    
    getters: {
        getActivities: state => state.activities,
        getEmotions: state => state.emotions,
        getFoodItems: state => state.foodItems,
        getGlucoseData: state => state.glucoseData,
        getInsulinData: state => state.insulinData,
        getUsers: state => state.users,
        getHealthSettings: state => state.healthSettings,
    },
    
    actions: {
        async fetchInsulinData({ commit }) {
            const response = await wrapper.get('https://jsonplaceholder.typicode.com/albums', dataPromise => dataPromise);

            commit('SET_INSULIN_DATA', response)
        },
        async addInsulinInput({ commit }, {id, title, userId}) {
            const response = await wrapper.post('https://jsonplaceholder.typicode.com/albums',
                { userId, id, title, completed: false }, dataPromise => dataPromise);
    
            commit('ADD_INSULIN_VALUE', response)
        },
        async deleteInsulinInput({ commit }, id) {
            await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
            commit('REMOVE_INSULIN_VALUE', id)
        },
        async updateInsulinInput({ commit }, {originalId, userId, id, title}) {
            const response = await wrapper.put(`https://jsonplaceholder.typicode.com/albums/${originalId}`,
                { userId, id, title, completed: false }, dataPromise => dataPromise);

            commit('UPDATE_INSULIN_VALUE', {originalId: originalId, updatedInsulinValue: response})
        },
    },
    
    mutations: {
        SET_ACTIVITIES: (state, newActivities) => state.activities = newActivities,
        RESET_ACTIVITIES: state => Object.assign(state.activities, []),
        ADD_ACTIVITY: (state, newActivitiy) => state.activities.unshift(newActivitiy),
        REMOVE_ACTIVITY: (state, id) => state.activities = state.activities.filter(activity => activity.id !== id),
        UPDATE_ACTIVITY: (state, { originalId, updatedActivity }) => {         
            state.activities.splice(state.activities.findIndex(activity => activity.id === originalId), 1, updatedActivity)
        },

        SET_EMOTIONS: (state, newEmotions) => state.emotions = newEmotions,
        RESET_EMOTIONS: state => Object.assign(state.emotions, []),
        ADD_EMOTION: (state, newEmotion) => state.emotions.unshift(newEmotion),
        REMOVE_EMOTION: (state, id) => state.emotions = state.emotions.filter(emotion => emotion.id !== id),
        UPDATE_EMOTION: (state, { originalId, updatedEmotion }) => {
            state.emotions.splice(state.emotions.findIndex(emotion => emotion.id === originalId), 1, updatedEmotion)
        },

        SET_FOOD_ITEMS: (state, newFoodItems) => state.foodItems = newFoodItems,
        RESET_FOOD_ITEMS: state => Object.assign(state.foodItems, []),
        ADD_FOOD_ITEM: (state, newFoodItem) => state.foodItems.unshift(newFoodItem),
        REMOVE_FOOD_ITEM: (state, id) => state.foodItems = state.foodItems.filter(foodItem => foodItem.id !== id),
        UPDATE_FOOD_ITEM: (state, { originalId, updatedFoodItem }) => {
            state.foodItems.splice(state.foodItems.findIndex(foodItem => foodItem.id === originalId), 1, updatedFoodItem)
        },

        SET_GLUCOSE_DATA: (state, newGlucoseData) => state.glucoseData = newGlucoseData,
        RESET_GLUCOSE_DATA: state => Object.assign(state.glucoseData, []),
        ADD_GLUCOSE_VALUE: (state, newGlucoseValue) => state.glucoseData.unshift(newGlucoseValue),
        REMOVE_GLUCOSE_VALUE: (state, id) => state.glucoseData = state.glucoseData.filter(glucoseValue => glucoseValue.id !== id),
        UPDATE_GLUCOSE_VALUE: (state, { originalId, updatedGlucoseValue }) => {
            state.glucoseData.splice(state.glucoseData.findIndex(glucoseValue => glucoseValue.id === originalId), 1, updatedGlucoseValue)
        },

        SET_INSULIN_DATA: (state, newInsulinData) => state.insulinData = newInsulinData,
        RESET_INSULIN_DATA: state => Object.assign(state.insulinData, []),
        ADD_INSULIN_VALUE: (state, newInsulinValue) => state.insulinData.unshift(newInsulinValue),
        REMOVE_INSULIN_VALUE: (state, id) => state.insulinData = state.insulinData.filter(insulinValue => insulinValue.id !== id),
        UPDATE_INSULIN_VALUE: (state, { originalId, updatedInsulinValue }) => {
            state.insulinData.splice(state.insulinData.findIndex(insulinValue => insulinValue.id === originalId), 1, updatedInsulinValue)
        },

        SET_USERS: (state, newUsers) => state.users = newUsers,
        RESET_USERS: state => Object.assign(state.users, []),
        ADD_USER: (state, newUser) => state.users.unshift(newUser),
        REMOVE_USER: (state, id) => state.users = state.users.filter(user => user.id !== id),
        UPDATE_USER: (state, { originalId, updatedUser }) => {         
            state.users.splice(state.users.findIndex(user => user.id === originalId), 1, updatedUser)
        },

        SET_HEALTH_SETTINGS: (state, newHealthSettings) => state.healthSettings = newHealthSettings,
    },
});

export default store;