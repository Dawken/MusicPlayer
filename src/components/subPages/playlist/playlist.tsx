import React from 'react'
import styles from './playlist.module.scss'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import usePlaylist from './usePlaylist'
import PlaylistData from './playlistData/playlistData'

const Playlist = () => {
	const { imageColor, playlist } = usePlaylist()

	return (
		<div className={styles.layout}>
			<BackgroundImageColor color={imageColor} />
			<div className={styles.playlist}>
				<PlaylistData playlist={playlist} />
				<div className={styles.background}></div>
			</div>
		</div>
	)
}
export default Playlist
