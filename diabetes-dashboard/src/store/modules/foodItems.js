const state = {
    foodItems: [
        // {
        //     foodItemName: "Pasta",
        //     userId: 1,
        //     date: moment("20210429T000000+0200").format('L'),
        //     time: "16:00",
        //     calories: 600,
        //     carbs: 60,
        // },
    ]
};

const getters = {
    allFoodItems: state => state.foodItems
};

const actions = {
};

const mutations = {
    setFoodItems: (state, newFoodItems) => (state.foodItems = newFoodItems),
    newFoodItem: (state, newFoodItem) => state.foodItems.unshift(newFoodItem),
};

export default {
    state,
    getters,
    actions,
    mutations
};