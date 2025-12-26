import api from "./api";



export const savePurchase = async (payload) => {
    const res = await api.post(
        `/payment/create`, payload
    );
    return res.data;
};