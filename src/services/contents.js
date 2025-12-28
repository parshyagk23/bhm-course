import api from "./api";
export const getCourseVideos = async (courseId) => {
    const res = await api.get(
        `/user/content/get/video/${courseId}`
    );
    return res.data;
};

// Get videos by courseId + folderId
export const getCourseVideosByFolder = async (courseId, folderId) => {
    const res = await api.get(
        `/user/content/get/video/${courseId}/${folderId}`
    );
    return res.data;
};

/* ===================== FILE ===================== */

// Get files by courseId
export const getCourseFiles = async (courseId) => {
    const res = await api.get(
        `/user/content/get/file/${courseId}`
    );
    return res.data;
};

// Get files by courseId + folderId
export const getCourseFilesByFolder = async (courseId, folderId) => {
    const res = await api.get(
        `/user/content/get/file/${courseId}/${folderId}`
    );
    return res.data;
};

/* ===================== QUIZ ===================== */

// Get quizzes by courseId
export const getCourseQuizzes = async (courseId) => {
    const res = await api.get(
        `/user/content/get/quiz/${courseId}`
    );
    return res.data;
};

// Get quizzes by courseId + folderId
export const getCourseQuizzesByFolder = async (courseId, folderId) => {
    const res = await api.get(
        `/user/content/get/quiz/${courseId}/${folderId}`
    );
    return res.data;
};



export const getContentbyContentId =async (type, contentid) => {
    const res = await api.get(
        `/user/content/get/content/${contentid}?type=${type}`
    );
    return res.data;
}