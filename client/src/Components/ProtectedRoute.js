import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('adminToken');
    
    // If not, redirect to login page
    if (!token) {
        return <Navigate to="/admin" replace />;
    }

    // Otherwise, render the requested component
    return children;
};

export default ProtectedRoute;
