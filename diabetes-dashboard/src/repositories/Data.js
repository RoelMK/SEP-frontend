import Client from './Client.js';
const resource = '/';

export default {
    /**
     * Fetch data of the current user
     * @param  { any }      payload payload of the request
     * @param  { string }   token jwt token
     * @return { any }
     */
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
    /**
     * Delete selected item
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
     * Post emotion
     * @param  { any }      payload payload of the request
     * @param  { string }   token jwt token
     * @return { any }
     */
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
    /**
     * Post insulin
     * @param  { any }      payload payload of the request
     * @param  { string }   token jwt token
     * @return { any }
     */
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
