import Client from './Client.js';
const resource = '/supervisor/';

export default {
    /**
     * Request supervisor role
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    request(payload) {
        let url = `${resource}request`;
        let headers = {};
        return Client.post(url, payload, headers);
    },
    /**
     * Get users that are being supervised by a current user
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    getChildren(payload) {
        let url = `${resource}getChildren`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.get(url, config);
    },
    /**
     * Get supervisors of current user
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    getSupervisors(payload) {
        let url = `${resource}getSupervisors`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.get(url, config);
    },
    /**
     * Delete specific supervisor
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    deleteSupervisor(payload) {
        let url = `${resource}retractPermission`;
        let headers = {};
        return Client.post(url, payload, headers);
    },
    /**
     * Approve supervisor
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    getApproved(payload) {
        let url = `${resource}getApproved`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.get(url, config);
    },
    /**
     * Get current user role
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    getRole(payload) {
        let url = `${resource}role`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.get(url, config);
    },
    /**
     * Get token of the user that is being supervised
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    getToken(payload) {
        let url = `${resource}getToken`;
        let config = {
            headers: {},
            params: payload
        };
        return Client.get(url, config);
    }
};