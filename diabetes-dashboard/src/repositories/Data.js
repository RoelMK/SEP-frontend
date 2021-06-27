import Client from './Client.js';
const resource = '/';

export default {
    /**
     * Fetch data of the current user
     * @param  { any }      payload payload of the request
     * @param  { string }   token jwt token
     * @return { any }
     */
    fetch(payload, token) {
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
    /**
     * Delete selected item to the backend
     * @param  { any }      payload payload of the request
     * @param  { string }   token jwt token
     * @return { any }
     */
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
    /**
     * Post item to the backend
     * @param { any }      payload payload of the request
     * @param { string }   token jwt token
     * @param { string }   endpoint endpoint name
     * @return { any }
     */
    postItem(payload, token, endpoint) {
        let url = `${resource}${endpoint}`;
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        let data = payload;
        return Client.post(url, data, config);
    },
};
