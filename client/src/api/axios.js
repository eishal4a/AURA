import axios from "axios";

const API = axios.create({
    baseURL: "https://continuing-melba-aurasher-ea9ffc65.koyeb.app/",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;