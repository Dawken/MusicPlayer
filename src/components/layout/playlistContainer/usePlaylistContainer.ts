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
							self.findIndex(
								(tracks) => tracks.track.id === item.track.id
							)
					)
					const convertedTracks = uniqueTracks.map(
						(item: PlayHistoryObject) => item.track
					)
					setTracks(convertedTracks)
				})
		}
	}, [accessToken])

	return {
		tracks,
		isTyping,
	}
}
export default usePlaylistContainer
