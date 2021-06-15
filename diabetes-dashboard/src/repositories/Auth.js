import Client from './Client.js';
const resource = '/';

export default {
    login(payload) {
        let url = `${resource}login`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.get(url, config);
    },
    uploadToken(payload) {
        let url = `${resource}supervisor/logToken`;
        let headers = {};
        return Client.post(url, payload, headers);
    }
};