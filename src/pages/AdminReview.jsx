import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { maps } from '../data/maps';

const AdminReview = () => {
    const { tutorials, approveTutorial, deleteTutorial } = useData();
    const { isAdmin } = useAuth();

    const pendingNades = useMemo(() => {
        return (tutorials || []).filter(t => t.status === 'pending');
    }, [tutorials]);

    if (!isAdmin) {
        return <Navigate to="/admin" />;
    }

    const getMapName = (mapId) => {
        return maps.find(m => m.id === mapId)?.name || mapId;
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Review Queue</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {pendingNades.length} submissions waiting for approval
                    </p>
                </div>
                <Link to="/admin" className="btn btn-outline">Back to Panel</Link>
            </header>

            {pendingNades.length > 0 ? (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {pendingNades.map(nade => (
                        <div key={nade.id} className="glass-panel" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontWeight: 'bold' }}>
                                        {getMapName(nade.mapId)}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'var(--accent-primary)', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}>
                                        {nade.type.toUpperCase()}
                                    </span>
                                </div>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{nade.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                    {nade.description || "No description provided."}
                                </p>
                                <div style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                                    <strong>Position:</strong> {nade.standPosition} | <strong>Aim:</strong> {nade.aimPoint}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <a href={nade.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
                                    View Link
                                </a>
                                <Link to={`/admin/grenade/edit/${nade.id}`} className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => approveTutorial(nade.id)}
                                    className="btn btn-primary"
                                    style={{ fontSize: '0.9rem', backgroundColor: '#22c55e', color: '#fff' }}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Reject and delete this submission?')) {
                                            deleteTutorial(nade.id);
                                        }
                                    }}
                                    className="btn btn-outline"
                                    style={{ fontSize: '0.9rem', borderColor: '#ef4444', color: '#ef4444' }}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☕</div>
                    <h2>The queue is empty!</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>All community submissions have been reviewed.</p>
                </div>
            )}
        </div>
    );
};

export default AdminReview;
