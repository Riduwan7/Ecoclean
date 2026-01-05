import axiosInstance from "./axiosInstance";

export const createPickupApi = (pickupData) =>
  axiosInstance.post("/pickups", pickupData);

export const getMyPickupsApi = () =>
  axiosInstance.get("/pickups/my");

export const deletePickupApi = (id) =>
  axiosInstance.delete(`/pickups/${id}`);
