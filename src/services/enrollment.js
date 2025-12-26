import api from "./api";


export const getEnrolledCourse = async (uid) => {
    const response = await api.get(`/user/enrollement/get/${uid}`);
    return response.data;
};