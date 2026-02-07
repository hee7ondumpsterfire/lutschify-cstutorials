import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import ModuleEditForm from '../components/ModuleEditForm';
import './Tactics.css';

const Tactics = () => {
    const { tacticsModules, addTacticsModule, updateTacticsModule, deleteTacticsModule } = useData();
    const { isAdmin } = useAuth();
    const [editingModule, setEditingModule] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const emptyModule = {
        title: '',
        description: '',
        difficulty: 'Intermediate',
        icon: '⚔️',
        details: ['']
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteTacticsModule(id);
        }
    };

    return (
        <div className="container tactics-page">
            <header className="tactics-hero glass-panel">
                <div className="hero-content">
                    <span className="hero-badge">Strategic Hub</span>
                    <h1>Tactical Excellence</h1>
                    <p>Winning in CS2 isn't just about aim—it's about outsmarting your opponents. Learn the essential strategies, site executes, and mid-round calls to lead your team to victory.</p>
                </div>
                <div className="hero-visual" style={{ textAlign: 'right' }}>
                    <div className="visual-circle"></div>
                    <span className="visual-icon">⚔️</span>
                    {isAdmin && (
                        <button
                            className="btn btn-primary"
                            style={{ position: 'absolute', bottom: '-20px', right: '0', fontSize: '0.9rem', backgroundColor: '#3b82f6', color: '#fff' }}
                            onClick={() => setIsCreating(true)}
                        >
                            + Create Module
                        </button>
                    )}
                </div>
            </header>

            <section className="tactics-grid">
                {tacticsModules && tacticsModules.map((module) => (
                    <div key={module.id} className="tactics-card glass-panel">
                        <div className="card-header">
                            <span className="module-icon">{module.icon}</span>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span className={`difficulty-tag ${module.difficulty.toLowerCase()}`}>{module.difficulty}</span>
                                {isAdmin && (
                                    <>
                                        <button
                                            onClick={() => setEditingModule(module)}
                                            className="edit-pill"
                                            title="Edit"
                                        >
                                            ✎
                                        </button>
                                        <button
                                            onClick={() => handleDelete(module.id, module.title)}
                                            className="edit-pill"
                                            style={{ color: '#ef4444' }}
                                            title="Delete"
                                        >
                                            ×
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <h3>{module.title}</h3>
                        <p className="description">{module.description}</p>
                        <ul className="details-list">
                            {module.details.map((detail, i) => (
                                <li key={i}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            <footer className="tactics-footer glass-panel">
                <div className="footer-info">
                    <h3>The Commander's Mindset</h3>
                    <p>"A plan is only as good as the team that executes it." — Anonymous IGL.</p>
                </div>
                <div className="footer-action">
                    <p>Want to see team set-pieces?</p>
                    <button className="btn btn-primary" onClick={() => alert('Strategy breakdowns coming soon!')}>View Plays</button>
                </div>
            </footer>

            {editingModule && (
                <ModuleEditForm
                    module={editingModule}
                    type="Tactics"
                    onClose={() => setEditingModule(null)}
                    onSave={(updated) => updateTacticsModule(updated)}
                />
            )}

            {isCreating && (
                <ModuleEditForm
                    module={emptyModule}
                    type="Tactics"
                    onClose={() => setIsCreating(false)}
                    onSave={(newMod) => addTacticsModule(newMod)}
                />
            )}
        </div>
    );
};

export default Tactics;
