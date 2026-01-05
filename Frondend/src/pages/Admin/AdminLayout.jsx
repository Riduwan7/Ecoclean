import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-emerald-700 text-white shadow-lg">
        <div className="px-6 py-6 text-2xl font-bold tracking-wide">
          ♻ EcoClean Admin
        </div>

        <nav className="mt-4">

          <MenuLink to="/admin/dashboard" label="Dashboard" />
          <MenuLink to="/admin/users" label="Manage Users" />
          <MenuLink to="/admin/pickups" label="Manage Pickups" />
          <MenuLink to="/admin/complaints" label="Manage Complaints" />
          <MenuLink to="/admin/messages" label="Messages" />

        </nav>

        <div className="mt-auto px-6 py-6 text-sm border-t border-emerald-600">
          <p className="mb-2">Logged in as:</p>
          <p className="font-semibold">{user?.email}</p>

          <button
            onClick={logout}
            className="mt-4 bg-red-500 hover:bg-red-600 w-full py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
};

const MenuLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-6 py-3 text-sm font-medium transition ${isActive
        ? "bg-white text-emerald-700 rounded-l-2xl"
        : "text-white hover:bg-emerald-600"
      }`
    }
  >
    {label}
  </NavLink>
);

export default AdminLayout;
