import Client from './Client.js';
import DummyClient from './DummyClient.js';
const resource = '/';

export default {
    fetch(payload, token) {
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
    // Will be removed when we have enough data in the backend
    testFetch() {
        // eslint-disable-next-line
        let url = `${resource}nbalasovs/e212107367c65915668cf26e75d2ccfa/raw/f71d55987d20823e87103e96c39f43e7d678db37/dummy.json`;
        let config = {
            headers: {},
        };
        return DummyClient.get(url, config);
    }
};
