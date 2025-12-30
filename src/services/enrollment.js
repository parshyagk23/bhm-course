import api from "./api";


export const getEnrolledCourse = async (uid) => {
    const response = await api.get(`/user/enrollement/get`);
    return response.data;
};

export const getEnrolledCourseContent = async (coursename) => {
    const response = await api.get(`/user/enrollement/content/${coursename}`);
    return response.data;
};

export const getEnrolledCourseContentWithFolderId = async (course_name, folderid) => {
    const response = await api.get(`/user/enrollement/content/${course_name}/${folderid}`);
    return response.data;
};

export const updateCompletedContentList = async (enrollmentId, payload) => {
    const response = await api.patch(`/user/enrollement/update/watched-content/${enrollmentId}`, payload);
    return response.data;
};
