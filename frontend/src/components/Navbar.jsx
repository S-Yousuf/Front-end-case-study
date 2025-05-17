import React from "react";
import { Link } from "react-router-dom";

function Navbar({ admin, onLogout }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Case Study</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {admin && admin.username ? (
                            <>
                                <li className="nav-item me-2">
                                    <Link className="btn btn-outline-light" to="/admin">Admin Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="btn btn-outline-primary" to="/admin">Admin Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;