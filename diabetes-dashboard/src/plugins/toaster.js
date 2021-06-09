export default {
    install(Vue, { store }) {
        if (!store)
            throw new Error('Vuex store is requried');
        Vue.prototype.$toaster = {
            showMessage({ message, color, btnColor }) {
                store.dispatch(
                    'showMessage',
                    { message, color, btnColor },
                    { root: true }
                );
            }
        };
    }
};