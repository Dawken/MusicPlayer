import React from 'react'
import styles from '../../components/layout/resultsLayout/artistsSearchResult/artistSearchResult.module.scss'
import loading from './skeletonLoading.module.scss'

const SkeletonArtistSearchResult = () => {
	return (
		<div className={styles.artistContainer}>
			<div className={styles.artistPhotoContainer}>
				<div className={`${styles.artistPhoto} ${loading.skeleton}`} />
			</div>
			<div className={styles.artistName}>
				<div
					className={`${loading.skeleton} ${loading.skeletonArtist}`}
				></div>
			</div>
		</div>
	)
}
export default SkeletonArtistSearchResult
