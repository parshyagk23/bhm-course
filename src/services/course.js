import api from "./api";

/**
 * Get all published courses
 * GET /user/courses/all
 */
export const getAllCourses = async () => {
    const response = await api.get("/user/courses/all");
    return response.data;
};

/**
 * Get featured published courses
 * GET /user/courses/featured
 */
export const getFeaturedCourses = async () => {
    const response = await api.get("/user/courses/featured");
    return response.data;
};

/**
 * Get course details by course name
 * GET /user/courses/get/{coursename}
 */
export const getCourseByName = async (courseName, phone) => {
    const response = await api.get(`/user/courses/get/${courseName}?phoneNo=${phone || ""}`);
    return response.data;
};

/**
 * Get courses by category
 * GET /user/courses?category=xyz
 */
export const getCoursesByCategory = async (category) => {
    const response = await api.get("/user/courses", {
        params: { category },
    });
    return response.data;
};
