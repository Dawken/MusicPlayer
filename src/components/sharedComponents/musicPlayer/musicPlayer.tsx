import React from 'react'
import useAuth from '../../../customHooks/useAuth'
import styles from './musicPlayer.module.scss'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useAppSelector } from '../../../redux/store'

const MusicPlayer = () => {
	const spotify = useAuth()
	const track = useAppSelector((state) => state.auth.track)
	const songNumber = useAppSelector((state) => state.auth.songNumber)

	if (!spotify.accessToken) return null

	return (
		<div className={styles.footer}>
			<SpotifyPlayer
				key={songNumber}
				token={spotify.accessToken}
				styles={{ bgColor: '#111111' }}
				initialVolume={0.5}
				play
				showSaveIcon
				uris={track ? [track] : []}
				offset={songNumber ? songNumber : 0}
			/>
		</div>
	)
}
export default MusicPlayer
