import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import SpotifyApi from 'spotify-web-api-node'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import { useParams } from 'react-router-dom'
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified
import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified

type PopularType = {
    songs: TrackObjectFull[]
    albums: AlbumObjectSimplified[]
}

const usePopularSongsAlbums = (
    artist: SingleArtistResponse | ArtistObjectSimplified | undefined
) => {
    const { id } = useParams()

    const [popular, setPopular] = useState<PopularType>({
        songs: [],
        albums: [],
    })

    useEffect(() => {
        if (artist) {
            spotifyApi.getArtistTopTracks(artist.id, 'PL').then((data) => {
                if (data.body.tracks) {
                    setPopular((prevState) => ({
                        ...prevState,
                        songs: data.body.tracks,
                    }))
                }
            })
            spotifyApi.getArtistAlbums(artist.id).then((data) => {
                if (data.body.items) {
                    setPopular((prevState) => ({
                        ...prevState,
                        albums: data.body.items?.filter(
                            (song, index) =>
                                data.body.items.findIndex(
                                    (item) => item.name === song.name
                                ) === index
                        ),
                    }))
                }
            })
        }
    }, [artist, id])

    return {
        popular,
    }
}
export default usePopularSongsAlbums
