import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import useAuth from '../../../customHooks/useAuth'
import SpotifyApi from 'spotify-web-api-node'
import SingleTrackResponse = SpotifyApi.SingleTrackResponse
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import getColorFromImage from '../../sharedFunctions/getColorFromImage'
import { useMutation, useQuery } from 'react-query'
import musicPlayerBackend from '../../../config/axiosConfig'

const useTrack = () => {
	const { id } = useParams()
	const spotify = useAuth()

	const [trackData, setTrackData] = useState<SingleTrackResponse>()
	const [artist, setArtist] = useState<SingleArtistResponse>()
	const [imageColor, setImageColor] = useState('')

	console.log(trackData)

	const { isLoading, data } = useQuery(['lyrics', artist?.name], async () => {
		const response = await musicPlayerBackend.get('/api/lyrics', {
			params: { artist: artist?.name, track: trackData?.name },
		})
		return response.data.lyrics
	})
	const lyrics = data?.split(/\r?\n/)

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

	return {
		trackData,
		artist,
		imageColor,
		lyrics,
	}
}
export default useTrack
