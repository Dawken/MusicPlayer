import { useState } from 'react'
import spotifyApi from '../../../../services/spotifyApi'
import { toast } from 'react-toastify'
import SpotifyApi from 'spotify-web-api-node'
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse

type PlaylistType = {
    playlist: SinglePlaylistResponse
}

const usePopupModifyPlaylist = ({ playlist }: PlaylistType) => {
    const [playlistName, setPlaylistName] = useState(playlist.name)

    const [playlistDescription, setPlaylistDescription] = useState(
        playlist.description
    )
    const updatePlaylist = () => {
        spotifyApi
            .changePlaylistDetails(playlist.id, {
                name: playlistName,
                description: playlistDescription || undefined,
            })
            .then(() => {
                toast.success('Playlist data has been updated')
            })
            .catch(() => {
                toast.error('Error, try again later')
            })
    }
    return {
        playlistName,
        setPlaylistName,
        playlistDescription,
        setPlaylistDescription,
        updatePlaylist,
    }
}
export default usePopupModifyPlaylist
