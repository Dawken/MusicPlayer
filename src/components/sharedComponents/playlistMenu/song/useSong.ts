import { store, useAppSelector } from '../../../../redux/store'
import { useState } from 'react'
import { setSongNumber, setTrack } from '../../../../redux/user'

const useSong = () => {
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)
	const playingSongId = useAppSelector((state) => state.auth.playingSongId)
	const playingSongColor = useAppSelector(
		(state) => state.auth.playingSongColor
	)

	const [isHovering, setIsHovering] = useState(false)

	const playSong = (index: number, uri: string) => {
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
	}
}
export default useSong
