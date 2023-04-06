import React, { useEffect, useState } from 'react'
import TrackSearchResult from './trackSearchResult/trackSearchResult'
import usePlaylistContainer from './usePlaylistContainer'
import styles from './playlistContainer.module.scss'
import ArtistSearchResult from './artistsSearchResult/artistSearchResult'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import TrackObjectFull = SpotifyApi.TrackObjectFull

interface SearchResultType {
	searchResult: TrackObjectFull[]
	artists?: ArtistObjectFull[]
}

const PlaylistContainer = ({ searchResult, artists }: SearchResultType) => {
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
				<>
					<section className={styles.bestResults}>
						<div className={styles.sectionText}>Best results</div>
						<div className={styles.bestResultsTracks}>
							{searchResult
								.slice(0, visibleItems)
								.map((item: TrackObjectFull) => {
									return <TrackSearchResult item={item} key={item.id} />
								})}
						</div>
					</section>
					<section className={styles.bestArtists}>
						<div className={styles.sectionText}>Best artists</div>
						<div className={styles.bestResultsArtists}>
							{artists?.slice(0, visibleItems).map((item: ArtistObjectFull) => {
								return <ArtistSearchResult item={item} key={item.id} />
							})}
						</div>
					</section>
				</>
			)}
			<section className={styles.lastPlayed}>
				<div className={styles.sectionText}>Last Played</div>
				<div className={styles.lastPlayedTracks}>
					{tracks.slice(0, visibleItems).map((item: TrackObjectFull) => {
						return <TrackSearchResult item={item} key={item.id} />
					})}
				</div>
			</section>
		</div>
	)
}
export default PlaylistContainer
