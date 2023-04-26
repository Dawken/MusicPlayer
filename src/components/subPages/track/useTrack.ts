import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import useAuth from '../../../customHooks/useAuth'
import SpotifyApi from 'spotify-web-api-node'
import SingleTrackResponse = SpotifyApi.SingleTrackResponse
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import getColorFromImage from '../../sharedFunctions/getColorFromImage'

const useTrack = () => {
	const { id } = useParams()
	const spotify = useAuth()

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

	console.log(imageColor)

	return {
		trackData,
		artist,
		imageColor,
	}
}
export default useTrack
