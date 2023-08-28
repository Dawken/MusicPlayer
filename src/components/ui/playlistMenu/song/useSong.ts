import { useAppSelector } from '../../../../context/redux/store'
import { useEffect, useState } from 'react'
import addSongToPlaylist from '../../../../utils/addSongToPlaylist'
import spotifyApi from '../../../../services/spotifyApi'
import useAuth from '../../../../hooks/useAuth'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified
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

    const [userPlaylists, setUserPlaylists] =
        useState<PlaylistObjectSimplified[]>()

    const spotify = useAuth()

    useEffect(() => {
        if (spotify.accessToken) {
            spotifyApi.setAccessToken(spotify.accessToken)
            spotifyApi
                .getMe()
                .then((data) =>
                    spotifyApi
                        .getUserPlaylists(data.body.id)
                        .then((data) => setUserPlaylists(data.body.items))
                )
        }
    }, [spotify.accessToken])

    return {
        isPlaying,
        playingSongId,
        isHovering,
        setIsHovering,
        playSong,
        playingSongColor,
        addSongToPlaylist,
        album,
        userPlaylists,
    }
}
export default useSong
