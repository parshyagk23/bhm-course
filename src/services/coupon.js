import api from "./api";


export const getCoupon = async (courseId) => {
    const res = await api.get(
        `/user/coupons/get/${courseId}`
    );
    return res.data;
};