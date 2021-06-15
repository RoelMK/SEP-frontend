import Client from './Client.js';
const resource = '/supervisor/';

/**
 * TODO:
 *      - check if current user is a supervisor
 *      - request a supervisor
 *      - get a list of supervisors
 *      - get a list of children
 *      - approve a supervisor
 *      - retract / delete a supervisor
 */

export default {
    request(payload) {
        let url = `${resource}request`;
        let headers = {};
        return Client.post(url, payload, headers);
    },
    getChildren(payload) {
        let url = `${resource}getChildren`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.get(url, config);
    },
    getSupervisors(payload) {
        let url = `${resource}getSupervisors`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.get(url, config);
    },
    deleteSupervisor(payload) {
        let url = `${resource}retractPermission`;
        let headers = {};
        return Client.post(url, payload, headers);
    },
    getApproved(payload) {
        let url = `${resource}getApproved`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.get(url, config);
    },
    getRole(payload) {
        let url = `${resource}role`;
        let config = {
            headers: {
            },
            params: payload
        };
        return Client.get(url, config);
    },



};