import React from 'react'
import Login from './components/subPages/login/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/utils/privateRoutes'
import Layout from './components/layout/layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.scss'
import Playlists from './components/subPages/playlists/playlists'
import MusicPlayer from './components/sharedComponents/musicPlayer/musicPlayer'
import SidebarMenu from './components/sharedComponents/sidebarMenu/sidebarMenu'
import Track from './components/subPages/track/track'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<SidebarMenu />
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route path='/' element={<Layout />} />
						<Route path='/playlists' element={<Playlists />} />
						<Route path='/track/:id' element={<Track />} />
					</Route>
					<Route path='/login' element={<Login />} />
				</Routes>
				<MusicPlayer />
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
