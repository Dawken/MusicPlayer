import { store, useAppSelector } from '../../../../../../redux/store'
import { useState } from 'react'
import { setSongNumber, setTrack } from '../../../../../../redux/user'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject

const useDropdownItem = () => {
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)
	const playingSongId = useAppSelector((state) => state.auth.playingSongId)

	const [isHovering, setIsHovering] = useState(false)

	const playSong = (
		item: PlaylistTrackObject,
		index: number,
		uri: string
	) => {
		store.dispatch(setTrack({ track: uri }))
		store.dispatch(setSongNumber({ songNumber: index }))
	}
	return {
		isPlaying,
		playingSongId,
		isHovering,
		setIsHovering,
		playSong,
	}
}
export default useDropdownItem
