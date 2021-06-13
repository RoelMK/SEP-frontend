import axios from 'axios';

const baseDomain = "https://gist.githubusercontent.com/";
const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL,
    headers: {}
});