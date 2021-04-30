const state = {
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
    ]
};

const getters = {
    allGlucoseData: state => state.glucoseData
};

const actions = {
};

const mutations = {
    setEmotions: (state, newGlucoseData) => (state.glucoseData = newGlucoseData),
    newEmotion: (state, newGlucoseValue) => state.glucoseData.unshift(newGlucoseValue),
};

export default {
    state,
    getters,
    actions,
    mutations
};