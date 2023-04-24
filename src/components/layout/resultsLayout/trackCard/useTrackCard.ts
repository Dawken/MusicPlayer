import { store, useAppSelector } from '../../../../redux/store'
import { setPhotoColor, setTrack } from '../../../../redux/user'
import getColorFromImage from '../../../sharedFunctions/getColorFromImage'

const useTrackCard = () => {
	const playingSongColor = useAppSelector(
		(state) => state.auth.playingSongColor
	)

	const setSong = (imageUrl: string, item: string) => {
		store.dispatch(setTrack({ track: item }))
	}

	const handleHover = (imageUrl: string) => {
		getColorFromImage(imageUrl, (color: string) => {
			store.dispatch(setPhotoColor({ photoColor: color }))
		})
	}

	const handleMouseLeave = () => {
		store.dispatch(setPhotoColor({ photoColor: playingSongColor }))
	}
	return {
		setSong,
		handleHover,
		handleMouseLeave,
	}
}
export default useTrackCard
