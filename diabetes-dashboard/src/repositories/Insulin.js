import Client from './Client.js';
const resource = '/';

export default {
    post(payload, token) {
        let url = `${resource}insulin`;
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        let data = payload;
        return Client.post(url, data, config);
    },
};