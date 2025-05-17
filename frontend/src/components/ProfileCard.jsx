import React from "react";

function ProfileCard({ profile, onSummary }) {
    return (
        <div className="card h-100 shadow-sm border-0">
            {profile.photo && (
                <img
                    src={profile.photo}
                    className="card-img-top"
                    alt={profile.name}
                    style={{ objectFit: "cover", height: "220px" }}
                />
            )}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{profile.name}</h5>
                <p className="card-text text-secondary">{profile.description}</p>
                <button
                    className="btn btn-gradient-primary mt-auto"
                    style={{
                        background: "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "25px",
                        fontWeight: "bold",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }}
                    onClick={onSummary}
                >
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    Summary
                </button>
            </div>
        </div>
    );
}

export default ProfileCard;