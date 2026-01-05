import axiosInstance from "./axiosInstance";

export const createComplaintApi = (complaintData) => {
  return axiosInstance.post("/complaints", complaintData);
};

export const getMyComplaintsApi = () => {
  return axiosInstance.get("/complaints/my");
};

export const getAllComplaintsApi = () => {
  return axiosInstance.get("/complaints");
};