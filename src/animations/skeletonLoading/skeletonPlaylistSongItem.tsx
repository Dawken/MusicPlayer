import styles from '../../components/sharedComponents/playlistMenu/song/song.module.scss'
import React from 'react'
import loading from './skeletonLoading.module.scss'

const SkeletonPlaylistSongItem = () => {
	return (
		<div className={styles.playlistSong}>
			<div />
			<div className={styles.songContainer}>
				<div className={`${styles.songPhoto} ${loading.skeleton}`} />
				<div className={styles.songData}>
					<div
						className={`${loading.skeleton} ${loading.skeletonPlaylistSongText}`}
					></div>
					<div
						className={`${loading.skeleton} ${loading.skeletonPlaylistArtistNameText}`}
					></div>
				</div>
			</div>
			<div
				className={`${loading.skeleton} ${loading.skeletonPlaylistAlbumNameText}`}
			></div>
			<div
				className={`${loading.skeleton} ${loading.skeletonSmallText}`}
			></div>
		</div>
	)
}
export default SkeletonPlaylistSongItem
