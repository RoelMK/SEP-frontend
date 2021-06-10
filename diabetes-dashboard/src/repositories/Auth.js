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
};