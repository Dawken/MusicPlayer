import { useState } from 'react'
import { store, useAppSelector } from '../../../../redux/store'
import spotifyApi from '../../../../shared/spotifyApi'
import { setSongNumber, setTrack } from '../../../../redux/user'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified

const usePlaylistItem = () => {
	const [isActive, setIsActive] = useState(false)
	const [playlistData, setPlaylistData] = useState<PlaylistTrackObject[]>([])
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)
	const trackId = useAppSelector((state) => state.auth.track)

	const showSongs = (id: string) => {
		spotifyApi.getPlaylistTracks(id).then((data) => {
			if (data.body.items) {
				setPlaylistData(data.body.items)
			}
		})
		setIsActive((prevState) => !prevState)
	}
	const playPlaylist = (item: PlaylistObjectSimplified) => {
		store.dispatch(setTrack({ track: item.uri }))
		store.dispatch(setSongNumber({ songNumber: 0 }))
	}
	return {
		isActive,
		setIsActive,
		playlistData,
		isPlaying,
		trackId,
		showSongs,
		playPlaylist,
	}
}
export default usePlaylistItem
