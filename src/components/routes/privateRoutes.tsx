import React, { Fragment } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../context/redux/store'
import SidebarMenu from '../../layout/sidebarMenu/sidebarMenu'
import MusicPlayer from '../../layout/musicPlayer/musicPlayer'
import LogoutButton from '../ui/logoutButton/logoutButton'
import musicPlayerBackend from '../../lib/axiosConfig'
import { getClientResponse } from '../../context/redux/user'
import { useDispatch } from 'react-redux'

const PrivateRoutes = () => {
    const isLogged = useAppSelector((state) => state.auth.isLoggedIn)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
        musicPlayerBackend.post('/api/code', { code: code }).then(() => {
            musicPlayerBackend.post('/api/login').then(() => {
                dispatch(getClientResponse({ isLogged: true }))
                navigate('/')
            })
        })
    }

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
