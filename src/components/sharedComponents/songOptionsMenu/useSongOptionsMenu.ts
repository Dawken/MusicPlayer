import { useLocation } from 'react-router-dom'
import spotifyApi from '../../../shared/spotifyApi'
import { toast } from 'react-toastify'
import addSongToPlaylist from '../../sharedFunctions/addSongToPlaylist'
import { store } from '../../../redux/store'
import { setActionTrackUri } from '../../../redux/user'

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
