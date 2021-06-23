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
                ...payload
            }
        };
        return Client.get(url, config);
    },
    deleteItem(payload, token) {
        let url = `${resource}activities/delete`;
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        let data = payload;
        return Client.post(url, data, config);
    },
    postEmotion(payload, token) {
        let url = `${resource}mood`;
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        let data = payload;
        return Client.post(url, data, config);
    },
    postInsulin(payload, token) {
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
