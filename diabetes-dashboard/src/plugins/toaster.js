export default {
    install(Vue, { store }) {
        if (!store)
            throw new Error('Vuex store is requried');
        Vue.prototype.$toaster = {
            showMessage({ message, color, btnColor, timeout }) {
                store.dispatch(
                    'showMessage',
                    { message, color, btnColor, timeout },
                    { root: true }
                );
            }
        };
    }
};