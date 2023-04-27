import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import spotifyApi from '../../../shared/spotifyApi'
import useAuth from '../../../customHooks/useAuth'
import SpotifyApi from 'spotify-web-api-node'
import SingleTrackResponse = SpotifyApi.SingleTrackResponse
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import getColorFromImage from '../../sharedFunctions/getColorFromImage'
import { useQuery } from 'react-query'
import musicPlayerBackend from '../../../config/axiosConfig'
import { store } from '../../../redux/store'
import { setSongNumber, setTrack } from '../../../redux/user'
import { toast } from 'react-toastify'

const useTrack = () => {
	const { id } = useParams()
	const spotify = useAuth()

	const [trackData, setTrackData] = useState<SingleTrackResponse>()
	const [artist, setArtist] = useState<SingleArtistResponse>()
	const [imageColor, setImageColor] = useState('')
	const [songLyrics, setSongLyrics] = useState('')
	const [isTrackFollowed, setIsTrackFollowed] = useState(false)

	const { isLoading } = useQuery(['lyrics', artist?.name], async () => {
		const response = await musicPlayerBackend.get('/api/lyrics', {
			params: { artist: artist?.name, track: trackData?.name },
		})
		setSongLyrics(response.data.lyrics)
	})

	const setSong = (imageUrl: string, item: string, index: number) => {
		store.dispatch(setTrack({ track: item }))
		store.dispatch(setSongNumber({ songNumber: index }))
	}

	const addToSavedTracks = () => {
		if (id) {
			spotifyApi.addToMySavedTracks([id]).then(() => {
				toast.success('Added to liked tracks')
				setIsTrackFollowed(true)
			})
		}
	}
	const removeFromSavedTracks = () => {
		if (id) {
			spotifyApi.removeFromMySavedTracks([id]).then(() => {
				toast.success('Removed from liked tracks')
				setIsTrackFollowed(false)
			})
		}
	}

	useEffect(() => {
		setSongLyrics('')
		if (spotify.accessToken) {
			spotifyApi.setAccessToken(spotify.accessToken)
			if (id) {
				spotifyApi.containsMySavedTracks([id]).then((data) => {
					setIsTrackFollowed(data.body[0])
				})
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
		songLyrics,
		setSong,
		addToSavedTracks,
		removeFromSavedTracks,
		isTrackFollowed,
	}
}
export default useTrack
