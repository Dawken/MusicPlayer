import React from 'react'
import PlaylistMenu from '../../../components/ui/playlistMenu/playlistMenu'
import SpotifyApi from 'spotify-web-api-node'
import SingleTrackResponse = SpotifyApi.SingleTrackResponse
import useAlbumSongs from './useAlbumSongs'

const AlbumSongs = ({
    trackData,
    albumId,
}: {
    trackData: SingleTrackResponse | undefined
    albumId: string | undefined
}) => {
    const { album } = useAlbumSongs(trackData)
    return <PlaylistMenu playlistData={album} uri={albumId} />
}
export default AlbumSongs
