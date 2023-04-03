import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import useAuth from '../../../customHooks/useAuth'

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
		<div>
			<SpotifyPlayer
				token={spotify.accessToken}
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
