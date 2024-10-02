import React, { createContext, useState, useEffect } from 'react';
const AuthContext = createContext();
import {isLoggedIn} from '../Middlewares/isLoggedIn';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        const authStatus = await isLoggedIn();
        setIsAuthenticated(authStatus);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;