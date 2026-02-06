import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { maps } from '../data/maps';
import './GrenadeForm.css'; // Reusing form styles

const GuideForm = ({ onClose }) => {
    const { addGuide } = useData();
    const [mapId, setMapId] = useState(maps[0].id);
    const [title, setTitle] = useState('');
    const [sections, setSections] = useState([{ heading: '', content: '', image: '' }]);

    const handleSectionChange = (index, field, value) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    };

    const addSection = () => {
        setSections([...sections, { heading: '', content: '', image: '' }]);
    };

    const removeSection = (index) => {
        if (sections.length > 1) {
            setSections(sections.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const guideData = {
            mapId,
            title: title || `${maps.find(m => m.id === mapId)?.name} Guide`,
            author: 'Admin',
            lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            sections
        };
        addGuide(guideData);
        onClose();
        alert('Guide saved successfully!');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content form-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Create/Edit Strategy Guide</h2>

                <form onSubmit={handleSubmit} className="grenade-form">
                    <div className="form-group">
                        <label>Select Map</label>
                        <select value={mapId} onChange={e => setMapId(e.target.value)}>
                            {maps.filter(m => m.active).map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Guide Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder={`${maps.find(m => m.id === mapId)?.name} Map Guide`}
                        />
                    </div>

                    <div className="sections-container" style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Sections</h4>
                        {sections.map((section, idx) => (
                            <div key={idx} className="section-block" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <label>Section {idx + 1}</label>
                                    {sections.length > 1 && <button type="button" onClick={() => removeSection(idx)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>}
                                </div>

                                <div className="form-group">
                                    <input
                                        placeholder="Heading (e.g. Mid Control)"
                                        value={section.heading}
                                        onChange={e => handleSectionChange(idx, 'heading', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        placeholder="Content..."
                                        value={section.content}
                                        onChange={e => handleSectionChange(idx, 'content', e.target.value)}
                                        rows="3"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        placeholder="Optional Image URL"
                                        value={section.image}
                                        onChange={e => handleSectionChange(idx, 'image', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addSection} className="btn btn-outline" style={{ width: '100%' }}>+ Add Section</button>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Guide</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GuideForm;
