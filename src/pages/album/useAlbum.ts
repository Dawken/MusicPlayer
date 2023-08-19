import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import spotifyApi from '../../services/spotifyApi'
import getColorFromImage from '../../utils/getColorFromImage'
import SpotifyApi from 'spotify-web-api-node'
import SingleAlbumResponse = SpotifyApi.SingleAlbumResponse
import { useAppSelector } from '../../context/redux/store'

const useAlbum = () => {
    const [imageColor, setImageColor] = useState('#424242')
    const [album, setAlbum] = useState<SingleAlbumResponse>()

    const playlistId = useAppSelector((state) => state.auth.track)
    const isPlaying = useAppSelector((state) => state.auth.isPlaying)
    const track = useAppSelector((state) => state.auth.track)

    const { id } = useParams()

    const spotify = useAuth()

    useEffect(() => {
        if (spotify.accessToken && id) {
            spotifyApi.setAccessToken(spotify.accessToken)
            spotifyApi.getAlbum(id).then((data) => {
                setAlbum(data.body)
                if (data.body.images[0]) {
                    getColorFromImage(
                        data.body.images[0].url,
                        (color: string) => {
                            setImageColor(color)
                        }
                    )
                }
            })
        }
    }, [spotify.accessToken, id])
    return {
        imageColor,
        album,
        playlistId,
        isPlaying,
        track,
    }
}
export default useAlbum
