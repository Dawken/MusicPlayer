import React from 'react'
import styles from './artistSearchResult.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import loading from '../../../../animations/skeletonLoading/skeletonLoading.module.scss'

interface ArtistsSearchResultProps {
	item: ArtistObjectFull
}

const ArtistSearchResult = ({ item }: ArtistsSearchResultProps) => {
	return (
		<div className={styles.artistContainer}>
			<div className={styles.artistPhotoContainer}>
				<img
					className={`${styles.artistPhoto} ${loading.skeleton}`}
					src={item.images[0]?.url}
				/>
			</div>
			<div className={styles.artistName}>{item.name}</div>
		</div>
	)
}
export default ArtistSearchResult
