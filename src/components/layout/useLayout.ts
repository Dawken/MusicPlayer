import useAuth from '../../customHooks/useAuth'
import { useEffect, useState } from 'react'
import spotifyApi from '../../shared/spotifyApi'
import { Track } from '../../types/searchTracksResponse'

const useLayout = () => {
	const spotify = useAuth()
	const { accessToken } = spotify

	const [search, setSearch] = useState<string>('')
	const [searchResult, setSearchResult] = useState<Track[]>([])

	useEffect(() => {
		if (accessToken) {
			spotifyApi.setAccessToken(accessToken)
		}
	}, [accessToken])

	useEffect(() => {
		if (!search) return setSearchResult([])
		if (!accessToken) return

		spotifyApi.searchTracks(search).then((res: any) => {
			if (res.body.tracks) {
				setSearchResult(res.body.tracks.items)
			}
		})
	}, [search])
	return {
		setSearch,
		search,
		searchResult,
	}
}
export default useLayout
