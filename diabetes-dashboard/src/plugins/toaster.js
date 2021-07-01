/**
 * Create a new toaster plugin that will use Vuetify snackbar component
 * functionality and register it globally within application.
 * Toaster has 4 properties: message, color, btnColor and timeout
 */
export default {
    install(Vue, { store }) {
        if (!store)
            throw new Error('Vuex store is requried');
        Vue.prototype.$toaster = {
            showMessage({ message, color, btnColor, timeout }) {
                store.commit(
                    'SHOW_MESSAGE',
                    { message, color, btnColor, timeout },
                    { root: true }
                );
            }
        };
    }
};