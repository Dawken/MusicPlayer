import { useParams } from 'react-router-dom'
import { store, useAppSelector } from '../../../../redux/store'
import { setSongNumber, setTrack } from '../../../../redux/user'
import spotifyApi from '../../../../shared/spotifyApi'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import musicPlayerBackend from '../../../../config/axiosConfig'
import SpotifyApi from 'spotify-web-api-node'
import SingleTrackResponse = SpotifyApi.SingleTrackResponse
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import useAuth from '../../../../customHooks/useAuth'

const useLyricsSection = ({
	trackData,
	artist,
}: {
	trackData: SingleTrackResponse | undefined
	artist: SingleArtistResponse | undefined
}) => {
	const spotify = useAuth()
	const { id } = useParams()
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)
	const playingSongId = useAppSelector((state) => state.auth.playingSongId)
	const lyricsWidth = [
		200, 50, 108, 60, 240, 160, 80, 220, 200, 70, 180, 240, 50, 160, 220,
		60, 200, 100, 240, 160, 220, 200, 180, 240, 160, 220,
	]
	const [isTrackFollowed, setIsTrackFollowed] = useState(false)

	useEffect(() => {
		if (id && spotify.accessToken) {
			spotifyApi.setAccessToken(spotify.accessToken)
			spotifyApi.containsMySavedTracks([id]).then((data) => {
				setIsTrackFollowed(data.body[0])
			})
		}
	}, [id, spotify.accessToken])

	const setSong = (imageUrl: string, item: string, index: number) => {
		store.dispatch(setTrack({ track: item }))
		store.dispatch(setSongNumber({ songNumber: index }))
		if (playingSongId === id) {
			spotifyApi.play()
		} else {
			spotifyApi.play({
				context_uri: item,
				offset: { position: index },
			})
		}
	}

	const pauseSong = () => {
		spotifyApi.pause()
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

	const { data: songLyrics, isLoading } = useQuery(
		['lyrics', artist?.name],
		async () => {
			const response = await musicPlayerBackend.get('/api/lyrics', {
				params: { artist: artist?.name, track: trackData?.name },
			})
			return response.data.lyrics
		}
	)
	return {
		songLyrics,
		setSong,
		pauseSong,
		isPlaying,
		playingSongId,
		id,
		addToSavedTracks,
		removeFromSavedTracks,
		lyricsWidth,
		isLoading,
		isTrackFollowed,
	}
}
export default useLyricsSection
