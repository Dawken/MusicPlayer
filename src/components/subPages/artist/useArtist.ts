import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import useAuth from '../../../customHooks/useAuth'
import { useParams } from 'react-router-dom'
import SpotifyApi from 'spotify-web-api-node'
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import getColorFromImage from '../../sharedFunctions/getColorFromImage'

const useArtist = () => {
	const spotify = useAuth()

	const { id } = useParams()
	const [artist, setArtist] = useState<SingleArtistResponse>()
	const [imageColor, setImageColor] = useState('')

	useEffect(() => {
		if (spotify.accessToken) {
			spotifyApi.setAccessToken(spotify.accessToken)
			if (id) {
				spotifyApi.getArtist(id).then((data) => {
					setArtist(data.body)
					getColorFromImage(
						data.body.images[0].url,
						(color: string) => {
							setImageColor(color)
						}
					)
				})
			}
		}
	}, [id, spotify.accessToken])
	return {
		artist,
		imageColor,
	}
}
export default useArtist
