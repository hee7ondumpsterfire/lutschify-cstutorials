import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
    const location = useLocation();
    const { isAdmin } = useAuth();

    return (
        <div className="app-layout">
            <header className="main-header glass-panel">
                <div className="container header-content">
                    <Link to="/" className="brand">
                        <img src="/favicon.png" alt="lutsch1fy" className="brand-icon" style={{ height: '32px', width: '32px', marginRight: '0.5rem' }} />
                        lutsch1fy
                    </Link>

                    <nav className="main-nav">
                        <Link
                            to="/"
                            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/training"
                            className={`nav-link ${location.pathname.startsWith('/training') ? 'active' : ''}`}
                        >
                            Training
                        </Link>
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
                            >
                                Admin
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
