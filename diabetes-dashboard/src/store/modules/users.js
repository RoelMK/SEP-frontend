const state = {
    users: []
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