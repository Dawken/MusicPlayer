import React, { useEffect, useState } from 'react'
import useAuth from '../../customHooks/useAuth'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.REACT_APP_SPOTIFY_API,
})

const Layout = () => {
	const spotify = useAuth()
	const { accessToken } = spotify

	const [search, setSearch] = useState('')
	const [searchResult, setSearchResult] = useState<
		SpotifyApi.TrackObjectSimplified[]
	>([])

	useEffect(() => {
		if (accessToken) {
			spotifyApi.setAccessToken(accessToken)
		}
	}, [accessToken])

	useEffect(() => {
		if (!search) return setSearchResult([])
		if (!accessToken) return

		spotifyApi.searchTracks(search).then((res) => {
			if (res.body.tracks) {
				setSearchResult(res.body.tracks.items)
			}
		})
	}, [search])
	console.log(searchResult)
	return (
		<input
			onChange={(event) => setSearch(event.target.value)}
			value={search}
		></input>
	)
}
export default Layout
