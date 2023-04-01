import React from 'react'
import { Track } from '../../../../types/searchTracksResponse'

interface TrackSearchResultProps {
	item: Track
}

const TrackSearchResult = ({ item }: TrackSearchResultProps) => {
	return (
		<>
			<img
				src={item.album.images[2].url}
				style={{ width: item.album.images[2].width }}
			/>
			<div>{item.artists[0].name}</div>
			<div>{item.name}</div>
			<div>{item.album.name}</div>
		</>
	)
}
export default TrackSearchResult
