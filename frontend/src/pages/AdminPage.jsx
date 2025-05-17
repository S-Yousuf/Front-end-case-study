import React from "react";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

function AdminPage({ admin, setAdmin, onLogout }) {
    if (!admin) {
        return <AdminLogin onLogin={(u, p) => setAdmin({ username: u, password: p })} />;
    }
    return <AdminDashboard admin={admin} onLogout={onLogout} />;
}

export default AdminPage;