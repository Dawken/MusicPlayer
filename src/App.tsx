import React from 'react';
import Login from './components/subPages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './components/utils/privateRoutes';
import Layout from './components/layout/layout';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path='/' element={<Layout />} />
				</Route>
				<Route path='/login' element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
