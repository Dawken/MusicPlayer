import React from 'react'
import styles from './popularSongs.module.scss'
import ScrollContainer from 'react-indiana-drag-scroll'
import SkeletonTrackCard from '../../../../animations/skeletonLoading/skeletonTrackCard'
import TrackCard from '../../../sharedComponents/trackCard/trackCard'
import usePopularSongs from './usePopularSongs'
import SpotifyApi from 'spotify-web-api-node'
import SingleArtistResponse = SpotifyApi.SingleArtistResponse

const PopularSongs = ({
	artist,
}: {
	artist: SingleArtistResponse | undefined
}) => {
	const { popularSongs } = usePopularSongs(artist)

	return (
		<section className={styles.popularSongs}>
			{!popularSongs ? (
				<ScrollContainer horizontal={true} style={{ display: 'flex' }}>
					{Array.from({ length: 8 }, (_, i) => (
						<SkeletonTrackCard key={i} />
					))}
				</ScrollContainer>
			) : (
				<ScrollContainer horizontal={true} style={{ display: 'flex' }}>
					{popularSongs?.map((item) => (
						<TrackCard item={item} key={item.id} />
					))}
				</ScrollContainer>
			)}
		</section>
	)
}
export default PopularSongs
