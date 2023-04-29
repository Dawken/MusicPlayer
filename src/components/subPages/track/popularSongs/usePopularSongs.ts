import { useEffect, useState } from 'react'
import spotifyApi from '../../../../shared/spotifyApi'
import SpotifyApi from 'spotify-web-api-node'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import { useParams } from 'react-router-dom'
import SingleArtistResponse = SpotifyApi.SingleArtistResponse

const usePopularSongs = (artist: SingleArtistResponse | undefined) => {
	const { id } = useParams()

	const [popularSongs, setPopularSongs] = useState<TrackObjectFull[]>([])

	useEffect(() => {
		if (artist) {
			spotifyApi.getArtistTopTracks(artist.id, 'PL').then((data) => {
				if (data.body.tracks) {
					setPopularSongs(data.body.tracks)
				}
			})
		}
	}, [artist, id])
	return {
		popularSongs,
	}
}
export default usePopularSongs
