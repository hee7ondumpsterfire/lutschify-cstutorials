import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const { login, isAdmin, logout } = useAuth();
    const { tutorials } = useData();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const pendingCount = (tutorials || []).filter(t => t.status === 'pending').length;

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(password);
        if (success) {
            navigate('/training');
        } else {
            setError(true);
        }
    };

    if (isAdmin) {
        return (
            <div className="container admin-container">
                <h1>Admin Dashboard</h1>
                <p>You are logged in as Admin.</p>
                <div className="admin-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/admin/review')} style={{ position: 'relative' }}>
                        Review Queue
                        {pendingCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                background: '#ef4444',
                                color: 'white',
                                borderRadius: '50%',
                                width: '22px',
                                height: '22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                border: '2px solid var(--bg-dark)'
                            }}>
                                {pendingCount}
                            </span>
                        )}
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/training')}>Manage Grenades</button>
                    <button className="btn btn-outline" onClick={logout}>Logout</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container admin-container">
            <div className="login-card glass-panel">
                <h1>Admin Access</h1>
                <p>Enter password to manage content.</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="password"
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                        }}
                        className="admin-input"
                    />
                    {error && <div className="error-msg">Incorrect password</div>}
                    <button type="submit" className="btn btn-primary full-width">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Admin;
