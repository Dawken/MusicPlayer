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
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface SearchResultType {
	searchResult: TrackObjectFull[]
	artists?: ArtistObjectFull[]
}

const PlaylistContainer = ({ searchResult, artists }: SearchResultType) => {
	const { tracks, isTyping } = usePlaylistContainer()

	return (
		<div className={styles.mainContainer}>
			{searchResult.length > 0 && (
				<>
					<section className={styles.bestResults}>
						<div className={styles.sectionText}>Best results</div>
						<div className={styles.bestResultsTracks}>
							{isTyping ? (
								<ScrollContainer
									horizontal={true}
									style={{ display: 'flex' }}
								>
									{Array.from({ length: 8 }, (_, i) => (
										<SkeletonTrackSearchResult key={i} />
									))}
								</ScrollContainer>
							) : (
								<ScrollContainer
									horizontal={true}
									style={{ display: 'flex' }}
								>
									{searchResult.map(
										(item: TrackObjectFull) => (
											<TrackSearchResult
												item={item}
												key={item.id}
											/>
										)
									)}
								</ScrollContainer>
							)}
						</div>
					</section>
					<section className={styles.bestArtists}>
						<div className={styles.sectionText}>Best artists</div>
						<div className={styles.bestResultsArtists}>
							{isTyping ? (
								<ScrollContainer
									horizontal={true}
									style={{ display: 'flex' }}
								>
									{Array.from({ length: 8 }, (_, i) => (
										<SkeletonArtistSearchResult key={i} />
									))}
								</ScrollContainer>
							) : (
								<ScrollContainer
									horizontal={true}
									style={{ display: 'flex' }}
								>
									{artists?.map((item: ArtistObjectFull) => (
										<ArtistSearchResult
											item={item}
											key={item.id}
										/>
									))}
								</ScrollContainer>
							)}
						</div>
					</section>
				</>
			)}
			<section className={styles.lastPlayed}>
				<div className={styles.sectionText}>Last Played</div>
				<div className={styles.lastPlayedTracks}>
					{!tracks.length ? (
						<ScrollContainer
							horizontal={true}
							style={{ display: 'flex' }}
						>
							{Array.from({ length: 8 }, (_, i) => (
								<SkeletonTrackSearchResult key={i} />
							))}
						</ScrollContainer>
					) : (
						<div>
							<ScrollContainer
								horizontal={true}
								style={{ display: 'flex' }}
							>
								{tracks.map((item: TrackObjectFull) => (
									<TrackSearchResult
										item={item}
										key={item.id}
									/>
								))}
							</ScrollContainer>
						</div>
					)}
				</div>
			</section>
		</div>
	)
}
export default PlaylistContainer
