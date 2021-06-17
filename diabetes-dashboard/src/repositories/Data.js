import Client from './Client.js';
const resource = '/';

export default {
    async fetch(payload, token) {
        let url = `${resource}data`;
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                'dataTypes': 'glucose,food,insulin,mood,exercise',
                'union': true,
                ...payload
            }
        };
        return Client.get(url, config);
    },
};
