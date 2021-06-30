import axios from "axios";

// const baseDomain = "http://diabetter.win.tue.nl:5000";
const baseDomain = "http://localhost:8080";
export const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL,
    headers: {
    },
});