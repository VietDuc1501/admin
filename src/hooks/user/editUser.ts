import axios from "axios";

export const fetchUserById = async (id: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${id}`);
    return res.data;
};
export const updateUser = async (user: any) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/user`, user);
    return res.data;
};

