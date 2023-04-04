import { useEffect, useState } from 'react'
import useAuth from '../../../customHooks/useAuth'
import spotifyApi from '../../../shared/spotifyApi'
import { Track } from '../../../types/searchTracksResponse'

type TrackType = {
	track: Track
}

const usePlaylistContainer = () => {
	const [tracks, setTracks] = useState<TrackType[]>([])
	const spotify = useAuth()

	const { accessToken } = spotify

	useEffect(() => {
		if (accessToken) {
			spotifyApi.setAccessToken(accessToken)
			spotifyApi.getMyRecentlyPlayedTracks({ limit: 30 }).then((data: any) => {
				const uniqueTracks = data.body.items.filter(
					(item: TrackType, index: number, self: []) =>
						index ===
						self.findIndex(
							(tracks: TrackType) => tracks.track.id === item.track.id
						)
				)
				setTracks(uniqueTracks)
			})
		}
	}, [accessToken])

	return {
		tracks,
	}
}
export default usePlaylistContainer
