import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const session = localStorage.getItem('aura_admin_session');
        if (session === 'true') {
            setIsAdmin(true);
        }
        setIsLoading(false);
    }, []);

    const login = (password) => {
        // Use environment variable for the admin password
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (password === adminPassword && adminPassword) {
            setIsAdmin(true);
            localStorage.setItem('aura_admin_session', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        localStorage.removeItem('aura_admin_session');
    };

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
