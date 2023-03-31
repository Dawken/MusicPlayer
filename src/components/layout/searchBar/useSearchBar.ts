import useAuth from '../../../customHooks/useAuth'
import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'

const useSearchBar = () => {
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
	return {
		setSearch,
		search,
	}
}
export default useSearchBar
