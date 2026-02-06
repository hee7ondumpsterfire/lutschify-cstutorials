import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const session = localStorage.getItem('lutsch1fy_admin_session');
        if (session === 'true') {
            setIsAdmin(true);
        }
        setIsLoading(false);
    }, []);

    const login = (password) => {
        // Hardcoded password for demo purposes
        if (password === 'admin123' || password === 'lutsch') {
            setIsAdmin(true);
            localStorage.setItem('lutsch1fy_admin_session', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        localStorage.removeItem('lutsch1fy_admin_session');
    };

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
