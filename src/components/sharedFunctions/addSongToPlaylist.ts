import spotifyApi from '../../shared/spotifyApi'
import { toast } from 'react-toastify'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified

const addSongToPlaylist = (
	playlist: PlaylistObjectSimplified,
	trackUri: [string]
) => {
	spotifyApi
		.addTracksToPlaylist(playlist.id, trackUri)
		.then(() => {
			toast(`Song has been added to playlist ${playlist.name}`)
		})
		.catch(() => {
			toast.error("Can't add song to playlist!")
		})
}
export default addSongToPlaylist
