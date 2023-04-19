import { store, useAppSelector } from '../../../../redux/store'
import { setPhotoColor, setTrack } from '../../../../redux/user'
import { FastAverageColor } from 'fast-average-color'
import chroma from 'chroma-js'

const useTrackSearchResult = () => {
	const playingSongColor = useAppSelector(
		(state) => state.auth.playingSongColor
	)

	const setSong = (imageUrl: string, item: string) => {
		store.dispatch(setTrack({ track: item }))
	}

	const handleHover = (imageUrl: string) => {
		const fac = new FastAverageColor()
		fac
			.getColorAsync(imageUrl, { mode: 'precision' })
			.then((color) => {
				const colorHex = chroma(color.rgb).saturate(2).hex()
				store.dispatch(setPhotoColor({ photoColor: colorHex }))
			})
			.catch((error) => {
				console.error(error)
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
export default useTrackSearchResult
