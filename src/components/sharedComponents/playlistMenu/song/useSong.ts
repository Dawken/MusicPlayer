import { store, useAppSelector } from '../../../../redux/store'
import { useState } from 'react'
import SpotifyApi from 'spotify-web-api-node'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import { setSongNumber, setTrack } from '../../../../redux/user'
import { useLocation } from 'react-router-dom'

const useSong = () => {
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)
	const playingSongId = useAppSelector((state) => state.auth.playingSongId)
	const playingSongColor = useAppSelector(
		(state) => state.auth.playingSongColor
	)
	const id = useLocation()

	const path = id.pathname.split('/')[1]

	const [isHovering, setIsHovering] = useState(false)

	const playSong = (item: TrackObjectFull, index: number, uri: string) => {
		store.dispatch(setTrack({ track: uri }))
		store.dispatch(setSongNumber({ songNumber: index }))
	}

	return {
		isPlaying,
		playingSongId,
		isHovering,
		setIsHovering,
		playSong,
		playingSongColor,
		path,
	}
}
export default useSong
