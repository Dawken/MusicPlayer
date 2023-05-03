import { useEffect, useState } from 'react'
import spotifyApi from '../../../../shared/spotifyApi'
import SpotifyApi from 'spotify-web-api-node'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import SingleTrackResponse = SpotifyApi.SingleTrackResponse

const useAlbums = (trackData: SingleTrackResponse | undefined) => {
	const [album, setAlbum] = useState<TrackObjectFull[]>([])
	useEffect(() => {
		if (trackData)
			spotifyApi
				.getAlbumTracks(trackData.album.id)
				.then((data) => {
					const trackIds = data.body.items.map((item) => item.id)
					return Promise.all(
						trackIds.map((trackId) => spotifyApi.getTrack(trackId))
					)
				})
				.then((tracksData) => {
					const tracks = tracksData.map((track) => track.body)
					setAlbum(tracks)
				})
				.catch((err) => {
					console.log('Error getting albums tracks:', err)
				})
	}, [trackData])
	return {
		album,
	}
}
export default useAlbums
