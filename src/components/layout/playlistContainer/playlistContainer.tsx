import React, { useEffect, useState } from 'react'
import TrackSearchResult from './trackSearchResult/trackSearchResult'
import { Track } from '../../../types/searchTracksResponse'
import useAuth from '../../../customHooks/useAuth'
import spotifyApi from '../../../shared/spotifyApi'

interface ChildComponentProps {
	searchResult: Track[]
}
type TrackType = {
	track: Track
}

const PlaylistContainer = ({ searchResult }: ChildComponentProps) => {
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

	return (
		<div>
			{searchResult.length > 0
				? searchResult.map((item) => {
						return <TrackSearchResult item={item} key={item.id} />
				  })
				: tracks.map((item) => {
						return <TrackSearchResult item={item.track} key={item.track.id} />
				  })}
		</div>
	)
}
export default PlaylistContainer
