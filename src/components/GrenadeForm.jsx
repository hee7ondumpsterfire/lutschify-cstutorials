import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './GrenadeForm.css';

const GrenadeForm = () => {
    const { addTutorial, updateTutorial, tutorials } = useData();
    const { mapId, grenadeId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Derived state from location or params
    const isEdit = !!grenadeId;
    const initialCoords = location.state?.coords || { x: 50, y: 50 };
    const initialType = location.state?.type || 'smoke';

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoUrl: '',
        lineupImage: '',
        standPosition: '',
        aimPoint: '',
        difficulty: 'Medium',
        side: 'T',
        tags: '',
        coords: initialCoords,
        type: initialType
    });

    useEffect(() => {
        if (isEdit && tutorials.length > 0) {
            const grenade = tutorials.find(t => t.id === grenadeId);
            if (grenade) {
                setFormData({
                    ...grenade,
                    tags: grenade.tags ? grenade.tags.join(', ') : '',
                    coords: grenade.coords || { x: 50, y: 50 }
                });
            }
        }
    }, [isEdit, grenadeId, tutorials]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);

        const payload = {
            ...formData,
            mapId: isEdit ? formData.mapId : mapId, // If edit, keep original mapId, else use param
            type: formData.type,
            tags: tagsArray
        };

        if (isEdit) {
            updateTutorial(grenadeId, payload);
        } else {
            addTutorial({ ...payload, id: crypto.randomUUID() });
        }
        navigate(-1); // Go back
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>{isEdit ? 'Edit Grenade' : 'Add New Grenade'}</h2>
                    <button onClick={() => navigate(-1)} className="btn btn-outline">Cancel</button>
                </div>

                <form onSubmit={handleSubmit} className="grenade-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Type</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="smoke">Smoke</option>
                                <option value="molotov">Molotov</option>
                                <option value="flash">Flash</option>
                                <option value="he">HE Grenade</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Side</label>
                            <select name="side" value={formData.side} onChange={handleChange}>
                                <option>T</option>
                                <option>CT</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Stand Position</label>
                            <input name="standPosition" value={formData.standPosition} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Aim Point</label>
                            <input name="aimPoint" value={formData.aimPoint} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Difficulty</label>
                        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Video URL (Embed)</label>
                        <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://www.youtube.com/embed/..." />
                        <small style={{ opacity: 0.6 }}>Use the embed URL format</small>
                    </div>

                    <div className="form-group">
                        <label>Lineup Image URL</label>
                        <input name="lineupImage" value={formData.lineupImage} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Tags (comma separated)</label>
                        <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Jumpthrow, Essential..." />
                    </div>

                    <div className="form-group">
                        <label>Coordinates (X%, Y%)</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="number"
                                value={formData.coords.x}
                                onChange={e => setFormData(prev => ({ ...prev, coords: { ...prev.coords, x: Number(e.target.value) } }))}
                            />
                            <input
                                type="number"
                                value={formData.coords.y}
                                onChange={e => setFormData(prev => ({ ...prev, coords: { ...prev.coords, y: Number(e.target.value) } }))}
                            />
                        </div>
                        <small style={{ opacity: 0.7 }}>Tip: Click the map in Map View to pre-fill specific coordinates!</small>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Grenade</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GrenadeForm;
