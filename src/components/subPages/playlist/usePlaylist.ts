import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import { useParams } from 'react-router-dom'
import SpotifyApi from 'spotify-web-api-node'
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse
import useAuth from '../../../customHooks/useAuth'
import getColorFromImage from '../../sharedFunctions/getColorFromImage'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject

const usePlaylist = () => {
	const [imageColor, setImageColor] = useState('#424242')
	const [playlist, setPlaylist] = useState<SinglePlaylistResponse>()
	const [playlistSongs, setPlaylistSongs] = useState<PlaylistTrackObject[]>()

	const { id } = useParams()

	const spotify = useAuth()
	useEffect(() => {
		if (spotify.accessToken && id) {
			spotifyApi.setAccessToken(spotify.accessToken)
			spotifyApi.getPlaylist(id).then((data) => {
				setPlaylist(data.body)
				if (data.body.images[0]) {
					getColorFromImage(
						data.body.images[0].url,
						(color: string) => {
							setImageColor(color)
						}
					)
				}
			})
			spotifyApi
				.getPlaylistTracks(id)
				.then((data) => setPlaylistSongs(data.body.items))
		}
	}, [id, spotify.accessToken])

	return {
		imageColor,
		playlist,
		playlistSongs,
	}
}
export default usePlaylist
