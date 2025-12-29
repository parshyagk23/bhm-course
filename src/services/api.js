import axios from "axios";

const api = axios.create({
    baseURL: "https://bc2ccourses-backend.onrender.com",
    // baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// REQUEST Interceptor (Adds token to headers)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

// RESPONSE Interceptor (Checks for 401/Expired token)
api.interceptors.response.use(
    (response) => response, // If the request is successful, just return the response
    (error) => {
        // Check if the error response exists and has a 401 status
        if (error.response && error.response.status === 401) {
            const detail = error.response.data.detail;

            // Check if it's specifically an expiry or invalid token issue
            if (detail === "Token has expired" || detail === "Invalid token") {
                console.warn("Session expired. Redirecting to login...");

                // 1. Clear local storage
                localStorage.removeItem("access_token");
                localStorage.removeItem("uid");
                localStorage.removeItem("user");

                // 2. Redirect to login page
                // Use window.location for a hard redirect
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;