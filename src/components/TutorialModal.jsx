import React from 'react';
import './TutorialModal.css';

const TutorialModal = ({ tutorial, onClose }) => {
    if (!tutorial) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <h2>{tutorial.title}</h2>
                    <div className="modal-badges">
                        <span className={`difficulty-badge ${tutorial.difficulty.toLowerCase()}`}>
                            {tutorial.difficulty}
                        </span>
                        <span className={`side-badge side-${tutorial.side.toLowerCase()}`}>
                            {tutorial.side}
                        </span>
                    </div>
                </div>

                <div className="video-container">
                    <iframe
                        src={tutorial.videoUrl}
                        title={tutorial.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="modal-details">
                    <h3>Instructions</h3>
                    <p>{tutorial.description}</p>

                    <div className="detail-grid">
                        <div className="detail-item">
                            <span className="label">Stand At:</span>
                            <span className="value">{tutorial.standPosition}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Aim At:</span>
                            <span className="value">{tutorial.aimPoint}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;
