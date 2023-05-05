import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import getColorFromImage from '../../sharedFunctions/getColorFromImage'
import useAuth from '../../../customHooks/useAuth'
import { useParams } from 'react-router-dom'
import SpotifyApi from 'spotify-web-api-node'
import SingleArtistResponse = SpotifyApi.SingleArtistResponse

const useArtist = () => {
	const spotify = useAuth()

	const { id } = useParams()
	const [artist, setArtist] = useState<SingleArtistResponse>()
	useEffect(() => {
		if (spotify.accessToken) {
			spotifyApi.setAccessToken(spotify.accessToken)
			if (id) {
				spotifyApi.getArtist(id).then((data) => {
					setArtist(data.body)
				})
			}
		}
	}, [id, spotify.accessToken])
	return {
		artist,
	}
}
export default useArtist
