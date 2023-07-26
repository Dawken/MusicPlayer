import { useAppSelector } from '../../../context/redux/store'
import { setPhotoColor } from '../../../context/redux/user'
import getColorFromImage from '../../../utils/functions/getColorFromImage'
import { useDispatch } from 'react-redux'

const useTrackCard = () => {
    const playingSongColor = useAppSelector(
        (state) => state.auth.playingSongColor
    )
    const trackId = useAppSelector((state) => state.auth.track)

    const dispatch = useDispatch()

    const handleHover = (imageUrl: string) => {
        getColorFromImage(imageUrl, (color: string) => {
            dispatch(setPhotoColor({ photoColor: color }))
        })
    }

    const handleMouseLeave = () => {
        dispatch(setPhotoColor({ photoColor: playingSongColor }))
    }
    return {
        trackId,
        handleHover,
        handleMouseLeave,
    }
}
export default useTrackCard
