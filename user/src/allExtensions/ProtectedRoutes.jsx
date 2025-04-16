import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Cookies from 'universal-cookie';

const ProtectedRoutes = () => {
    const cookies = new Cookies();
    let token = ''

    if (cookies.get('token') !== undefined || null) {
        token = true

    } else token = false

    return token ? <Outlet /> : <Navigate to="/"
        state={{ start: true }} />;
};
export default ProtectedRoutes;






