import { useEffect, useState } from 'react'
import useAuth from '../../../customHooks/useAuth'
import spotifyApi from '../../../shared/spotifyApi'
import SpotifyApi from 'spotify-web-api-node'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import PlayHistoryObject = SpotifyApi.PlayHistoryObject
import RecommendationTrackObject = SpotifyApi.RecommendationTrackObject
import { useAppSelector } from '../../../redux/store'

type TracksType = SpotifyApi.PlayHistoryObject[]

const useResultsLayout = () => {
	const spotify = useAuth()
	const isTyping = useAppSelector((state) => state.auth.isUserTyping)

	const [tracks, setTracks] = useState<TrackObjectFull[]>([])
	const [seedTracks, setSeedTracks] = useState<string[]>([])
	const [recommendations, setRecommendations] = useState<
		RecommendationTrackObject[]
	>([])

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
					data.body.items.slice(0, 4).map((item) => {
						setSeedTracks((prevState) => [
							...prevState,
							item.track.id,
						])
					})
				})
		}
	}, [accessToken])

	useEffect(() => {
		if (accessToken) {
			spotifyApi.setAccessToken(accessToken)
			spotifyApi
				.getRecommendations({ seed_tracks: seedTracks })
				.then((data) => {
					data.body.tracks.map((item) => {
						setRecommendations((prevState) => [...prevState, item])
					})
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}, [seedTracks])

	return {
		tracks,
		isTyping,
		recommendations,
	}
}
export default useResultsLayout
