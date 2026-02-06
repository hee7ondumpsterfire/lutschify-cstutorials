import React from 'react';
import { Link } from 'react-router-dom';
import './MapCard.css';

const MapCard = ({ map }) => {
    return (
        <Link to={`/training/${map.id}`} className="map-card glass-panel">
            <div className="map-image-container">
                <img src={map.image} alt={map.name} className="map-image" loading="lazy" />
                <div className="map-overlay">
                    {!map.active && <span className="inactive-badge">Inactive</span>}
                </div>
            </div>
            <div className="map-info">
                <h3>{map.name}</h3>
                <p className="map-meta">Active Duty Group</p>
            </div>
        </Link>
    );
};

export default MapCard;
