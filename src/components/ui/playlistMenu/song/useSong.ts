import { useAppSelector } from '../../../../context/redux/store'
import { useState } from 'react'
import addSongToPlaylist from '../../../../utils/functions/addSongToPlaylist'
import spotifyApi from '../../../../services/spotifyApi'

const useSong = () => {
    const isPlaying = useAppSelector((state) => state.auth.isPlaying)
    const playingSongId = useAppSelector((state) => state.auth.playingSongId)
    const playingSongColor = useAppSelector(
        (state) => state.auth.playingSongColor
    )

    const [isHovering, setIsHovering] = useState(false)

    const playSong = (index: number, uri: string) => {
        spotifyApi.play({
            context_uri: uri,
            offset: { position: index },
        })
    }

    return {
        isPlaying,
        playingSongId,
        isHovering,
        setIsHovering,
        playSong,
        playingSongColor,
        addSongToPlaylist,
    }
}
export default useSong
