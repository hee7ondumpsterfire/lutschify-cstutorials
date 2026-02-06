import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const { login, isAdmin, logout } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

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
                <div className="admin-actions">
                    <button className="btn btn-outline" onClick={logout}>Logout</button>
                    <button className="btn btn-primary" onClick={() => navigate('/training')}>Go to Training</button>
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
