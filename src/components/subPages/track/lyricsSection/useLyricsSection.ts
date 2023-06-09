import { useParams } from 'react-router-dom'
import { store, useAppSelector } from '../../../../redux/store'
import spotifyApi from '../../../../shared/spotifyApi'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import useAuth from '../../../../customHooks/useAuth'
import { setSongNumber, setTrack } from '../../../../redux/user'

const useLyricsSection = () => {
	const spotify = useAuth()
	const { id } = useParams()
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)
	const playingSongId = useAppSelector((state) => state.auth.playingSongId)
	const trackId = useAppSelector((state) => state.auth.track)
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

	const pauseSong = () => {
		spotifyApi.pause()
	}
	const playSong = (index: number, uri: string) => {
		store.dispatch(setTrack({ track: uri }))
		store.dispatch(setSongNumber({ songNumber: index }))
		spotifyApi.play({
			context_uri: uri,
			offset: { position: index },
		})
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
		trackId,
		pauseSong,
		playSong,
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
