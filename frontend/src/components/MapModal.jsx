import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

function MapModal({ profile, onClose }) {
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use address for geocoding
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(profile.address)}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                }
                setLoading(false);
            });
    }, [profile]);

    return (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{profile.name} - Location</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Description:</strong> {profile.description}</p>
                        <p><strong>Address:</strong> {profile.address}</p>
                        {loading && <div>Loading map...</div>}
                        {!loading && coords && (
                            <MapContainer center={coords} zoom={13} style={{ height: "300px", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={coords} icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] })}>
                                    <Popup>
                                        {profile.name}<br />{profile.address}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        )}
                        {!loading && !coords && (
                            <div className="alert alert-warning mt-3">Could not find location for this address.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapModal;