import React, { useEffect } from 'react'
import useAuth from '../../../customHooks/useAuth'
import styles from './musicPlayer.module.scss'
import SpotifyPlayer from 'react-spotify-web-playback'
import { store, useAppSelector } from '../../../redux/store'
import {
	setIsPlaying,
	setPhotoColor,
	setPlayingSongColor,
	setPlayingSongId,
	setPlayingSongPhoto,
} from '../../../redux/user'
import getColorFromImage from '../../sharedFunctions/getColorFromImage'

const MusicPlayer = () => {
	const spotify = useAuth()
	const track = useAppSelector((state) => state.auth.track)
	const songNumber = useAppSelector((state) => state.auth.songNumber)
	const playingSongColor = useAppSelector(
		(state) => state.auth.playingSongColor
	)
	const playingSongPhoto = useAppSelector(
		(state) => state.auth.playingSongPhoto
	)

	useEffect(() => {
		if (playingSongPhoto !== '')
			getColorFromImage(playingSongPhoto, (color: string) => {
				store.dispatch(setPhotoColor({ photoColor: color }))
				store.dispatch(setPlayingSongColor({ playingSongColor: color }))
			})
	}, [playingSongPhoto])

	if (!spotify.accessToken) return null

	return (
		<div className={styles.footer}>
			<SpotifyPlayer
				key={songNumber}
				token={spotify.accessToken}
				styles={{
					activeColor: '#b9b9b9',
					bgColor: '#0a0a0a',
					color: playingSongColor,
					loaderColor: '#b9b9b9',
					sliderColor: playingSongColor,
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
					store.dispatch(
						setPlayingSongPhoto({
							playingSongPhoto: state.track.image,
						})
					)
				}}
			/>
		</div>
	)
}
export default MusicPlayer
