import { FastAverageColor } from 'fast-average-color'
import chroma from 'chroma-js'
import { useEffect, useState } from 'react'

const useSongColor = (imageUrl: string) => {
	const [colorHex, setColorHex] = useState('')

	useEffect(() => {
		const getColorFromImage = () => {
			const fac = new FastAverageColor()
			fac
				.getColorAsync(imageUrl, { mode: 'precision' })
				.then((color) => {
					const newColorHex = chroma(color.rgb).saturate(2).hex()
					setColorHex(newColorHex)
				})
				.catch((error) => {
					console.error(error)
				})
		}
		getColorFromImage()
	}, [imageUrl])

	return colorHex
}

export default useSongColor
