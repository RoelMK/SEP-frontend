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
        return Client.post(url, payload, {});
    },
    /**
     * Get users that are being supervised by a current user
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    getChildren(payload) {
        let url = `${resource}getChildren`;
        return Client.get(url, { headers: {}, params: payload });
    },
    /**
     * Get supervisors of current user
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    getSupervisors(payload) {
        let url = `${resource}getSupervisors`;
        return Client.get(url, { headers: {}, params: payload });
    },
    /**
     * Delete specific supervisor
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    deleteSupervisor(payload) {
        let url = `${resource}retractPermission`;
        return Client.post(url, payload, {});
    },
    /**
     * Approve supervisor
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    getApproved(payload) {
        let url = `${resource}getApproved`;
        return Client.get(url, { headers: {}, params: payload });
    },
    /**
     * Get current user role
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    getRole(payload) {
        let url = `${resource}role`;
        return Client.get(url, { headers: {}, params: payload });
    },
    /**
     * Get token of the user that is being supervised
     * @param  { any }      payload payload of the request
     * @return { any }
     */
    getToken(payload) {
        let url = `${resource}getToken`;
        return Client.get(url, { headers: {}, params: payload });
    }
};