import styles from './playlistItem.module.scss'
import loading from './skeletonLoading.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import React from 'react'

const SkeletonPlaylistItem = () => {
	return (
		<div className={styles.playlist} style={{ marginBottom: '30px' }}>
			<div className={styles.playlistData}>
				<div
					className={`${styles.playlistPhoto} ${loading.skeleton}`}
				/>
				<div
					className={`${loading.skeleton} ${loading.skeletonAlbumText}`}
				></div>
			</div>
			<KeyboardArrowDownOutlinedIcon className={styles.arrow} />
		</div>
	)
}
export default SkeletonPlaylistItem
