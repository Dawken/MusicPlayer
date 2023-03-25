import React from 'react';
import { useOutletContext } from 'react-router-dom';
import useAuth from '../../customHooks/useAuth';

const Layout = () => {
	const code = useOutletContext();
	const accessToken = useAuth();
	return <>{code}</>;
};
export default Layout;
