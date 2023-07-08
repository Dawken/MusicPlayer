import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import SpotifyApi from 'spotify-web-api-node'
import ListOfUsersPlaylistsResponse = SpotifyApi.ListOfUsersPlaylistsResponse
import useAuth from '../../../customHooks/useAuth'
import { useNavigate } from 'react-router-dom'

const usePlaylists = () => {
	const navigate = useNavigate()

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

	const createPlaylist = () => {
		spotifyApi.createPlaylist('My playlist').then((data) => {
			navigate(`/playlist/${data.body.id}`)
		})
	}

	return {
		playlists,
		createPlaylist,
	}
}
export default usePlaylists
