import useAuth from '../../hooks/useAuth'
import { useAppSelector } from '../../context/redux/store'
import { useDispatch } from 'react-redux'

const useMusicPlayer = () => {
    const spotify = useAuth()
    const track = useAppSelector((state) => state.auth.track)
    const songNumber = useAppSelector((state) => state.auth.songNumber)
    const playingSongColor = useAppSelector(
        (state) => state.auth.playingSongColor
    )

    const dispatch = useDispatch()

    return {
        spotify,
        track,
        songNumber,
        playingSongColor,
        dispatch,
    }
}
export default useMusicPlayer
