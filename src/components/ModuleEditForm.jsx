import React, { useState } from 'react';

const ModuleEditForm = ({ module, type, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...module });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const handleDetailChange = (idx, value) => {
        const newDetails = [...formData.details];
        newDetails[idx] = value;
        setFormData({ ...formData, details: newDetails });
    };

    const addDetail = () => {
        setFormData({
            ...formData,
            details: [...formData.details, '']
        });
    };

    const removeDetail = (idx) => {
        setFormData({
            ...formData,
            details: formData.details.filter((_, i) => i !== idx)
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', width: '95%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0 }}>Edit {type} Module</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="guide-form">
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: '0 0 80px' }}>
                            <label>Icon</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                placeholder="🚀"
                                style={{ textAlign: 'center', fontSize: '1.5rem' }}
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Difficulty</label>
                        <select
                            value={formData.difficulty}
                            onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                        >
                            <option>Essential</option>
                            <option>Practical</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows="2"
                            required
                        ></textarea>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Key Points / Details
                            <button type="button" onClick={addDetail} className="btn btn-outline" style={{ padding: '2px 8px', fontSize: '0.8rem' }}>+ Add Point</button>
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                            {formData.details.map((detail, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={detail}
                                        onChange={e => handleDetailChange(idx, e.target.value)}
                                        placeholder="Enter key point..."
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeDetail(idx)}
                                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem', padding: '0 5px' }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Module</button>
                        <button type="button" onClick={onClose} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModuleEditForm;
