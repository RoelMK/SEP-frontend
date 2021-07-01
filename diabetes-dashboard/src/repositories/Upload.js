import Client from './Client.js';
const resource = '/';

export default {
    /**
     * Post file to the backend
     * @param  { any }      data file contents
     * @param  { string }   token jwt token
     * @return { any }
     */
    upload(data, token) {
        let url = `${resource}upload`;
        let headers = {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Bearer " + token
        };
        return Client.post(url, data, headers);
    },
    /**
     * Fetch onedrive token
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    fetchOnedriveToken(payload) {
        let url = `${resource}onedrive/login`;
        let config = {
            headers: {},
            params: payload
        };
        return Client.get(url, config);
    },
    /**
     * Upload file to onedrive
     * @param  { any }      payload payload of the request
     * @param  { any }      token jwt token
     * @return { any }
     */
    uploadOnedrive(payload, token) {
        let url = `${resource}onedrive/onedrive`;
        return Client.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            },
            params: payload
        });
    },
    /**
     * Connect to nightscout
     * @param  { any }      payload payload of the request
     * @param  { any }      token jwt token
     * @return { any }
     */
    connectNightscout(payload, token) {
        let url = `${resource}nightscout`;
        return Client.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            },
            params: payload
        });
    },
};