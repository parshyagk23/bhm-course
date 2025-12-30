import api from "./api";


export const getCoupon = async (courseId) => {
    const res = await api.get(
        `/user/coupons/get/${courseId}`
    );
    return res.data;
};
export const getCouponById = async (couponcode, courseId) => {
    const res = await api.get(
        `/user/coupons/get/${couponcode}/${courseId}`
    );
    return res.data;
};
