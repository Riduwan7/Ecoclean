import React, { useEffect, useState } from "react";
import { getMyPickupsApi, deletePickupApi } from "../../api/pickupApi";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  assigned: "bg-blue-100 text-blue-700",
  "on-the-way": "bg-indigo-100 text-indigo-700",
  collected: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyPickups = () => {
  const navigate = useNavigate();
  const socket = useSocket();

  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPickups = async () => {
    try {
      const { data } = await getMyPickupsApi();
      setPickups(data);
    } catch (err) {
      setError("Failed to load pickups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("pickup_updated", (updatedData) => {
      setPickups((prevPickups) =>
        prevPickups.map((pickup) =>
          pickup._id === updatedData.pickupId
            ? { ...pickup, status: updatedData.status }
            : pickup
        )
      );
    });

    return () => {
      socket.off("pickup_updated");
    };
  }, [socket]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this pickup?")) return;

    try {
      await deletePickupApi(id);
      setPickups(pickups.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete pickup");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading pickups...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-emerald-700">
          📦 My Pickup Requests
        </h2>

        <button
          onClick={() => navigate("/user/request-pickup")}
          className="bg-emerald-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition"
        >
          + New Pickup
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Pickup Type</th>
              <th className="px-6 py-3">Waste Items</th>
              <th className="px-6 py-3">Scheduled Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {pickups.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No pickup requests found
                </td>
              </tr>
            ) : (
              pickups.map((pickup) => (
                <tr
                  key={pickup._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 capitalize">
                    {pickup.pickupType}
                  </td>

                  <td className="px-6 py-4">
                    {pickup.wasteItems.map((item, idx) => (
                      <div key={idx}>
                        {item.category} ({item.quantity})
                      </div>
                    ))}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(pickup.scheduledDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[pickup.status]}`}
                    >
                      {pickup.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {pickup.status === "pending" ? (
                      <button
                        onClick={() => handleDelete(pickup._id)}
                        className="text-red-500 text-sm font-semibold hover:underline"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        —
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPickups;
