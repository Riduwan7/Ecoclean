import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">

      <div className="md:hidden absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-emerald-700 text-white rounded-lg shadow-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-emerald-700 text-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        <div className="px-6 py-6 text-2xl font-bold tracking-wide border-b border-emerald-600">
          ♻ EcoClean Admin
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto">
          <MenuLink to="/admin/dashboard" label="Dashboard" onClick={() => setIsSidebarOpen(false)} />
          <MenuLink to="/admin/users" label="Manage Users" onClick={() => setIsSidebarOpen(false)} />
          <MenuLink to="/admin/pickups" label="Manage Pickups" onClick={() => setIsSidebarOpen(false)} />
          <MenuLink to="/admin/complaints" label="Manage Complaints" onClick={() => setIsSidebarOpen(false)} />
          <MenuLink to="/admin/reviews" label="Manage Reviews" onClick={() => setIsSidebarOpen(false)} />
          <MenuLink to="/admin/messages" label="Messages" onClick={() => setIsSidebarOpen(false)} />
        </nav>

        <div className="mt-auto px-6 py-6 text-sm border-t border-emerald-600">
          <p className="mb-2 text-emerald-100">Logged in as:</p>
          <p className="font-semibold truncate">{user?.email}</p>

          <button
            onClick={logout}
            className="mt-4 bg-red-500 hover:bg-red-600 w-full py-2 rounded-lg transition shadow-md"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-x-hidden w-full">
        <div className="md:hidden h-12"></div>
        <Outlet />
      </main>

    </div>
  );
};

const MenuLink = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
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
