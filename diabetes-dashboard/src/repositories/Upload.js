import Client from './Client.js';
const resource = '/upload';

export default {
    upload(payload) {
        let url = `${resource}`;
        let headers = {
            "ijsco": "ijsco"
        };
        return Client.post(url, payload, headers);
    },
};