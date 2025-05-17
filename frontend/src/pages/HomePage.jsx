import React from "react";
import ProfileList from "../components/ProfileList";

function HomePage() {
    return (
        <div className="container mt-4">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Profiles</h1>
                <p className="lead text-secondary">
                    Browse and explore all profiles. Click "Summary" to view more details and location on the map.
                </p>
                <hr className="my-4" />
            </div>
            <ProfileList />
        </div>
    );
}

export default HomePage;