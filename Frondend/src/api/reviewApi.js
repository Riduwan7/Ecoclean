import axiosInstance from "./axiosInstance";

export const createReviewApi = (reviewData) => {
  return axiosInstance.post("/reviews", reviewData);
};

export const getMyReviewApi = () => {
  return axiosInstance.get("/reviews/my");
};

export const getAllReviewsApi = () => {
  return axiosInstance.get("/reviews");
};

export const getAverageRatingApi = () => {
  return axiosInstance.get("/reviews/average");
};