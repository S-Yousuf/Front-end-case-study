import React, { useState, useEffect } from "react";

function AdminDashboard({ admin, onLogout }) {
    const [profiles, setProfiles] = useState([]);
    const [newProfile, setNewProfile] = useState({ name: "", photo: "", description: "", address: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editProfile, setEditProfile] = useState({ name: "", photo: "", description: "", address: "" });

    useEffect(() => {
        fetch("http://localhost:5000/api/profiles")
            .then(res => res.json())
            .then(data => {
                setProfiles(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load profiles.");
                setLoading(false);
            });
    }, []);

    const handleAdd = async e => {
        e.preventDefault();
        setError("");
        const res = await fetch("http://localhost:5000/api/profiles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Admin-Username": admin.username,
                "X-Admin-Password": admin.password
            },
            body: JSON.stringify(newProfile)
        });
        const data = await res.json();
        if (res.ok) {
            setProfiles([...profiles, { ...newProfile, id: data.id }]);
            setNewProfile({ name: "", photo: "", description: "", address: "" });
        } else {
            setError(data.error || "Failed to add profile");
        }
    };

    const handleDelete = async id => {
        setError("");
        const res = await fetch(`http://localhost:5000/api/profiles/${id}`, {
            method: "DELETE",
            headers: {
                "X-Admin-Username": admin.username,
                "X-Admin-Password": admin.password
            }
        });
        if (res.ok) setProfiles(profiles.filter(p => p.id !== id));
        else setError("Delete failed");
    };

    // Edit functionality
    const startEdit = (profile) => {
        setEditingId(profile.id);
        setEditProfile({
            name: profile.name,
            photo: profile.photo,
            description: profile.description,
            address: profile.address || ""
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditProfile({ name: "", photo: "", description: "", address: "" });
    };

    const saveEdit = async (id) => {
        setError("");
        const res = await fetch(`http://localhost:5000/api/profiles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Admin-Username": admin.username,
                "X-Admin-Password": admin.password
            },
            body: JSON.stringify(editProfile)
        });
        if (res.ok) {
            setProfiles(profiles.map(p => p.id === id ? { ...p, ...editProfile } : p));
            cancelEdit();
        } else {
            setError("Failed to update profile");
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Admin Dashboard</h2>                
            </div>
            <div className="card p-3 mb-4 shadow-sm">
                <h5>Add New Profile</h5>
                <form className="row g-2" onSubmit={handleAdd}>
                    <div className="col-md-2">
                        <input className="form-control" value={newProfile.name} onChange={e => setNewProfile({ ...newProfile, name: e.target.value })} placeholder="Name" required />
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" value={newProfile.photo} onChange={e => setNewProfile({ ...newProfile, photo: e.target.value })} placeholder="Photo URL" />
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" value={newProfile.description} onChange={e => setNewProfile({ ...newProfile, description: e.target.value })} placeholder="Description" />
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" value={newProfile.address} onChange={e => setNewProfile({ ...newProfile, address: e.target.value })} placeholder="Address" required />
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary w-100" type="submit">Add</button>
                    </div>
                </form>
                {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
            <h5>All Profiles</h5>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="row">
                    {profiles.map(p => (
                        <div className="col-md-4 mb-3" key={p.id}>
                            <div className="card h-100 shadow-sm">
                                {p.photo && <img src={p.photo} className="card-img-top" alt={p.name} style={{ objectFit: "cover", height: "200px" }} />}
                                <div className="card-body">
                                    {editingId === p.id ? (
                                        <>
                                            <input className="form-control mb-2" value={editProfile.name} onChange={e => setEditProfile({ ...editProfile, name: e.target.value })} />
                                            <input className="form-control mb-2" value={editProfile.photo} onChange={e => setEditProfile({ ...editProfile, photo: e.target.value })} />
                                            <input className="form-control mb-2" value={editProfile.description} onChange={e => setEditProfile({ ...editProfile, description: e.target.value })} />
                                            <input className="form-control mb-2" value={editProfile.address} onChange={e => setEditProfile({ ...editProfile, address: e.target.value })} />
                                            <button className="btn btn-success btn-sm me-2" onClick={() => saveEdit(p.id)}>Save</button>
                                            <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                            <p className="card-text"><strong>Address:</strong> {p.address}</p>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(p)}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;