const state = {
    emotions: [
        // {
        //     emotionType: "Happy", // or encoded as number, e.g. 1
        //     userId: 1,
        //     date: moment("20210429T000000+0200").format('L'),
        //     time: "16:00",
        // },
    ]
};

const getters = {
    allEmotions: state => state.emotions
};

const actions = {
};

const mutations = {
    setEmotions: (state, newEmotions) => (state.emotions = newEmotions),
    newEmotion: (state, newEmotion) => state.emotions.unshift(newEmotion),
};

export default {
    state,
    getters,
    actions,
    mutations
};