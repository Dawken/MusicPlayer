import { useAppSelector } from '../../context/redux/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import spotifyApi from '../../services/spotifyApi'

const useSidebarMenu = () => {
    const playingSongPhoto = useAppSelector(
        (state) => state.auth.playingSongPhoto
    )
    const params = useLocation()
    const navigate = useNavigate()

    const { pathname } = params

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    const createPlaylist = () => {
        spotifyApi
            .createPlaylist('My playlist')
            .then((data) => navigate(`/playlist/${data.body.id}`))
    }

    window.addEventListener('resize', handleResize)

    return {
        playingSongPhoto,
        pathname,
        windowWidth,
        createPlaylist,
    }
}
export default useSidebarMenu
