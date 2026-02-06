import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-container">
                <div className="hero-content">
                    <div className="hero-badge">Alphakek v.01337</div>
                    <h1>
                        lutsch1fy
                    </h1>
                    <p className="hero-subtitle">
                        "can you check the window smoke bro?"
                    </p>
                    <div className="hero-actions">
                        <Link to="/training" className="btn btn-primary">
                            Start Training
                        </Link>
                        <a href="#" className="btn btn-outline">
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-card glass-panel">
                        <div className="card-inner">
                            {/* Abstract visual or placeholder for now */}
                            <div className="floating-icon icon-smoke">☁️</div>
                            <div className="floating-icon icon-flash">⚡</div>
                            <div className="floating-icon icon-nade">💣</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero-bg-glow"></div>
        </section>
    );
};

export default Hero;
