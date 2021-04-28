import axios from 'axios'

export class AxiosWrapper {
    constructor(headers = {}) {
        headers['accept'] = 'application/json'

        let service = axios.create({
            headers: headers
        })

        /* Use custom response handlers for axios */
        service.interceptors.response.use(this._successHandler, this._errorHandler)
        this.service = service
    }

    _successHandler(response) { return response }

    _errorHandler(error) { 
        let responseStatus = error.response.status

        switch (responseStatus) {
            case 400:
                console.log(`Bad Request: ${ responseStatus }`)
                break
            case 401:
                console.log(`Unauthorized Access: ${ responseStatus }`)
                break
            case 403:
                console.log(`Forbidden: ${ responseStatus }`)
                break
            case 404:
                console.log(`Not Found: ${ responseStatus }`)
                break
            case 500:
                console.log(`Internal Server Error: ${ responseStatus }`)
                break
            default:
                console.log(`Response Error: ${ responseStatus }`)
                break
        }
        return Promise.reject(error)
    }

    /**
     * Performs GET request
     * @param  { string }       url Request URL
     * @param  { ReturnType }   callback Function that will be executed upon receiving a promise
     * @return { Promise }
     */
    get(url, callback) {
        return this.service.get(url)
            .then(response => callback(response.data))
    }

    /**
     * Performs POST request
     * @param  { string }       url Request URL
     * @param  { object }       payload Request payload
     * @param  { ReturnType }   callback Function that will be executed upon receiving a promise
     * @return { Promise }
     */
    post(url, payload, callback) {
        return this.service.post(url, payload, { responseType: 'json' })
            .then(response => callback(response.data))
    }

    /**
     * Performs PUT request
     * @param  { string }       url Request URL
     * @param  { object }       payload Request payload
     * @param  { ReturnType }   callback Function that will be executed upon receiving a promise
     * @return { Promise }
     */
    put(url, payload, callback) {
        return this.service.put(url, payload)
            .then(response => callback(response.data))
    }

    /**
     * Performs DELETE request
     * @param  { string }       url Request URL
     * @param  { object }       payload Request payload, optional
     * @param  { ReturnType }   callback Function that will be executed upon receiving a promise
     * @return { Promise }
     */
    delete(url, payload, callback) {
        return this.service.delete(url, { data: payload })
            .then(response => callback(response.data))
    }
}