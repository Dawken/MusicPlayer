import React from 'react'
import styles from './playlistMenu.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Song from './song/song'
import TrackObjectFull = SpotifyApi.TrackObjectFull

type PlaylistDataType = {
	playlistData:
		| (PlaylistTrackObject & { track?: TrackObjectFull })[]
		| TrackObjectFull[]
	uri?: string | undefined
	isCreatingPlaylist?: boolean
}

const isPlaylistTrackObject = (
	item: PlaylistTrackObject | TrackObjectFull
): item is PlaylistTrackObject => {
	return (item as PlaylistTrackObject).track !== undefined
}

const PlaylistMenu = ({
	playlistData,
	uri,
	isCreatingPlaylist,
}: PlaylistDataType) => {
	return (
		<div className={styles.playlistMenu}>
			<div className={styles.playlistInfo}>
				<span>#</span>
				<span>Title</span>
				<span className={styles.album}>Album</span>
				<AccessTimeIcon className={styles.clock} />
			</div>
			{playlistData.map((item, index) => {
				const track = isPlaylistTrackObject(item) ? item.track : item
				return (
					<Song
						item={track}
						index={index}
						uri={uri ?? track.id}
						key={index}
						isCreatingPlaylist={isCreatingPlaylist}
					/>
				)
			})}
		</div>
	)
}
export default PlaylistMenu
