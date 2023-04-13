import { store, useAppSelector } from '../../../../redux/store'
import {
	setPhotoColor,
	setPlayingSongColor,
	setTrack,
} from '../../../../redux/user'
import { FastAverageColor } from 'fast-average-color'
import chroma from 'chroma-js'

const useTrackSearchResult = () => {
	const songColor = useAppSelector((state) => state.auth.playingSongColor)

	const getColorFromImage = (
		imageUrl: string,
		callback: (color: string) => void
	) => {
		const fac = new FastAverageColor()
		fac
			.getColorAsync(imageUrl, { mode: 'precision' })
			.then((color) => {
				const colorHex = chroma(color.rgb).saturate(2).hex()
				callback(colorHex)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const setSong = (imageUrl: string, item: string) => {
		store.dispatch(setTrack({ track: item }))

		getColorFromImage(imageUrl, (colorHex) => {
			store.dispatch(setPlayingSongColor({ playingSongColor: colorHex }))
		})
	}

	const handleHover = (imageUrl: string) => {
		getColorFromImage(imageUrl, (colorHex) => {
			store.dispatch(setPhotoColor({ photoColor: colorHex }))
		})
	}

	const handleMouseLeave = () => {
		store.dispatch(setPhotoColor({ photoColor: songColor }))
	}
	return {
		setSong,
		handleHover,
		handleMouseLeave,
	}
}
export default useTrackSearchResult
