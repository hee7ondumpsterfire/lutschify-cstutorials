import React from 'react';
import { Link } from 'react-router-dom';
import { maps } from '../data/maps';
import { useData } from '../context/DataContext';

const Guides = () => {
    const { guides } = useData();

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Strategy Guides</h1>
            <div className="maps-grid-cs" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {guides && guides.map(guide => {
                    const map = maps.find(m => m.id === guide.mapId);
                    if (!map) return null;
                    return (
                        <Link to={`/guides/${map.id}`} key={guide.id} className="map-card-cs" style={{ aspectRatio: '16/9' }}>
                            <img src={map.image} alt={map.name} className="map-card-bg" />
                            <div className="map-card-content">
                                <div className="map-name-cs" style={{ fontSize: '1.2rem' }}>{map.name} Guide</div>
                                <div className="map-count-cs">Read Strategy Guide</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {(!guides || guides.length === 0) && (
                <div className="empty-state glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p>No guides have been added yet.</p>
                </div>
            )}
        </div>
    );
};

export default Guides;
