import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import useAuth from '../../../customHooks/useAuth'

const MusicPlayer = ({ trackUri }: any) => {
	const spotify = useAuth()

	if (!spotify.accessToken) return null
	return (
		<div>
			<SpotifyPlayer
				token={spotify.accessToken}
				showSaveIcon
				uris={trackUri ? [trackUri] : []}
			/>
		</div>
	)
}
export default MusicPlayer
