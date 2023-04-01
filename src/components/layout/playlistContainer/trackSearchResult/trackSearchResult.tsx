import React from 'react'
import { Track } from '../../../../types/searchTracksResponse'
import { store } from '../../../../redux/store'
import { setTrack } from '../../../../redux/user'

interface TrackSearchResultProps {
	item: Track
}

const TrackSearchResult = ({ item }: TrackSearchResultProps) => {
	const setSong = () => {
		store.dispatch(setTrack({ track: item.uri }))
	}
	return (
		<div onClick={() => setSong()}>
			<img
				src={item.album.images[2].url}
				style={{ width: item.album.images[2].width }}
			/>
			<div>{item.artists[0].name}</div>
			<div>{item.name}</div>
			<div>{item.album.name}</div>
		</div>
	)
}
export default TrackSearchResult
