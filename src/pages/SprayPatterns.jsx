import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { weapons } from '../data/weapons';
import SprayCanvas from '../components/SprayCanvas';
import './SprayPatterns.css';

const SprayPatterns = () => {
    const [selectedWeaponId, setSelectedWeaponId] = useState('ak47');
    const [isPlaying, setIsPlaying] = useState(false);
    const [mode, setMode] = useState('recoil'); // 'recoil' or 'control'

    const selectedWeapon = weapons.find(w => w.id === selectedWeaponId) || weapons[0];

    // Reset playback when weapon changes
    const handleWeaponSelect = (id) => {
        setSelectedWeaponId(id);
        setIsPlaying(false);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="container spray-page">
            <div className="spray-sidebar glass-panel">
                <h3>Weapons</h3>
                <div className="weapon-list">
                    {weapons.map(w => (
                        <button
                            key={w.id}
                            className={`weapon-btn ${w.id === selectedWeaponId ? 'active' : ''}`}
                            onClick={() => handleWeaponSelect(w.id)}
                        >
                            <span className="weapon-name">{w.name}</span>
                            <span className={`weapon-side-badge ${w.side.toLowerCase()}`}>{w.side}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="spray-main glass-panel">
                <div className="spray-header">
                    <div>
                        <h1>{selectedWeapon.name} Spray Pattern</h1>
                        <div className="spray-stats">
                            <span>RPM: <span className="highlight">{selectedWeapon.rpm}</span></span>
                            <span>Ammo: <span className="highlight">{selectedWeapon.magazine}</span></span>
                            <span>Damage: <span className="highlight">{selectedWeapon.damage}</span></span>
                        </div>
                    </div>

                    <div className="mode-toggles">
                        <button
                            className={`mode-btn ${mode === 'recoil' ? 'active' : ''}`}
                            onClick={() => { setMode('recoil'); setIsPlaying(false); }}
                        >
                            Bullet Impact
                        </button>
                        <button
                            className={`mode-btn ${mode === 'control' ? 'active' : ''}`}
                            onClick={() => { setMode('control'); setIsPlaying(false); }}
                        >
                            Mouse Control
                        </button>
                    </div>
                </div>

                <div className="canvas-wrapper">
                    <SprayCanvas
                        weapon={selectedWeapon}
                        isPlaying={isPlaying}
                        showCompensated={mode === 'control'}
                        onComplete={() => setIsPlaying(false)}
                    />

                    {mode === 'control' && (
                        <div className="mouse-hint">
                            <span className="mouse-icon">🖱️</span> This shows how you should move your mouse
                        </div>
                    )}
                </div>

                <div className="playback-controls">
                    <button className="play-btn" onClick={togglePlay}>
                        {isPlaying ? '⏸ Pause' : '▶ Play Animation'}
                    </button>
                    <p className="playback-hint">
                        {isPlaying ? 'Watching pattern...' : 'Click Play to see the spray animation'}
                    </p>
                </div>
            </div>

            <div className="info-panel glass-panel">
                <h3>How to Control Recoil</h3>
                <p>
                    Every weapon in CS2 has a fixed recoil pattern. To shoot accurately while spraying, you must move your mouse in the <strong>opposite direction</strong> of the bullet impacts.
                </p>
                <ul>
                    <li><strong>Bullet Impact:</strong> Where the bullets land on the wall.</li>
                    <li><strong>Mouse Control:</strong> How you need to pull your mouse to keep bullets in the center.</li>
                </ul>
                <p style={{ marginTop: '1rem', fontStyle: 'italic', opacity: 0.7 }}>
                    Note: Patterns shown are approximate standard 30-round sprays.
                </p>
            </div>
        </div>
    );
};

export default SprayPatterns;
