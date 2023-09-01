import { useAppSelector } from '../../../../context/redux/store'
import { useState } from 'react'
import addSongToPlaylist from '../../../../utils/addSongToPlaylist'
import spotifyApi from '../../../../services/spotifyApi'
import SpotifyApi from 'spotify-web-api-node'
import RecommendationTrackObject = SpotifyApi.RecommendationTrackObject
import TrackObjectSimplified = SpotifyApi.TrackObjectSimplified
import TrackObjectFull = SpotifyApi.TrackObjectFull

type AlbumType = {
    item: TrackObjectFull | RecommendationTrackObject | TrackObjectSimplified
}

const isAlbum = (
    item: TrackObjectSimplified | TrackObjectFull
): item is TrackObjectFull => {
    return (item as TrackObjectFull).album !== undefined
}

const useSong = ({ item }: AlbumType) => {
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
    const album = isAlbum(item) ? item.album : undefined

    return {
        isPlaying,
        playingSongId,
        isHovering,
        setIsHovering,
        playSong,
        playingSongColor,
        addSongToPlaylist,
        album,
    }
}
export default useSong
