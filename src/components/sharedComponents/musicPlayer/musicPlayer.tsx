import React from 'react'
import useAuth from '../../../customHooks/useAuth'
import styles from './musicPlayer.module.scss'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useAppSelector } from '../../../redux/store'

const MusicPlayer = () => {
	const spotify = useAuth()
	const track = useAppSelector((state) => state.auth.track)

	if (!spotify.accessToken) return null

	return (
		<div className={styles.footer}>
			<SpotifyPlayer
				token={spotify.accessToken}
				styles={{ bgColor: '#111111' }}
				showSaveIcon
				play={true}
				uris={track ? [track] : []}
			/>
		</div>
	)
}
export default MusicPlayer
