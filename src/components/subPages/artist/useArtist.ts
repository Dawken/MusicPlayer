import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import useAuth from '../../../customHooks/useAuth'
import { useParams } from 'react-router-dom'
import SpotifyApi from 'spotify-web-api-node'
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import getColorFromImage from '../../sharedFunctions/getColorFromImage'
import { useAppSelector } from '../../../redux/store'

const useArtist = () => {
	const spotify = useAuth()

	const { id } = useParams()
	const [artist, setArtist] = useState<SingleArtistResponse>()
	const [recommendedArtists, setRecommendedArtists] =
		useState<ArtistObjectFull[]>()
	const [imageColor, setImageColor] = useState('')
	const [playingSongArtistId, setPlayingSongArtistId] = useState('')

	const playingSongId = useAppSelector((state) => state.auth.playingSongId)
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)

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
				spotifyApi
					.getArtistRelatedArtists(id)
					.then((data) => setRecommendedArtists(data.body.artists))
			}
		}
	}, [id, spotify.accessToken])

	useEffect(() => {
		if (spotify.accessToken) {
			spotifyApi.setAccessToken(spotify.accessToken)
			spotifyApi
				.getTrack(playingSongId)
				.then((data) => setPlayingSongArtistId(data.body.artists[0].id))
		}
	}, [playingSongId, id])

	return {
		artist,
		imageColor,
		recommendedArtists,
		playingSongArtistId,
		isPlaying,
	}
}
export default useArtist
