import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { maps } from '../data/maps';

import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import './HomeCS.css';
import GuideForm from '../components/GuideForm';
import { useState } from 'react';

const Home = () => {
    const { tutorials, guides } = useData();
    const { isAdmin } = useAuth();
    const [isGuideFormOpen, setIsGuideFormOpen] = useState(false);

    // Stats calculation
    const stats = useMemo(() => {
        if (!tutorials) return { smoke: 0, molotov: 0, flash: 0, he: 0 };
        return tutorials.reduce((acc, curr) => {
            acc[curr.type] = (acc[curr.type] || 0) + 1;
            return acc;
        }, { smoke: 0, molotov: 0, flash: 0, he: 0 });
    }, [tutorials]);

    const activeMaps = maps.filter(m => m.active);
    const otherMaps = maps.filter(m => !m.active);

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div className="csnades-layout">
                {/* Main Content: Map Grid */}
                <div className="main-content">
                    <div className="maps-grid-cs">
                        {activeMaps.map(map => (
                            <Link to={`/training/${map.id}`} key={map.id} className="map-card-cs">
                                <img src={map.image} alt={map.name} className="map-card-bg" />
                                <div className="map-card-content">
                                    <div className="map-badge">
                                        {map.icon ? (
                                            <img src={map.icon} alt="" style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
                                        ) : (
                                            <span>{map.id.substring(0, 2).toUpperCase()}</span>
                                        )}
                                    </div>
                                    <div className="map-name-cs">{map.name}</div>
                                    <div className="map-count-cs">
                                        {tutorials?.filter(t => t.mapId === map.id).length || 0} nades
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="secondary-maps-list">
                        {otherMaps.map(map => (
                            <Link to={`/training/${map.id}`} key={map.id} className="sec-map-link">
                                <span style={{ opacity: 0.5 }}>🛡️</span> {map.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="csnades-sidebar">
                    <div className="sidebar-section">
                        <h3>Welcome to lutschify, the #2 place to learn Counter Strike 2 grenade lineups and become a respected carry player.</h3>
                        <p className="sidebar-text">
                            If you want to make sure your window smoke on mirage is on point without risking your mates to peek - this is your place to be.
                        </p>

                        <div className="sidebar-links">
                            <Link to="/admin" className="sidebar-link">Login to Admin</Link>
                            {/* In real app: <a href="#" className="sidebar-link">★ Favourites</a> */}
                            <a href="#" className="sidebar-link">+ Submit nade</a>
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <div className="sidebar-links">
                            <a href="#" className="sidebar-link">👾 Join us on Discord</a>
                            <a href="#" className="sidebar-link">☕ Support us on Patreon</a>
                            <a href="#" className="sidebar-link">📺 Subscribe on YouTube</a>
                        </div>
                    </div>

                    {/* Removed FACEIT to Leetify promo box */}
                    {isAdmin && (
                        <div className="promo-box" style={{ borderColor: 'var(--accent-primary)' }}>
                            <h4 style={{ color: 'white' }}>Admin Controls</h4>
                            <button onClick={() => setIsGuideFormOpen(true)} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                                + Create/Edit Guide
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="stat-item">
                    <span className="stat-icon">💨</span>
                    <div>
                        <div className="stat-count">{stats.smoke}</div>
                        <div className="stat-label">Smokes</div>
                    </div>
                </div>
                <div className="stat-item">
                    <span className="stat-icon">🔥</span>
                    <div>
                        <div className="stat-count">{stats.molotov}</div>
                        <div className="stat-label">Molotovs</div>
                    </div>
                </div>
                <div className="stat-item">
                    <span className="stat-icon">⚡</span>
                    <div>
                        <div className="stat-count">{stats.flash}</div>
                        <div className="stat-label">Flashbangs</div>
                    </div>
                </div>
                <div className="stat-item">
                    <span className="stat-icon">💣</span>
                    <div>
                        <div className="stat-count">{stats.he}</div>
                        <div className="stat-label">HE Grenades</div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Guides</h2>
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
            </div>

            {isGuideFormOpen && (
                <GuideForm onClose={() => setIsGuideFormOpen(false)} />
            )}
        </div>
    );
};

export default Home;
