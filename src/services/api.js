import axios from "axios";

const api = axios.create({
    baseURL: "https://bc2ccourses-backend.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
