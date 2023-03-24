import React from 'react';
import Login from './components/subPages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './components/utils/privateRoutes';
import Wrapper from './components/wrapper/wrapper';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path='/' element={<Wrapper />} />
				</Route>
				<Route path='/login' element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
