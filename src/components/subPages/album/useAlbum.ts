import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '../../../customHooks/useAuth'
import spotifyApi from '../../../shared/spotifyApi'
import getColorFromImage from '../../sharedFunctions/getColorFromImage'
import SpotifyApi from 'spotify-web-api-node'
import SingleAlbumResponse = SpotifyApi.SingleAlbumResponse

const useAlbum = () => {
	const [imageColor, setImageColor] = useState('#424242')
	const [album, setAlbum] = useState<SingleAlbumResponse>()

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
	}
}
export default useAlbum
