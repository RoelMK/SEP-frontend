import Client from './Client.js';
const resource = '/upload';

export default {
    upload(payload) {
        let url = `${resource}`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.post(url, config);
    },
};