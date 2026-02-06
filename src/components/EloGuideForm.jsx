import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

const EloGuideForm = ({ eloGuide, onClose }) => {
    const { updateEloGuide } = useData();
    const [formData, setFormData] = useState({ ...eloGuide });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEloGuide(formData);
        onClose();
        alert('ELO Guide updated successfully!');
    };

    const handleSkillChange = (idx, field, value) => {
        const newSkills = [...formData.skills];
        newSkills[idx] = { ...newSkills[idx], [field]: value };
        setFormData({ ...formData, skills: newSkills });
    };

    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, { category: 'New Category', description: 'Description here' }]
        });
    };

    const removeSkill = (idx) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((_, i) => i !== idx)
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: '700px', width: '90%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0 }}>Edit ELO Guide: {formData.range}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="guide-form">
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Range Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label>Accent Color (Hex)</label>
                        <input
                            type="color"
                            value={formData.color}
                            onChange={e => setFormData({ ...formData, color: e.target.value })}
                            style={{ height: '40px', padding: '2px' }}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                            Necessary Skills
                            <button type="button" onClick={addSkill} className="btn btn-outline" style={{ padding: '2px 8px', fontSize: '0.8rem' }}>+ Add Skill</button>
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                            {formData.skills.map((skill, idx) => (
                                <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', position: 'relative' }}>
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(idx)}
                                        style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}
                                    >
                                        ×
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Category"
                                        value={skill.category}
                                        onChange={e => handleSkillChange(idx, 'category', e.target.value)}
                                        style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={skill.description}
                                        onChange={e => handleSkillChange(idx, 'description', e.target.value)}
                                        rows="2"
                                    ></textarea>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label>Pro Advice</label>
                        <textarea
                            value={formData.advice}
                            onChange={e => setFormData({ ...formData, advice: e.target.value })}
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
                        <button type="button" onClick={onClose} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EloGuideForm;
