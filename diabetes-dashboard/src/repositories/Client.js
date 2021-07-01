import axios from "axios";

// Base URL that needs to be adjusted depending on your host
const baseDomain = "http://localhost:8080";
export const baseURL = `${baseDomain}`;

// Create a basic axios object with the base URL and the headers.
export default axios.create({
    baseURL,
    headers: {
    },
});