import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import SpotifyApi from 'spotify-web-api-node'
import ListOfUsersPlaylistsResponse = SpotifyApi.ListOfUsersPlaylistsResponse
import useAuth from '../../../customHooks/useAuth'

const usePlaylists = () => {
	const [playlists, setPlayLists] = useState<ListOfUsersPlaylistsResponse>()

	const spotify = useAuth()

	useEffect(() => {
		if (spotify.accessToken) spotifyApi.setAccessToken(spotify.accessToken)
		spotifyApi.getUserPlaylists().then((data) => {
			if (data.body) {
				setPlayLists(data.body)
			}
		})
	}, [spotify.accessToken])
	return {
		playlists,
	}
}
export default usePlaylists
