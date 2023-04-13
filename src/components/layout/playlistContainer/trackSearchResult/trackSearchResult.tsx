import React from 'react'
import { store } from '../../../../redux/store'
import { setPhotoColor, setTrack } from '../../../../redux/user'
import styles from './trackSearchResult.module.scss'
import loading from '../../../../animations/skeletonLoading/skeletonLoading.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import { FastAverageColor } from 'fast-average-color'
import chroma from 'chroma-js'

import TrackObjectFull = SpotifyApi.TrackObjectFull

interface TrackSearchResultProps {
	item: TrackObjectFull
}

const TrackSearchResult = ({ item }: TrackSearchResultProps) => {
	const setSong = () => {
		store.dispatch(setTrack({ track: item.uri }))
	}

	const handleHover = (event: React.MouseEvent, imageUrl: string) => {
		const fac = new FastAverageColor()
		fac
			.getColorAsync(imageUrl, { mode: 'precision' })
			.then((color) => {
				const colorHex = chroma(color.rgb).saturate(2).hex()
				store.dispatch(setPhotoColor({ photoColor: colorHex }))
			})
			.catch((error) => {
				console.error(error)
			})
	}
	return (
		<div
			className={styles.songContainer}
			onClick={() => setSong()}
			onMouseEnter={(event) => handleHover(event, item.album.images[1]?.url)}
		>
			<div className={styles.songPhotoContainer}>
				<img
					className={`${styles.songPhoto} ${loading.skeleton}`}
					src={item.album.images[1]?.url}
				/>
			</div>
			<div className={styles.artistName}>{item.artists[0].name}</div>
			<div className={styles.songName}>
				{item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name}
			</div>
		</div>
	)
}
export default TrackSearchResult
