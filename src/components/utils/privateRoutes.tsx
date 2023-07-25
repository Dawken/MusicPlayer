import React, { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'
import SidebarMenu from '../sharedComponents/sidebarMenu/sidebarMenu'
import MusicPlayer from '../sharedComponents/musicPlayer/musicPlayer'
import LogoutButton from '../sharedComponents/logoutButton/logoutButton'
import musicPlayerBackend from '../../config/axiosConfig'

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
