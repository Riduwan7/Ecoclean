import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  MessageSquareWarning, 
  Star, 
  LogOut 
} from "lucide-react"; 
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Users", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Pickups", path: "/admin/pickups", icon: <Truck size={20} /> },
    { name: "Complaints", path: "/admin/complaints", icon: <MessageSquareWarning size={20} /> },
    { name: "Reviews", path: "/admin/reviews", icon: <Star size={20} /> },
  ];

  return (
    <div className="h-screen w-64 bg-green-900 text-white flex flex-col fixed left-0 top-0 shadow-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-emerald-400">ECOCLEAN</h1>
        <p className="text-xs text-green-300 mt-1 uppercase font-semibold">Admin Panel</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-emerald-600 text-white shadow-md"
                : "text-green-100 hover:bg-green-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-green-800">
        <button
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 w-full text-red-300 hover:bg-red-900/30 hover:text-red-100 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;