import React from 'react'
import styles from './popularSongsAlbums.module.scss'
import ScrollContainer from 'react-indiana-drag-scroll'
import SkeletonTrackCard from '../../../animations/skeletonLoading/skeletonTrackCard'
import TrackCard from '../trackCard/trackCard'
import usePopularSongsAlbums from './usePopularSongsAlbums'
import SpotifyApi from 'spotify-web-api-node'
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import AlbumCard from '../albumCard/albumCard'
import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified

const PopularSongsAlbums = ({
	artist,
}: {
	artist: SingleArtistResponse | ArtistObjectSimplified | undefined
}) => {
	const { popular } = usePopularSongsAlbums(artist)

	return (
		<>
			<div className={styles.sectionText}>Popular Songs</div>
			<section className={styles.popularSongs}>
				{!popular.songs.length ? (
					<ScrollContainer
						horizontal={true}
						style={{ display: 'flex' }}
					>
						{Array.from({ length: 8 }, (_, i) => (
							<SkeletonTrackCard key={i} />
						))}
					</ScrollContainer>
				) : (
					<ScrollContainer
						horizontal={true}
						style={{ display: 'flex' }}
					>
						{popular.songs?.map((item) => (
							<TrackCard item={item} key={item.id} />
						))}
					</ScrollContainer>
				)}
			</section>
			<div className={styles.sectionText}>Popular Albums</div>
			<section className={styles.popularAlbums}>
				{!popular.albums.length ? (
					<ScrollContainer
						horizontal={true}
						style={{ display: 'flex' }}
					>
						{Array.from({ length: 8 }, (_, i) => (
							<SkeletonTrackCard key={i} />
						))}
					</ScrollContainer>
				) : (
					<ScrollContainer
						horizontal={true}
						style={{ display: 'flex' }}
					>
						{popular.albums?.map((item, index) => (
							<AlbumCard item={item} key={index} />
						))}
					</ScrollContainer>
				)}
			</section>
		</>
	)
}
export default PopularSongsAlbums
