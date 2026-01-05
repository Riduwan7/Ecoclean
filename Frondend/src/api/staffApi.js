import axiosInstance from "./axiosInstance";

export const getAssignedPickupsApi = async () => {
  const res = await axiosInstance.get("/staff/pickups");
  return res.data;
};

export const updatePickupStatusApi = async (pickupId, status) => {
  const res = await axiosInstance.patch(
    `/staff/pickups/${pickupId}/status`,
    { status }
  );
  return res.data;
};

export const uploadProofApi = async (pickupId, file) => {
  const fd = new FormData();
  fd.append("proofImage", file);

  const res = await axiosInstance.post(
    `/staff/pickups/${pickupId}/proof`,
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return res.data;
};
