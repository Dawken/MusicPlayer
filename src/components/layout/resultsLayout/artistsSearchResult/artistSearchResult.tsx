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
					src={
						item.images[0]?.url
							? item.images[0]?.url
							: 'https://scontent-ams2-1.xx.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c94.0.320.320a_dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=12b3be&_nc_ohc=86r1OXkph5QAX-KET4s&_nc_ht=scontent-ams2-1.xx&edm=AP4hL3IEAAAA&oh=00_AfB8qQqhxMUgxcyxPqZ-yMgxQzLsmCujJaSz9h3jWsNKGQ&oe=646CF519'
					}
				/>
			</div>
			<div className={styles.artistName}>{item.name}</div>
		</div>
	)
}
export default ArtistSearchResult
