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
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Artist from './components/subPages/artist/artist'
import Playlist from './components/subPages/playlist/playlist'
import Album from './components/subPages/album/album'

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
						<Route path='/artist/:id' element={<Artist />} />
						<Route path='/playlist/:id' element={<Playlist />} />
						<Route path='/album/:id' element={<Album />} />
					</Route>
					<Route path='/login' element={<Login />} />
				</Routes>
				<MusicPlayer />
				<ToastContainer
					position='top-center'
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='dark'
				/>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
