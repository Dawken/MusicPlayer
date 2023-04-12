import React from 'react'
import TrackSearchResult from './trackSearchResult/trackSearchResult'
import usePlaylistContainer from './usePlaylistContainer'
import styles from './playlistContainer.module.scss'
import ArtistSearchResult from './artistsSearchResult/artistSearchResult'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import TrackObjectFull = SpotifyApi.TrackObjectFull
import SkeletonTrackSearchResult from '../../../animations/skeletonLoading/skeletonTrackSearchResult'
import SkeletonArtistSearchResult from '../../../animations/skeletonLoading/skeletonArtistSearchResult'

interface SearchResultType {
	searchResult: TrackObjectFull[]
	artists?: ArtistObjectFull[]
}

const PlaylistContainer = ({ searchResult, artists }: SearchResultType) => {
	const { tracks, isTyping, visibleItems } = usePlaylistContainer()

	return (
		<div className={styles.mainContainer}>
			{searchResult.length > 0 && (
				<>
					<section className={styles.bestResults}>
						<div className={styles.sectionText}>Best results</div>
						<div className={styles.bestResultsTracks}>
							{isTyping
								? Array.from({ length: visibleItems }, (_, i) => (
										<SkeletonTrackSearchResult key={i} />
								  ))
								: searchResult
										.slice(0, visibleItems)
										.map((item: TrackObjectFull) => (
											<TrackSearchResult item={item} key={item.id} />
										))}
						</div>
					</section>
					<section className={styles.bestArtists}>
						<div className={styles.sectionText}>Best artists</div>
						<div className={styles.bestResultsArtists}>
							{isTyping
								? Array.from({ length: visibleItems }, (_, i) => (
										<SkeletonArtistSearchResult key={i} />
								  ))
								: artists
										?.slice(0, visibleItems)
										.map((item: ArtistObjectFull) => (
											<ArtistSearchResult item={item} key={item.id} />
										))}
						</div>
					</section>
				</>
			)}
			<section className={styles.lastPlayed}>
				<div className={styles.sectionText}>Last Played</div>
				<div className={styles.lastPlayedTracks}>
					{!tracks.length
						? Array.from({ length: visibleItems }, (_, i) => (
								<SkeletonTrackSearchResult key={i} />
						  ))
						: tracks
								.slice(0, visibleItems)
								.map((item: TrackObjectFull) => (
									<TrackSearchResult item={item} key={item.id} />
								))}
				</div>
			</section>
		</div>
	)
}
export default PlaylistContainer
