import axios from "axios";

const api = axios.create({
    baseURL: "https://bc2ccourses-backend.onrender.com",
    // baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
