import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ChatWidget from "../../components/ChatWidget";

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-black text-emerald-700">
          ♻ EcoClean — User Panel
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Hi, <b>{user?.name}</b>
          </span>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-md mb-8">
          <h2 className="text-2xl font-black">Welcome back, {user?.name} 👋</h2>
          <p className="text-sm mt-1 opacity-90">
            Manage your waste pickups, track progress & help keep the city clean.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex gap-6 items-center mb-10">

          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-black rounded-full">
            {user?.name?.charAt(0)}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold">{user?.name}</h3>
            <p className="text-gray-500 text-sm">{user?.email}</p>

            <p className="mt-1 text-xs">
              Status:{" "}
              <span
                className={`font-bold ${user?.isActive ? "text-green-600" : "text-red-600"
                  }`}
              >
                {user?.isActive ? "Active" : "Blocked"}
              </span>
            </p>
          </div>
        </div>


        <h3 className="font-bold text-xl mb-4">What would you like to do?</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <DashboardCard
            title="Request Pickup"
            description="Schedule a waste pickup at your location"
            link="/user/request-pickup"
            color="emerald"
            icon="🚛"
          />

          <DashboardCard
            title="My Pickups"
            description="Track status & history of your pickups"
            link="/user/my-pickups"
            color="blue"
            icon="📦"
          />

          <DashboardCard
            title="Raise Complaint"
            description="Report an issue or service delay"
            link="/user/complaints"
            color="yellow"
            icon="⚠️"
          />

          <DashboardCard
            title="Add Review"
            description="Help others by sharing your experience"
            link="/user/add-review"
            color="purple"
            icon="⭐"
          />
        </div>
      </div>
      <ChatWidget />
    </div>
  );
};


const Stat = ({ label, value, icon, color }) => {
  const colors = {
    emerald: "border-emerald-500",
    blue: "border-blue-500",
    yellow: "border-yellow-500",
    purple: "border-purple-500"
  };

  return (
    <div className={`bg-white p-5 rounded-2xl shadow-sm border-l-4 ${colors[color]}`}>
      <p className="text-xs text-gray-400 font-bold uppercase">{label}</p>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-2xl">{icon}</span>
        <p className="text-xl font-black">{value}</p>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, description, link, color, icon }) => {
  const colorClasses = {
    emerald: "bg-emerald-500 hover:bg-emerald-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    purple: "bg-purple-500 hover:bg-purple-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition cursor-pointer">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-500 text-sm mb-4">{description}</p>

      <Link
        to={link}
        className={`${colorClasses[color]} text-white px-4 py-2 rounded-lg`}
      >
        Open →
      </Link>
    </div>
  );
};

export default UserDashboard;
