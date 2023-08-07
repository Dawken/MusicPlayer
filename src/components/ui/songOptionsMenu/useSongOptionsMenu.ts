import { useLocation } from 'react-router-dom'
import spotifyApi from '../../../services/spotifyApi'
import { toast } from 'react-toastify'
import addSongToPlaylist from '../../../utils/functions/addSongToPlaylist'
import { setActionTrackUri } from '../../../context/redux/user'
import { useDispatch } from 'react-redux'

const useSongOptionsMenu = () => {
    const id = useLocation()

    const path = id.pathname.split('/')[1]

    const dispatch = useDispatch()
    const deleteSongFromPlaylist = (
        playlist: string | undefined,
        trackUri: string
    ) => {
        if (playlist) {
            spotifyApi
                .removeTracksFromPlaylist(playlist, [{ uri: trackUri }])
                .then(() => {
                    toast('Song has been removed from playlist')
                })
                .then(() => {
                    dispatch(setActionTrackUri({ actionTrackUri: trackUri }))
                })
                .catch(() => {
                    toast.error("Can't remove song from playlist!")
                })
        }
    }
    return {
        path,
        addSongToPlaylist,
        deleteSongFromPlaylist,
    }
}
export default useSongOptionsMenu
