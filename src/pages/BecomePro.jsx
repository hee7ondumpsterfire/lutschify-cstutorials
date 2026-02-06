import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import EloGuideForm from '../components/EloGuideForm';
import './BecomePro.css';

const BecomePro = () => {
    const { eloGuides } = useData();
    const { isAdmin } = useAuth();
    const [selectedEloId, setSelectedEloId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Default to first guide when loaded
    useEffect(() => {
        if (eloGuides.length > 0 && !selectedEloId) {
            setSelectedEloId(eloGuides[0].id);
        }
    }, [eloGuides, selectedEloId]);

    const selectedElo = eloGuides.find(g => g.id === selectedEloId) || eloGuides[0] || { skills: [] };

    if (!eloGuides || eloGuides.length === 0) return null;

    return (
        <div className="container become-pro-page">
            <header className="pro-header glass-panel">
                <h1>Become Pro</h1>
                <p>Master the skills required to dominate your ELO bracket and climb the ranks.</p>
            </header>

            <div className="elo-navigator">
                {eloGuides.map((item) => (
                    <button
                        key={item.id}
                        className={`elo-tab ${selectedElo.id === item.id ? 'active' : ''}`}
                        style={{ '--elo-color': item.color }}
                        onClick={() => setSelectedEloId(item.id)}
                    >
                        <span className="tab-range">{item.range}</span>
                        <span className="tab-title">{item.title}</span>
                    </button>
                ))}
            </div>

            <main className="elo-content-area">
                <div className="elo-hero-panel glass-panel" style={{ borderLeft: `6px solid ${selectedElo.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="elo-badge" style={{ backgroundColor: selectedElo.color }}>
                            {selectedElo.range}
                        </div>
                        {isAdmin && (
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="btn btn-outline"
                                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                            >
                                ✎ Edit Tier
                            </button>
                        )}
                    </div>
                    <h2>{selectedElo.title}</h2>
                    <p className="elo-intro">Necessary skills for this ELO range:</p>

                    <div className="skills-grid">
                        {selectedElo.skills.map((skill, idx) => (
                            <div key={idx} className="skill-card">
                                <h3>{skill.category}</h3>
                                <p>{skill.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pro-advice-box">
                        <div className="advice-header">
                            <span className="advice-icon">💡</span>
                            <h3>Pro Advice</h3>
                        </div>
                        <p>{selectedElo.advice}</p>
                    </div>
                </div>

                <aside className="pro-cta-sidebar">
                    <div className="cta-box glass-panel">
                        <h3>Ready to climb?</h3>
                        <p>Practice your lineups and recoil management to secure more round wins.</p>
                        <div className="cta-links">
                            <a href="/training" className="btn btn-primary">Practice Nades</a>
                            <a href="/sprays" className="btn btn-outline" style={{ marginTop: '0.5rem' }}>Master Sprays</a>
                        </div>
                    </div>

                    <div className="elo-milestone glass-panel">
                        <h4>Next Milestone</h4>
                        {eloGuides.indexOf(selectedElo) < eloGuides.length - 1 ? (
                            <p>Unlock the secrets of <strong>{eloGuides[eloGuides.indexOf(selectedElo) + 1].range}</strong> ELO by mastering the current tier.</p>
                        ) : (
                            <p>You are at the top! Focus on consistency to maintain your legendary status.</p>
                        )}
                    </div>
                </aside>
            </main>

            {isEditModalOpen && (
                <EloGuideForm
                    eloGuide={selectedElo}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default BecomePro;
