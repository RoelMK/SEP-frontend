import Vuex from 'vuex';
import Vue from 'vue';
import users from './modules/users'
import glucoseData from './modules/glucoseData'
import activities from './modules/activities'
import foodItems from './modules/foodItems'
import emotions from './modules/emotions'

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        users,
        glucoseData,
        activities,
        foodItems,
        emotions
    }
});