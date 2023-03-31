import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

const code = new URLSearchParams(window.location.search).get('code');
if (code) localStorage.setItem('code', code);
const PrivateRoutes = () => {
	const isLogged = useAppSelector((state) => state.auth.isLoggedIn);
	return isLogged ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRoutes;
