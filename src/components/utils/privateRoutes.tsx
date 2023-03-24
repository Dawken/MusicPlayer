import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../subPages/login';

const code = new URLSearchParams(window.location.search).get('code');

const PrivateRoutes = () => {
	return code ? <Outlet context={code} /> : <Login />;
};

export default PrivateRoutes;
