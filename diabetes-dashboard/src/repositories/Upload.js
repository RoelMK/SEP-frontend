import Client from './Client.js';
const resource = '/';

export default {
    upload(data, token) {
        let url = `${resource}upload`;
        let headers = {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + token,
            "ijsco": "ijsco"
        };
        return Client.post(url, data, headers);
    },
    fetchOnedriveToken(payload) {
        let url = `${resource}onedrive/login`;
        let config = {
            headers: {},
            params: payload
        };
        return Client.get(url, config);
    },
    uploadOnedrive(payload, token) {
        let url = `${resource}onedrive/onedrive`;
        let config = {
            headers: {
                "Authorization": "Bearer " + token
            },
            params: payload
        };
        return Client.get(url, config);
    },
    connectNightscout(payload) {
        let url = `${resource}nightscout`;
        let config = {
            params: payload
        };
        return Client.get(url, config);
    },
};