import React from 'react';
import './TutorialCard.css';

const TutorialCard = ({ tutorial, onClick, isFavorite, onToggleFavorite, isAdmin, onEdit, onDelete }) => {
    return (
        <div className="tutorial-card glass-panel" onClick={onClick}>
            {isAdmin && (
                <div className="admin-overlays">
                    <button
                        className="admin-btn edit-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(tutorial);
                        }}
                    >
                        ✏️
                    </button>
                    <button
                        className="admin-btn delete-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm('Delete this grenade?')) {
                                onDelete(tutorial.id);
                            }
                        }}
                    >
                        🗑️
                    </button>
                </div>
            )}
            <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(tutorial.id);
                }}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>
            <div className="tutorial-thumbnail">
                <img src={tutorial.lineupImage} alt={tutorial.title} loading="lazy" />
                <div className={`side-badge side-${tutorial.side.toLowerCase()}`}>
                    {tutorial.side}
                </div>
                <div className="type-icon-overlay">
                    {/* Could add icon based on type here */}
                </div>
            </div>
            <div className="tutorial-info">
                <h4>{tutorial.title}</h4>
                <div className="tutorial-meta">
                    <span className={`difficulty difficulty-${tutorial.difficulty.toLowerCase()}`}>
                        {tutorial.difficulty}
                    </span>
                    <span className="meta-separator">•</span>
                    <span className="meta-pos">{tutorial.standPosition}</span>
                </div>
            </div>
        </div>
    );
};

export default TutorialCard;
