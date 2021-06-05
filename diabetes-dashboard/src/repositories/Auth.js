import Client from './Client.js';
const resource = '/';
import axios from "axios";

export default {
    login(payload) {
        let url = `${resource}login`;
        let config = {
            headers: {
                "ijsco": "ijsco"
            },
        };
        return Client.get(url, payload, config);
    }
};