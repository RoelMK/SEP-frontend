import axios from "axios";

const baseDomain = "http://diabetter.win.tue.nl:5000";
// const baseDomain = "http://diabetter.win.tue.nl:8080";
const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL,
    headers: {
    },
});