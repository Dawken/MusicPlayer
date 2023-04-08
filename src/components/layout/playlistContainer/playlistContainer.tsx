import React from 'react'
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

	return (
		<div className={styles.mainContainer}>
			{searchResult.length > 0 && (
				<>
					<section className={styles.bestResults}>
						<div className={styles.sectionText}>Best results</div>
						<div className={styles.bestResultsTracks}>
							{searchResult.map((item: TrackObjectFull) => {
								return <TrackSearchResult item={item} key={item.id} />
							})}
						</div>
					</section>
					<section className={styles.bestArtists}>
						<div className={styles.sectionText}>Best artists</div>
						<div className={styles.bestResultsArtists}>
							{artists?.map((item: ArtistObjectFull) => {
								return <ArtistSearchResult item={item} key={item.id} />
							})}
						</div>
					</section>
				</>
			)}
			<section className={styles.lastPlayed}>
				<div className={styles.sectionText}>Last Played</div>
				<div className={styles.lastPlayedTracks}>
					{tracks.map((item: TrackObjectFull) => {
						return <TrackSearchResult item={item} key={item.id} />
					})}
				</div>
			</section>
		</div>
	)
}
export default PlaylistContainer
