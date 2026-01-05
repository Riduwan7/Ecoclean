import axios from "axios";

const API_URL = "http://localhost:4000/api/messages";

export const sendMessageApi = async (data) => {
    const token = localStorage.getItem("token");
    return await axios.post(`${API_URL}/send`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getMessagesApi = async (userId) => {
    const token = localStorage.getItem("token");
    return await axios.get(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
