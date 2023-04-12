import { useEffect, useState } from 'react'
import useAuth from '../../../customHooks/useAuth'
import spotifyApi from '../../../shared/spotifyApi'
import SpotifyApi from 'spotify-web-api-node'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import PlayHistoryObject = SpotifyApi.PlayHistoryObject
import { useAppSelector } from '../../../redux/store'

type TracksType = SpotifyApi.PlayHistoryObject[]

const usePlaylistContainer = () => {
	const spotify = useAuth()
	const isTyping = useAppSelector((state) => state.auth.isUserTyping)

	const [tracks, setTracks] = useState<TrackObjectFull[]>([])
	const [visibleItems, setVisibleItems] = useState(6)

	const { accessToken } = spotify

	useEffect(() => {
		if (accessToken) {
			spotifyApi.setAccessToken(accessToken)
			spotifyApi
				.getMyRecentlyPlayedTracks({ limit: 30 })
				.then((data: { body: { items: TracksType } }) => {
					const uniqueTracks = data.body.items.filter(
						(item, index, self) =>
							index ===
							self.findIndex((tracks) => tracks.track.id === item.track.id)
					)
					const convertedTracks = uniqueTracks.map(
						(item: PlayHistoryObject) => item.track
					)
					setTracks(convertedTracks)
				})
		}
	}, [accessToken])

	useEffect(() => {
		const handleResize = () => {
			const windowWidth = window.innerWidth
			switch (true) {
				case windowWidth <= 1820 && windowWidth >= 1650:
					setVisibleItems(6)
					break
				case windowWidth <= 1650 && windowWidth >= 1420:
					setVisibleItems(5)
					break
				case windowWidth < 1420 && windowWidth >= 1200:
					setVisibleItems(4)
					break
				case windowWidth < 1200 && windowWidth >= 800:
					setVisibleItems(3)
					break
				case windowWidth < 800:
					setVisibleItems(2)
					break
				default:
					setVisibleItems(6)
			}
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return {
		tracks,
		isTyping,
		visibleItems,
	}
}
export default usePlaylistContainer
