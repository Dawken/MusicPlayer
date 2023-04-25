import React from 'react'
import styles from './trackCard.module.scss'
import loading from '../../../../animations/skeletonLoading/skeletonLoading.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import RecommendationTrackObject = SpotifyApi.RecommendationTrackObject
import useTrackCard from './useTrackCard'

interface TrackSearchResultProps {
	item: TrackObjectFull | RecommendationTrackObject
}

const TrackCard = ({ item }: TrackSearchResultProps) => {
	const { setSong, handleHover, handleMouseLeave } = useTrackCard()

	return (
		<div
			className={styles.songContainer}
			onClick={() =>
				setSong(
					item.album.images[1]?.url,
					item.album.uri,
					item.track_number - 1
				)
			}
			onMouseEnter={() => handleHover(item.album.images[1]?.url)}
			onMouseLeave={() => handleMouseLeave()}
		>
			<div className={styles.songPhotoContainer}>
				<img
					className={`${styles.songPhoto} ${loading.skeleton}`}
					src={item.album.images[1]?.url}
				/>
			</div>
			<div className={styles.artistName}>{item.artists[0].name}</div>
			<div className={styles.songName}>
				{item.name.length > 30
					? item.name.slice(0, 30) + '...'
					: item.name}
			</div>
		</div>
	)
}
export default TrackCard
