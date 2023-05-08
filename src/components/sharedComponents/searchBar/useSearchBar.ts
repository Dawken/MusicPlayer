import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import useAuth from '../../../customHooks/useAuth'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import TrackObjectFull = SpotifyApi.TrackObjectFull

const useSearchBar = () => {
	const spotify = useAuth()
	const { accessToken } = spotify

	const [search, setSearch] = useState('')
	const [searchResult, setSearchResult] = useState<TrackObjectFull[]>([])
	const [artists, setArtists] = useState<ArtistObjectFull[]>()

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

	return {
		setSearch,
		search,
		searchResult,
		artists,
	}
}
export default useSearchBar
