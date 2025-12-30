import api from "./api";

// LOGIN
export const loginUser = async (payload) => {
    try {
        const response = await api.post("/user/auth/login", payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// REGISTER
export const registerUser = async (payload) => {
    try {
        const response = await api.post("/user/auth/register", payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const updateUserDetails = async (payload) => {
    try {
        const response = await api.patch("/user/auth/update-details", payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const currentUserDetails = async () => {
    try {
        const response = await api.get("/user/auth/get/current-user-details");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
