import React from 'react'
import TrackSearchResult from './trackSearchResult/trackSearchResult'
import { Track } from '../../../types/searchTracksResponse'

interface ChildComponentProps {
	searchResult: Track[]
}
const PlaylistContainer = ({ searchResult }: ChildComponentProps) => {
	return (
		<div>
			{searchResult.map((item) => {
				return <TrackSearchResult item={item} key={item.id} />
			})}
		</div>
	)
}
export default PlaylistContainer
