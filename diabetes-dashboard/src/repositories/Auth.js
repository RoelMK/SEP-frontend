import Client from './Client.js';
const resource = '/';

export default {
    /**
     * Login
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    login(payload) {
        let url = `${resource}login`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.get(url, config);
    },
    /**
     * Upload token to the backend
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    uploadToken(payload) {
        let url = `${resource}supervisor/logToken`;
        let headers = {};
        return Client.post(url, payload, headers);
    },
    /**
     * Get profile data of the current user
     * @param  { string }   token jwt token
     * @return { any }
     */
    getProfile(token) {
        let url = `${resource}profile`;
        let config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        return Client.get(url, config);
    },
    /**
     * Update user data
     * @param  { any }      payload payload of the request
     * @param  { string }   token jwt token
     * @return { any }
     */
    updateUser(payload, token) {
        let url = `${resource}profile`;
        let config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        return Client.post(url, payload, config);
    }
};