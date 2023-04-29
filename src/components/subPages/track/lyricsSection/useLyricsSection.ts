import { useParams } from 'react-router-dom'
import { store, useAppSelector } from '../../../../redux/store'
import { setSongNumber, setTrack } from '../../../../redux/user'
import spotifyApi from '../../../../shared/spotifyApi'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import useAuth from '../../../../customHooks/useAuth'

const useLyricsSection = () => {
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

	return {
		setSong,
		pauseSong,
		isPlaying,
		playingSongId,
		id,
		addToSavedTracks,
		removeFromSavedTracks,
		lyricsWidth,
		isTrackFollowed,
	}
}
export default useLyricsSection
