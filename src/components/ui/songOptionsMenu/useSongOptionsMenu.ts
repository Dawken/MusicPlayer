import { useLocation } from 'react-router-dom'
import spotifyApi from '../../../services/spotifyApi'
import { toast } from 'react-toastify'
import addSongToPlaylist from '../../../utils/addSongToPlaylist'
import { store } from '../../../context/redux/store'
import { setActionTrackUri } from '../../../context/redux/user'

const useSongOptionsMenu = () => {
    const id = useLocation()

    const path = id.pathname.split('/')[1]

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
                    store.dispatch(
                        setActionTrackUri({ actionTrackUri: trackUri })
                    )
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
