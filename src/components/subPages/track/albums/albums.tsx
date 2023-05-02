import React from 'react'
import PlaylistMenu from '../../../sharedComponents/playlistMenu/playlistMenu'
import SpotifyApi from 'spotify-web-api-node'
import SingleTrackResponse = SpotifyApi.SingleTrackResponse
import useAlbums from './useAlbums'

const Albums = ({
	trackData,
	albumId,
}: {
	trackData: SingleTrackResponse | undefined
	albumId: string | undefined
}) => {
	const { album } = useAlbums(trackData)
	return <PlaylistMenu playlistData={album} uri={albumId} />
}
export default Albums
