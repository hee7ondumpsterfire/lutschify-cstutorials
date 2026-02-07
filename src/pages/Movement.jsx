import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import ModuleEditForm from '../components/ModuleEditForm';
import './Movement.css';

const Movement = () => {
    const { movementModules, addMovementModule, updateMovementModule, deleteMovementModule } = useData();
    const { isAdmin } = useAuth();
    const [editingModule, setEditingModule] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const emptyModule = {
        title: '',
        description: '',
        difficulty: 'Essential',
        icon: '🏃‍♂️',
        details: ['']
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            deleteMovementModule(id);
        }
    };

    return (
        <div className="container movement-page">
            <header className="movement-hero glass-panel">
                <div className="hero-content">
                    <span className="hero-badge">Mechanics Hub</span>
                    <h1>The Art of Movement</h1>
                    <p>Mastering the movement system in CS2 is what separates the average players from the elite. Movement isn't just about speed—it's about precision, timing, and positioning.</p>
                </div>
                <div className="hero-visual" style={{ textAlign: 'right' }}>
                    <div className="visual-circle"></div>
                    <span className="visual-icon">🏃‍♂️</span>
                    {isAdmin && (
                        <button
                            className="btn btn-primary"
                            style={{ position: 'absolute', bottom: '-20px', right: '0', fontSize: '0.9rem' }}
                            onClick={() => setIsCreating(true)}
                        >
                            + Create Module
                        </button>
                    )}
                </div>
            </header>

            <section className="movement-grid">
                {movementModules.map((module) => (
                    <div key={module.id} className="movement-card glass-panel">
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

            <footer className="movement-footer glass-panel">
                <div className="footer-info">
                    <h3>The Golden Rule</h3>
                    <p>"If you are still moving, your bullets are still flying." — Every CS pro ever.</p>
                </div>
                <div className="footer-action">
                    <p>Want to see these jumps in action?</p>
                    <button className="btn btn-primary" onClick={() => alert('Video tutorials coming soon!')}>Watch Pro Drills</button>
                </div>
            </footer>

            {editingModule && (
                <ModuleEditForm
                    module={editingModule}
                    type="Movement"
                    onClose={() => setEditingModule(null)}
                    onSave={(updated) => updateMovementModule(updated)}
                />
            )}

            {isCreating && (
                <ModuleEditForm
                    module={emptyModule}
                    type="Movement"
                    onClose={() => setIsCreating(false)}
                    onSave={(newMod) => addMovementModule(newMod)}
                />
            )}
        </div>
    );
};

export default Movement;
