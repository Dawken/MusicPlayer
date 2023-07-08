import React from 'react'
import styles from './artistSearchResult.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import loading from '../../../../animations/skeletonLoading/skeletonLoading.module.scss'
import { Link } from 'react-router-dom'
import NotFoundPhoto from '../../../../assets/notFound.png'

interface ArtistsSearchResultProps {
	item: ArtistObjectFull
}

const ArtistSearchResult = ({ item }: ArtistsSearchResultProps) => {
	return (
		<Link to={`/artist/${item.id}`} className={styles.artistContainer}>
			<div className={styles.artistPhotoContainer}>
				<img
					className={`${styles.artistPhoto} ${loading.skeleton}`}
					src={
						item.images[0]?.url
							? item.images[0]?.url
							: NotFoundPhoto
					}
				/>
			</div>
			<div className={styles.artistName}>{item.name}</div>
		</Link>
	)
}
export default ArtistSearchResult
