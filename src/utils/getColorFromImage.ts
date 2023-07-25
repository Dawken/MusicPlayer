import { FastAverageColor } from 'fast-average-color'
import chroma from 'chroma-js'

const getColorFromImage = (
    imageUrl: string,
    callback: (hexColor: string) => void
) => {
    const fac = new FastAverageColor()
    fac.getColorAsync(imageUrl, { mode: 'precision' })
        .then((color) => {
            const hexColor = chroma(color.rgb).saturate(2).hex()
            callback(hexColor)
        })
        .catch((error) => {
            console.error(error)
        })
}

export default getColorFromImage
