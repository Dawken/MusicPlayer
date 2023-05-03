import { useLocation } from 'react-router-dom'
import spotifyApi from '../../../shared/spotifyApi'
import { toast } from 'react-toastify'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified

const useSongOptionsMenu = () => {
	const id = useLocation()

	const path = id.pathname.split('/')[1]

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
