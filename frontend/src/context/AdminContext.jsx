import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.role === 'admin') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
                navigate('/login');
            }
            setLoading(false);
        };
        checkAdmin();
    }, [navigate]);

    return (
        <AdminContext.Provider value={{ isAdmin, loading }}>
            {!loading && children}
        </AdminContext.Provider>
    );
};
