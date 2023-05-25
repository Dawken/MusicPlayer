import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '../../../customHooks/useAuth'
import spotifyApi from '../../../shared/spotifyApi'
import getColorFromImage from '../../sharedFunctions/getColorFromImage'
import SpotifyApi from 'spotify-web-api-node'
import SingleAlbumResponse = SpotifyApi.SingleAlbumResponse
import { useAppSelector } from '../../../redux/store'

const useAlbum = () => {
	const [imageColor, setImageColor] = useState('#424242')
	const [album, setAlbum] = useState<SingleAlbumResponse>()

	const playlistId = useAppSelector((state) => state.auth.track)
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)

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
	}
}
export default useAlbum
