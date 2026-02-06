import React from 'react';
import './MapPins.css';

const MapPins = ({ grenades, onPinClick }) => {
    if (!grenades) return null;

    return (
        <div className="map-pins-container">
            {grenades.map((grenade) => {
                if (!grenade.coords) return null;

                return (
                    <button
                        key={grenade.id}
                        className={`map-pin pin-${grenade.type}`}
                        style={{
                            left: `${grenade.coords.x}%`,
                            top: `${grenade.coords.y}%`
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onPinClick(grenade);
                        }}
                        title={grenade.title}
                    >
                        <span className="pin-icon">
                            {grenade.type === 'smoke' && '💨'}
                            {grenade.type === 'flash' && '⚡'}
                            {grenade.type === 'molotov' && '🔥'}
                            {grenade.type === 'he' && '💣'}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default MapPins;
