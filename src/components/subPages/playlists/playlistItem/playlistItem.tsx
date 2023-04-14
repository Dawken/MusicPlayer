import React from 'react'
import styles from './playlistItem.module.scss'
import loading from '../../../../animations/skeletonLoading/skeletonLoading.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified

interface ItemType {
	item: PlaylistObjectSimplified
}

const PlaylistItem = ({ item }: ItemType) => {
	return (
		<div className={styles.playlist}>
			<div className={styles.playlistData}>
				<img
					className={`${styles.playlistPhoto} ${loading.skeleton}`}
					src={item.images[0].url}
				/>
				<div className={styles.playlistName}>{item.name}</div>
			</div>
			<KeyboardArrowDownOutlinedIcon className={styles.arrowDown} />
		</div>
	)
}
export default PlaylistItem
