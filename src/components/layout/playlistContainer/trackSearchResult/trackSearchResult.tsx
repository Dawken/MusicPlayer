import React from 'react'
import { store } from '../../../../redux/store'
import { setTrack } from '../../../../redux/user'
import styles from './trackSearchResult.module.scss'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import SpotifyApi from 'spotify-web-api-node'

import TrackObjectFull = SpotifyApi.TrackObjectFull

interface TrackSearchResultProps {
	item: TrackObjectFull
}

const TrackSearchResult = ({ item }: TrackSearchResultProps) => {
	const setSong = () => {
		store.dispatch(setTrack({ track: item.uri }))
	}
	return (
		<div className={styles.songContainer} onClick={() => setSong()}>
			<div className={styles.songPhotoContainer}>
				<img className={styles.songPhoto} src={item.album.images[1].url} />
				<PlayCircleFilledWhiteIcon className={styles.playIcon} />
			</div>
			<div className={styles.artistName}>{item.artists[0].name}</div>
			<div className={styles.songName}>
				{item.name.length > 40 ? item.name.slice(0, 40) + '...' : item.name}
			</div>
		</div>
	)
}
export default TrackSearchResult
