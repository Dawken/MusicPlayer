import React from 'react'
import TrackSearchResult from './trackSearchResult/trackSearchResult'
import { Track } from '../../../types/searchTracksResponse'
import usePlaylistContainer from './usePlaylistContainer'
import styles from './playlistContainer.module.scss'

type SearchResultType = {
	searchResult: Track[]
}

const PlaylistContainer = ({ searchResult }: SearchResultType) => {
	const { tracks } = usePlaylistContainer()

	return (
		<div className={styles.mainContainer}>
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
