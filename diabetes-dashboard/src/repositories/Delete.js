import Client from './Client.js';
const resource = '/';

export default {
    // delete insulin/emotion
    post(payload, token) {
        // set endpoint location
        let url = `${resource}activities/delete`;
        // set header
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        // set payload
        let data = payload;
        return Client.post(url, data, config);
    },
};