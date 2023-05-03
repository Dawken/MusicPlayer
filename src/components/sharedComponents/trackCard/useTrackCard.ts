import { store, useAppSelector } from '../../../redux/store'
import { setPhotoColor } from '../../../redux/user'
import getColorFromImage from '../../sharedFunctions/getColorFromImage'

const useTrackCard = () => {
	const playingSongColor = useAppSelector(
		(state) => state.auth.playingSongColor
	)
	const trackId = useAppSelector((state) => state.auth.track)

	const handleHover = (imageUrl: string) => {
		getColorFromImage(imageUrl, (color: string) => {
			store.dispatch(setPhotoColor({ photoColor: color }))
		})
	}

	const handleMouseLeave = () => {
		store.dispatch(setPhotoColor({ photoColor: playingSongColor }))
	}
	return {
		trackId,
		handleHover,
		handleMouseLeave,
	}
}
export default useTrackCard
