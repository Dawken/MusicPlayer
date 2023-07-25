import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import spotifyApi from '../../services/spotifyApi'
import useAuth from '../../hooks/useAuth'
import SpotifyApi from 'spotify-web-api-node'
import SingleTrackResponse = SpotifyApi.SingleTrackResponse
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import getColorFromImage from '../../utils/getColorFromImage'
import { useQuery } from 'react-query'
import musicPlayerBackend from '../../lib/axiosConfig'

const useTrack = () => {
    const spotify = useAuth()

    const { id } = useParams()

    const [trackData, setTrackData] = useState<SingleTrackResponse>()
    const [artist, setArtist] = useState<SingleArtistResponse>()
    const [imageColor, setImageColor] = useState('')

    useEffect(() => {
        if (spotify.accessToken) {
            spotifyApi.setAccessToken(spotify.accessToken)
            if (id) {
                spotifyApi.getTrack(id).then((data) => {
                    setTrackData(data.body)
                    getColorFromImage(
                        data.body.album.images[0].url,
                        (color: string) => {
                            setImageColor(color)
                        }
                    )
                    spotifyApi
                        .getArtist(data.body.artists[0].id)
                        .then((data) => {
                            setArtist(data.body)
                        })
                })
            }
        }
    }, [id, spotify.accessToken])

    const { data: songLyrics, isLoading } = useQuery(
        [trackData?.name, id],
        async () => {
            const response = await musicPlayerBackend.get('/api/lyrics', {
                params: { artist: artist?.name, track: trackData?.name },
            })
            return response.data.lyrics
        }
    )

    return {
        trackData,
        artist,
        imageColor,
        songLyrics,
        isLoading,
    }
}
export default useTrack
