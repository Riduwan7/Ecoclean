import React, { useEffect, useState } from "react";
import { getAssignedPickupsApi } from "../../api/staffApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const statusBadge = {
  pending: "bg-gray-100 text-gray-700",
  assigned: "bg-yellow-100 text-yellow-700",
  "on-the-way": "bg-blue-100 text-blue-700",
  collected: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700"
};

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPickups();
  }, []);

  const loadPickups = async () => {
    const data = await getAssignedPickupsApi();

    if (pickups.length && data.length > pickups.length) {
      setNotifications(prev => [
        { msg: "New pickup assigned to you", id: Date.now() },
        ...prev
      ]);
    }

    setPickups(data || []);
    setLoading(false);
  };

  const unread = notifications.length;

  const stats = {
    total: pickups.length,
    assigned: pickups.filter(p => p.status === "assigned").length,
    onTheWay: pickups.filter(p => p.status === "on-the-way").length,
    collected: pickups.filter(p => p.status === "collected").length,
    completed: pickups.filter(p => p.status === "completed").length
  };

  if (loading)
    return (
      <div className="p-10 text-center text-emerald-700 font-bold">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-xl font-bold text-emerald-700">
            ♻ EcoClean Staff Panel
          </h1>
          <p className="text-sm text-gray-500">
            My Pickup Tasks
          </p>
        </div>

        <div className="flex items-center gap-6">

          <div className="relative cursor-pointer">
            <span className="text-2xl">🔔</span>
            {unread > 0 && (
              <span className="absolute -top-1 -right-2 text-[10px] bg-red-500 text-white px-2 rounded-full">
                {unread}
              </span>
            )}
          </div>

          <span className="text-gray-600 text-sm">
            Hi, <b>{user?.name}</b>
          </span>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {notifications.length > 0 && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-3 text-center text-yellow-700 text-sm">
          {notifications[0].msg}
        </div>
      )}

      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">
          Today's Collection Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <Card label="Total Tasks" value={stats.total} color="emerald" />
          <Card label="Assigned" value={stats.assigned} color="yellow" />
          <Card label="On The Way" value={stats.onTheWay} color="blue" />
          <Card label="Collected" value={stats.collected} color="purple" />
          <Card label="Completed" value={stats.completed} color="green" />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Recent Assignments</h3>

          <button
            onClick={() => navigate("/staff/pickups")}
            className="text-emerald-600 font-bold text-sm hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {pickups.slice(0, 5).map(p => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 cursor-pointer transition"
                  onClick={() => navigate("/staff/pickups")}
                >
                  <td className="p-4 font-bold">{p.userId?.name}</td>
                  <td className="p-4 text-gray-600">{p.address}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statusBadge[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}

              {pickups.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-500">
                    No assigned pickups yet
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Card = ({ label, value, color }) => {
  const colors = {
    emerald: "border-emerald-500",
    gray: "border-gray-400",
    yellow: "border-yellow-500",
    blue: "border-blue-500",
    purple: "border-purple-500",
    green: "border-green-600"
  };

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border-b-4 ${colors[color]}`}>
      <p className="text-gray-400 text-xs font-bold uppercase">{label}</p>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
};

export default StaffDashboard;
