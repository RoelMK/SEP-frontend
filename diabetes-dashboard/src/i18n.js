import Vue from 'vue';
import VueI18n from 'vue-i18n';

// Register VueI18n in Vue
Vue.use(VueI18n);

// Check special tags in vue files and apply locales
function loadLocaleMessages () {
    const locales = require.context('./locales',
        true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
}

// Setup default locale and indicate fallback locate in case default
// was not found
export default new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages()
});