import React from 'react';
import './GrenadeFilter.css';
import { grenadeTypes } from '../data/grenades';

const GrenadeFilter = ({ selectedType, onSelect }) => {
    return (
        <div className="grenade-filter">
            {grenadeTypes.map((type) => (
                <button
                    key={type.id}
                    className={`filter-btn ${selectedType === type.id ? 'active' : ''}`}
                    onClick={() => onSelect(type.id)}
                >
                    <span className="filter-icon">{type.icon}</span>
                    <span className="filter-label">{type.label}</span>
                </button>
            ))}
        </div>
    );
};

export default GrenadeFilter;
