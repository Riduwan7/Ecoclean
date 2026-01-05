import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ role }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;

    if (role) {
        const rolesArray = Array.isArray(role) ? role : [role];
        if (!rolesArray.includes(user.role)) return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
