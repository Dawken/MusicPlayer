import React from 'react'
import TrackSearchResult from './trackSearchResult/trackSearchResult'
import { Track } from '../../../types/searchTracksResponse'

interface ChildComponentProps {
	searchResult: Track[]
}
const PlaylistContainer = ({ searchResult }: ChildComponentProps) => {
	console.log(searchResult)
	return (
		<>
			{searchResult.map((item) => {
				return <TrackSearchResult item={item} key={Math.random()} />
			})}
		</>
	)
}
export default PlaylistContainer
