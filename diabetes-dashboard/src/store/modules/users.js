const state = {
    users: [
        // {
        //     userId: 1,
        //     age: 20,
        //     weight: 75,
        //     height: 180,
        //     email: fake@gmail.com,
        // },
    ]
};

const getters = {
    allUsers: state => state.users
};

const actions = {
};

const mutations = {
    setUsers: (state, newUsers) => (state.users = newUsers),
    newActivity: (state, newUser) => state.users.unshift(newUser),
};

export default {
    state,
    getters,
    actions,
    mutations
};