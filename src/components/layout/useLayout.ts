import useAuth from '../../customHooks/useAuth'
import { useEffect, useState } from 'react'
import spotifyApi from '../../shared/spotifyApi'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import TrackObjectFull = SpotifyApi.TrackObjectFull
import ListOfUsersPlaylistsResponse = SpotifyApi.ListOfUsersPlaylistsResponse

const useLayout = () => {
	const spotify = useAuth()
	const { accessToken } = spotify

	const [search, setSearch] = useState('')
	const [searchResult, setSearchResult] = useState<TrackObjectFull[]>([])
	const [artists, setArtists] = useState<ArtistObjectFull[]>()
	const [playlists, setPlayLists] = useState<ListOfUsersPlaylistsResponse>()

	useEffect(() => {
		if (!search) return setSearchResult([])
		if (!accessToken) return

		if (accessToken) {
			spotifyApi.setAccessToken(accessToken)
			spotifyApi.searchTracks(search).then((res) => {
				if (res.body.tracks) {
					setSearchResult(res.body.tracks.items)
				}
			})
			spotifyApi.searchArtists(search).then((res) => {
				if (res.body.artists?.items) {
					setArtists(res.body.artists.items)
				}
			})
		}
	}, [search])
	useEffect(() => {
		if (accessToken) {
			spotifyApi.setAccessToken(spotify.accessToken)
			spotifyApi.getUserPlaylists().then((data) => {
				if (data.body) {
					setPlayLists(data.body)
				}
			})
		}
	}, [accessToken])

	return {
		setSearch,
		search,
		searchResult,
		artists,
		playlists,
	}
}
export default useLayout
