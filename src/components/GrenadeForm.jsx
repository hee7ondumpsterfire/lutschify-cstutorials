import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { maps } from '../data/maps';
import './GrenadeForm.css';

const GrenadeForm = ({ isPublic = false }) => {
    const { addTutorial, updateTutorial, tutorials } = useData();
    const { mapId: paramMapId, grenadeId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Derived state from location or params
    const isEdit = !!grenadeId;
    const initialCoords = location.state?.coords || { x: 50, y: 50 };
    const initialType = location.state?.type || 'smoke';

    const [formData, setFormData] = useState({
        mapId: paramMapId || maps[0].id,
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

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [error, setError] = useState('');

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

    const validateUrl = (url) => {
        if (!url) return true; // Optional field
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'https:';
        } catch (e) {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.videoUrl && !validateUrl(formData.videoUrl)) {
            setError('Please provide a valid HTTPS video URL.');
            return;
        }

        if (formData.lineupImage && !validateUrl(formData.lineupImage)) {
            setError('Please provide a valid HTTPS image URL.');
            return;
        }

        const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);

        const payload = {
            ...formData,
            title: formData.title.substring(0, 100), // Basic length limit
            description: formData.description.substring(0, 500),
            mapId: formData.mapId,
            type: formData.type,
            tags: tagsArray,
            status: isPublic ? 'pending' : 'approved'
        };

        if (isEdit) {
            updateTutorial(grenadeId, payload);
            navigate(-1);
        } else {
            addTutorial({ ...payload, id: crypto.randomUUID() });
            if (isPublic) {
                setIsSubmitted(true);
            } else {
                navigate(-1);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isSubmitted) {
        return (
            <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
                <div className="glass-panel" style={{ padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h2>Thank you for your submission!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Your grenade lineup has been received and is currently in the review queue.
                        Once an admin approves it, it will be visible to everyone.
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>{isPublic ? 'Submit Community Nade' : (isEdit ? 'Edit Grenade' : 'Add New Grenade')}</h2>
                    <button onClick={() => navigate(-1)} className="btn btn-outline">Cancel</button>
                </div>

                {isPublic && (
                    <div className="alert-info" style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(var(--accent-primary-rgb), 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>
                            <strong>Note:</strong> All submissions are reviewed by an admin before being published.
                            Please ensure your video/image links are correct.
                        </p>
                    </div>
                )}

                {error && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grenade-form">
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Map</label>
                            <select name="mapId" value={formData.mapId} onChange={handleChange} disabled={!!paramMapId && !isPublic}>
                                {maps.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Title</label>
                            <input name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Mirage Window Smoke from T-Roof" />
                        </div>
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
                        <div className="form-group">
                            <label>Difficulty</label>
                            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Stand Position</label>
                            <input name="standPosition" value={formData.standPosition} onChange={handleChange} required placeholder="Where to stand" />
                        </div>
                        <div className="form-group">
                            <label>Aim Point</label>
                            <input name="aimPoint" value={formData.aimPoint} onChange={handleChange} required placeholder="Where to aim" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>YouTube Embed URL</label>
                        <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://www.youtube.com/embed/..." />
                        <small style={{ opacity: 0.6 }}>Right click video on YT - Copy embed code - take only the 'src' value</small>
                    </div>

                    <div className="form-group">
                        <label>Lineup Image URL (Optional)</label>
                        <input name="lineupImage" value={formData.lineupImage} onChange={handleChange} placeholder="https://imgur.com/..." />
                    </div>

                    <div className="form-group">
                        <label>Tags (comma separated)</label>
                        <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Jumpthrow, Essential, Instant..." />
                    </div>

                    {!isPublic && (
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
                        </div>
                    )}

                    <div className="form-group">
                        <label>Instructions / Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Step-by-step instructions..."></textarea>
                    </div>

                    <div className="form-actions" style={{ marginTop: '2rem' }}>
                        <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 3rem' }}>
                            {isPublic ? 'Submit for Review' : (isEdit ? 'Update Grenade' : 'Save Grenade')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GrenadeForm;
