import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import './Layout.css';

const Layout = () => {
    const location = useLocation();
    const { isAdmin } = useAuth();
    const { tutorials } = useData();

    const pendingCount = (tutorials || []).filter(t => t.status === 'pending').length;

    return (
        <div className="app-layout">
            <header className="main-header glass-panel">
                <div className="container header-content">
                    <Link to="/" className="brand">
                        <img src="/favicon.png" alt="lutsch1fy" className="brand-icon" />
                        lutsch1fy
                    </Link>

                    <nav className="main-nav">
                        <Link
                            to="/"
                            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            Home
                        </Link>

                        <div className="nav-dropdown">
                            <button className={`nav-link dropdown-trigger ${(location.pathname.startsWith('/training') || location.pathname.startsWith('/sprays') || location.pathname.startsWith('/guides') || location.pathname.startsWith('/tactics') || location.pathname.startsWith('/movement')) ? 'active' : ''}`}>
                                Training <span className="dropdown-arrow">▾</span>
                            </button>
                            <div className="dropdown-menu glass-panel">
                                <Link to="/training" className="dropdown-item">Grenades</Link>
                                <Link to="/sprays" className="dropdown-item">Recoil</Link>
                                <Link to="/guides" className="dropdown-item">Guides</Link>
                                <Link to="/tactics" className="dropdown-item">Tactics</Link>
                                <Link to="/movement" className="dropdown-item">Movement</Link>
                            </div>
                        </div>

                        <Link
                            to="/become-pro"
                            className={`nav-link ${location.pathname.startsWith('/become-pro') ? 'active' : ''}`}
                        >
                            Become Pro
                        </Link>
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
                                style={{ position: 'relative' }}
                            >
                                Admin
                                {pendingCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-8px',
                                        background: '#ef4444',
                                        color: '#fff',
                                        fontSize: '0.65rem',
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        border: '2px solid var(--bg-dark)'
                                    }}>
                                        {pendingCount}
                                    </span>
                                )}
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="main-footer">
                <div className="container">
                    <p>
                        &copy; {new Date().getFullYear()} lutsch1fy. Build for gaylords.
                        {!isAdmin && <Link to="/admin" style={{ marginLeft: '1rem', opacity: 0.3, textDecoration: 'none', color: 'inherit' }}>Admin</Link>}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
