import React from 'react';
import MapCard from '../components/MapCard';
import { maps } from '../data/maps';
import './Training.css';

const Training = () => {
    return (
        <div className="training-page container">
            <div className="training-header">
                <h1>Select a Map</h1>
                <p>Choose a map to view specific utility tutorials.</p>
            </div>

            <div className="maps-grid">
                {maps.map((map) => (
                    <MapCard key={map.id} map={map} />
                ))}
            </div>
        </div>
    );
};

export default Training;
