import { useEffect, useState } from 'react'
import spotifyApi from '../../services/spotifyApi'
import { useNavigate, useParams } from 'react-router-dom'
import SpotifyApi from 'spotify-web-api-node'
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse
import useAuth from '../../hooks/useAuth'
import getColorFromImage from '../../utils/functions/getColorFromImage'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import { useAppSelector } from '../../context/redux/store'
import RecommendationTrackObject = SpotifyApi.RecommendationTrackObject

const usePlaylist = () => {
    const [imageColor, setImageColor] = useState('#424242')
    const [playlist, setPlaylist] = useState<SinglePlaylistResponse>()
    const [playlistSongs, setPlaylistSongs] = useState<PlaylistTrackObject[]>()
    const [open, setOpen] = useState(false)

    const [recommendedTracks, setRecommendedTracks] =
        useState<RecommendationTrackObject[]>()

    const playlistId = useAppSelector((state) => state.auth.track)
    const isPlaying = useAppSelector((state) => state.auth.isPlaying)
    const isTyping = useAppSelector((state) => state.auth.isUserTyping)
    const track = useAppSelector((state) => state.auth.track)
    const actionTrackUri = useAppSelector((state) => state.auth.actionTrackUri)

    const { id } = useParams()
    const navigate = useNavigate()

    const spotify = useAuth()

    useEffect(() => {
        if (spotify.accessToken && id) {
            spotifyApi.setAccessToken(spotify.accessToken)
            spotifyApi.getPlaylist(id).then((data) => {
                setPlaylist(data.body)
                if (data.body.images[0]) {
                    getColorFromImage(
                        data.body.images[0].url,
                        (color: string) => {
                            setImageColor(color)
                        }
                    )
                }
            })
            spotifyApi.getPlaylistTracks(id).then((data) => {
                setPlaylistSongs(data.body.items)
                const tracks = data.body.items
                    .map((item) => item.track?.id)
                    .slice(0, 3) as string[]
                const artists = data.body.items
                    .map((item) => item.track?.artists[0].id)
                    .slice(0, 2) as string[]
                spotifyApi
                    .getRecommendations({
                        seed_tracks: tracks,
                        seed_artists: artists,
                    })
                    .then((data) => setRecommendedTracks(data.body.tracks))
            })
        }
    }, [id, spotify.accessToken, actionTrackUri])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deletePlaylist = () => {
        if (id) {
            spotifyApi.unfollowPlaylist(id).then(() => navigate('/playlists'))
        }
    }

    return {
        imageColor,
        playlist,
        playlistSongs,
        playlistId,
        isPlaying,
        recommendedTracks,
        isTyping,
        track,
        open,
        handleClickOpen,
        handleClose,
        deletePlaylist,
    }
}
export default usePlaylist
