import styles from './playlistData.module.scss'
import loading from '../../../../animations/skeletonLoading/skeletonLoading.module.scss'
import React from 'react'
import SpotifyApi from 'spotify-web-api-node'
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import SingleAlbumResponse = SpotifyApi.SingleAlbumResponse

const PlaylistData = ({
	playlist,
}: {
	playlist: SinglePlaylistResponse | SingleAlbumResponse | undefined
}) => {
	return (
		<div className={styles.playlistData}>
			<div
				className={`${styles.playlistImageSkeleton} ${loading.skeleton}`}
			>
				{playlist?.images[0] ? (
					<img
						src={playlist?.images[0].url}
						className={styles.playlistImage}
					/>
				) : (
					<div className={styles.songIcon}>
						<MusicNoteIcon sx={{ fontSize: '5rem' }} />
					</div>
				)}
			</div>
			<div className={styles.playlist}>
				<div className={styles.playlistName}>
					{playlist?.name ? (
						playlist.name
					) : (
						<div
							className={`${loading.skeleton} ${loading.skeletonTrackText}`}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
export default PlaylistData
