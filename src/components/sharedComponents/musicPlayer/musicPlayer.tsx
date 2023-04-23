import React, { useEffect, useState } from 'react'
import useAuth from '../../../customHooks/useAuth'
import styles from './musicPlayer.module.scss'
import SpotifyPlayer from 'react-spotify-web-playback'
import { store, useAppSelector } from '../../../redux/store'
import {
	setIsPlaying,
	setPhotoColor,
	setPlayingSongColor,
	setPlayingSongId,
} from '../../../redux/user'
import getColorFromImage from '../../sharedFunctions/getColorFromImage'

const MusicPlayer = () => {
	const spotify = useAuth()
	const track = useAppSelector((state) => state.auth.track)
	const songNumber = useAppSelector((state) => state.auth.songNumber)
	const [imageUrl, setImageUrl] = useState('')

	useEffect(() => {
		if (imageUrl !== '')
			getColorFromImage(imageUrl, (color: string) => {
				store.dispatch(setPhotoColor({ photoColor: color }))
				store.dispatch(setPlayingSongColor({ playingSongColor: color }))
			})
	}, [imageUrl])

	if (!spotify.accessToken) return null

	return (
		<div className={styles.footer}>
			<SpotifyPlayer
				key={songNumber}
				token={spotify.accessToken}
				styles={{
					activeColor: '#b9b9b9',
					bgColor: '#1f1f1f',
					color: '#b9b9b9',
					loaderColor: '#b9b9b9',
					sliderColor: '#b9b9b9',
					trackArtistColor: '#c0c0c0',
					trackNameColor: '#b9b9b9',
				}}
				initialVolume={0.5}
				play
				showSaveIcon
				uris={track ? [track] : []}
				offset={songNumber ? songNumber : undefined}
				callback={(state) => {
					if (state.isPlaying) {
						store.dispatch(setIsPlaying({ isPlaying: true }))
					} else {
						store.dispatch(setIsPlaying({ isPlaying: false }))
					}
					store.dispatch(
						setPlayingSongId({ playingSongId: state.track.id })
					)
					setImageUrl(state.track.image)
				}}
			/>
		</div>
	)
}
export default MusicPlayer
