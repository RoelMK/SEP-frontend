import Client from './Client.js';
const resource = '/';

export default {
    upload(payload) {
        let url = `${resource}upload`;
        let headers = {
            "ijsco": "ijsco"
        };
        return Client.post(url, payload, headers);
    },
    connectNightscout(payload) {
        let url = `${resource}nightscout`;
        let config = {
            params: payload
        };
        return Client.get(url, config);
    }
};