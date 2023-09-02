import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/routes/privateRoutes'
import Home from './pages/home/home'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.scss'
import Playlists from './pages/playlists/playlists'
import Track from './pages/track/track'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Artist from './pages/artist/artist'
import Playlist from './pages/playlist/playlist'
import Album from './pages/album/album'
import Login from './pages/login/login'
import PageNotFound from './pages/errorPages/pageNotFound/pageNotFound'
import { createTheme, ThemeProvider } from '@mui/material'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<PrivateRoutes />}>
                            <Route path='/' element={<Home />} />
                            <Route path='/playlists' element={<Playlists />} />
                            <Route path='/track/:id' element={<Track />} />
                            <Route path='/artist/:id' element={<Artist />} />
                            <Route
                                path='/playlist/:id'
                                element={<Playlist />}
                            />
                            <Route path='/album/:id' element={<Album />} />
                            <Route path='*' element={<PageNotFound />} />
                        </Route>
                        <Route path='/login' element={<Login />} />
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
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
