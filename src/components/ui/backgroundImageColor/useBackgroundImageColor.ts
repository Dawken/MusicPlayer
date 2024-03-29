import { useAppSelector } from '../../../context/redux/store'
import { useEffect, useState } from 'react'
import getColorFromImage from '../../../utils/getColorFromImage'
import { setPhotoColor, setPlayingSongColor } from '../../../context/redux/user'
import { useDispatch } from 'react-redux'

const useBackgroundImageColor = () => {
    const dispatch = useDispatch()

    const photoColor = useAppSelector((state) => state.auth.photoColor)
    const playingSongColor = useAppSelector(
        (state) => state.auth.playingSongColor
    )
    const isPlaying = useAppSelector((state) => state.auth.isPlaying)
    const playingSongPhoto = useAppSelector(
        (state) => state.auth.playingSongPhoto
    )

    const [opacity, setOpacity] = useState(0)

    const handleScroll = () => {
        const scrollY = window.pageYOffset
        const opacityValue = scrollY / 200
        setOpacity(opacityValue)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (playingSongPhoto !== '')
            getColorFromImage(playingSongPhoto, (color: string) => {
                dispatch(setPhotoColor({ photoColor: color }))
                dispatch(setPlayingSongColor({ playingSongColor: color }))
            })
    }, [playingSongPhoto])

    return {
        photoColor,
        playingSongColor,
        isPlaying,
        opacity,
    }
}
export default useBackgroundImageColor
