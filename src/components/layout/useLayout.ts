import useAuth from '../../customHooks/useAuth'
import { useEffect, useState } from 'react'
import spotifyApi from '../../shared/spotifyApi'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import TrackObjectFull = SpotifyApi.TrackObjectFull
import { useAppSelector } from '../../redux/store'

const useLayout = () => {
	const spotify = useAuth()
	const { accessToken } = spotify

	const track = useAppSelector((state) => state.auth.track)
	const imageColor = useAppSelector((state) => state.auth.photoColor)

	const [color, setColor] = useState('')
	const [search, setSearch] = useState<string>('')
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

	useEffect(() => {
		setColor(imageColor)
	}, [imageColor])
	return {
		setSearch,
		search,
		searchResult,
		artists,
		track,
		color,
	}
}
export default useLayout
