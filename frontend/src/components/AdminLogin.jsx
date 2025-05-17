import React, { useState } from "react";

function AdminLogin({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            onLogin(username, password);
        } else {
            setError(data.error || "Login failed");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
                <h3 className="mb-4 text-center">Admin Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button className="btn btn-dark w-100" type="submit">Login</button>
                    {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;