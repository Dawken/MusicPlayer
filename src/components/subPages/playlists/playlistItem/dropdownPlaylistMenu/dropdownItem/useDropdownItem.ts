import { useAppSelector } from '../../../../../../redux/store'
import { useState } from 'react'

const useDropdownItem = () => {
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)
	const playingSongId = useAppSelector((state) => state.auth.playingSongId)
	const trackId = useAppSelector((state) => state.auth.track)

	const [isHovering, setIsHovering] = useState(false)

	return {
		isPlaying,
		playingSongId,
		isHovering,
		setIsHovering,
		trackId,
	}
}
export default useDropdownItem
