import React, { useEffect, useState } from 'react'
import useAuth from '../../../customHooks/useAuth'
import styles from './musicPlayer.module.scss'
import SpotifyPlayer from 'react-spotify-web-playback'

interface TrackUriType {
	trackUri: string
}

const MusicPlayer = ({ trackUri }: TrackUriType) => {
	const spotify = useAuth()

	const [play, setPlay] = useState(false)

	useEffect(() => {
		setPlay(true)
	}, [trackUri])

	if (!spotify.accessToken) return null

	return (
		<div className={styles.footer}>
			<SpotifyPlayer
				token={spotify.accessToken}
				styles={{ bgColor: '#111111' }}
				showSaveIcon
				callback={(state) => {
					!state.isPlaying && setPlay(false)
				}}
				play={play}
				uris={trackUri ? [trackUri] : []}
			/>
		</div>
	)
}
export default MusicPlayer
