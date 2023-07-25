import React, { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../context/redux/store'
import SidebarMenu from '../layout/sidebarMenu/sidebarMenu'
import MusicPlayer from '../layout/musicPlayer/musicPlayer'
import LogoutButton from '../components/ui/logoutButton/logoutButton'
import musicPlayerBackend from '../lib/axiosConfig'

const code = new URLSearchParams(window.location.search).get('code')
if (code) {
    musicPlayerBackend.post('/api/code', { code: code })
}
const PrivateRoutes = () => {
    const isLogged = useAppSelector((state) => state.auth.isLoggedIn)
    return isLogged ? (
        <Fragment>
            <SidebarMenu />
            <LogoutButton />
            <Outlet />
            <MusicPlayer />
        </Fragment>
    ) : (
        <Navigate to={'/login'} />
    )
}

export default PrivateRoutes
