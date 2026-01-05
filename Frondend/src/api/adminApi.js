import axiosInstance from "./axiosInstance";

export const getAllUsersApi = () =>
  axiosInstance.get("/admin/users");

export const toggleUserStatusApi = (userId) =>
  axiosInstance.patch(`/admin/users/toggle/${userId}`);

export const deleteUserApi = (userId) =>
  axiosInstance.delete(`/admin/users/${userId}`);

export const getAdminStatsApi = () =>
  axiosInstance.get("/admin/stats");

export const getAllPickupsAdminApi = () =>
  axiosInstance.get("/pickups/admin/all");

export const assignPickupApi = (pickupId, staffId) =>
  axiosInstance.patch(`/admin/assign/${pickupId}`, { staffId });
