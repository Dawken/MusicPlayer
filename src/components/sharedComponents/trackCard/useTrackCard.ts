import { store, useAppSelector } from '../../../redux/store'
import { setPhotoColor, setSongNumber, setTrack } from '../../../redux/user'
import getColorFromImage from '../../sharedFunctions/getColorFromImage'

const useTrackCard = () => {
	const playingSongColor = useAppSelector(
		(state) => state.auth.playingSongColor
	)

	const setSong = (imageUrl: string, item: string, index: number) => {
		store.dispatch(setTrack({ track: item }))
		store.dispatch(setSongNumber({ songNumber: index }))
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
