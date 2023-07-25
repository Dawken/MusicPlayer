import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/utils/privateRoutes'
import Layout from './components/layout/layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.scss'
import Playlists from './components/subPages/playlists/playlists'
import Track from './components/subPages/track/track'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Artist from './components/subPages/artist/artist'
import Playlist from './components/subPages/playlist/playlist'
import Album from './components/subPages/album/album'
import LandingPage from './components/subPages/landingPage/landingPage'
import PageNotFound from './components/errorSubpages/pageNotFound/pageNotFound'

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
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path='/' element={<Layout />} />
                        <Route path='/playlists' element={<Playlists />} />
                        <Route path='/track/:id' element={<Track />} />
                        <Route path='/artist/:id' element={<Artist />} />
                        <Route path='/playlist/:id' element={<Playlist />} />
                        <Route path='/album/:id' element={<Album />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Route>
                    <Route path='/login' element={<LandingPage />} />
                </Routes>
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
