import React, { useEffect, useState } from 'react'
import TrackSearchResult from './trackSearchResult/trackSearchResult'
import { Track } from '../../../types/searchTracksResponse'
import usePlaylistContainer from './usePlaylistContainer'
import styles from './playlistContainer.module.scss'

type SearchResultType = {
	searchResult: Track[]
}

const PlaylistContainer = ({ searchResult }: SearchResultType) => {
	const { tracks } = usePlaylistContainer()

	const [visibleItems, setVisibleItems] = useState(6)

	useEffect(() => {
		const handleResize = () => {
			const windowWidth = window.innerWidth
			switch (true) {
				case windowWidth <= 1630 && windowWidth >= 1360:
					setVisibleItems(5)
					break
				case windowWidth <= 1360 && windowWidth >= 1090:
					setVisibleItems(4)
					break
				case windowWidth < 1090 && windowWidth >= 810:
					setVisibleItems(3)
					break
				case windowWidth < 810:
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

	return (
		<div className={styles.mainContainer}>
			{searchResult.length > 0 && (
				<section className={styles.bestResults}>
					<div className={styles.sectionText}>Best results</div>
					<div className={styles.bestResultsTracks}>
						{searchResult.slice(0, visibleItems).map((item) => {
							return <TrackSearchResult item={item} key={item.id} />
						})}
					</div>
				</section>
			)}
			<section className={styles.lastPlayed}>
				<div className={styles.sectionText}>Last Played</div>
				<div className={styles.lastPlayedTracks}>
					{tracks.slice(0, visibleItems).map((item) => {
						return <TrackSearchResult item={item.track} key={item.track.id} />
					})}
				</div>
			</section>
		</div>
	)
}
export default PlaylistContainer
