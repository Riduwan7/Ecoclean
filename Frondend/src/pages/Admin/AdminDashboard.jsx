import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStatsApi } from "../../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAdminStatsApi()
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-emerald-700">
        Loading Analytics...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black text-emerald-800">
            Admin Analytics Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time overview of your EcoClean platform
          </p>
        </div>

        <div className="flex gap-3">
          <QuickBtn label="Users" onClick={() => navigate("/admin/users")} />
          <QuickBtn label="Pickups" onClick={() => navigate("/admin/pickups")} />
          <QuickBtn label="Complaints" onClick={() => navigate("/admin/complaints")} />
          <QuickBtn label="Reviews" onClick={() => navigate("/admin/reviews")} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          color="border-blue-500"
          icon="👥"
          onClick={() => navigate("/admin/users")}
        />

        <StatCard
          title="Pickup Requests"
          value={stats?.totalPickups || 0}
          color="border-emerald-500"
          icon="♻"
          onClick={() => navigate("/admin/pickups")}
        />

        <StatCard
          title="Pending Requests"
          value={stats?.pendingPickups || 0}
          color="border-yellow-500"
          icon="⏳"
          onClick={() => navigate("/admin/pickups")}
        />

        <StatCard
          title="Completed Requests"
          value={stats?.completedPickups || 0}
          color="border-purple-500"
          icon="✅"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-widest">
            Waste Collection Distribution
          </h3>

          {stats?.wasteStats?.length ? (
            stats.wasteStats.map((item) => (
              <div key={item._id} className="mb-4">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="capitalize">{item._id}</span>
                  <span>{item.count}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{
                      width: `${(item.count / stats.totalPickups) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No data yet</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-widest">
            Staff Workload Summary
          </h3>

          {stats?.staffWorkload?.length ? (
            stats.staffWorkload.map((s) => (
              <div
                key={s.staffId}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-xl mb-2"
              >
                <span className="font-medium text-gray-700">{s.name}</span>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                  {s.pickups} Tasks
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No staff assignments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, icon, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${color} cursor-pointer hover:shadow-md transition active:scale-95`}
  >
    <p className="text-gray-400 text-xs font-bold uppercase">{title}</p>
    <div className="flex items-center gap-3 mt-2">
      <span className="text-3xl">{icon}</span>
      <p className="text-4xl font-black text-gray-800">{value}</p>
    </div>
  </div>
);

const QuickBtn = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white border px-4 py-2 rounded-xl shadow-sm hover:bg-emerald-50 hover:border-emerald-300 text-sm font-semibold"
  >
    {label}
  </button>
);

export default AdminDashboard;
