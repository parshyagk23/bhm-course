import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("access_token");

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const decoded = jwtDecode(token);
            // exp is in seconds, Date.now() is in milliseconds
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (err) {
            return true;
        }
    };

    if (!token || isTokenExpired(token)) {
        // Clear everything to ensure a clean state


        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;