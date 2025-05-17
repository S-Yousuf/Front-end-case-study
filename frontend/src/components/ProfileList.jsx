import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import MapModal from "./MapModal";

function ProfileList() {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/profiles")
            .then(res => res.json())
            .then(data => setProfiles(data));
    }, []);

    return (
        <>
            <div className="row">
                {profiles.map(profile => (
                    <div className="col-md-4 mb-4" key={profile.id}>
                        <ProfileCard
                            profile={profile}
                            onSummary={() => setSelectedProfile(profile)}
                        />
                    </div>
                ))}
            </div>
            {selectedProfile && (
                <MapModal
                    profile={selectedProfile}
                    onClose={() => setSelectedProfile(null)}
                />
            )}
        </>
    );
}

export default ProfileList;