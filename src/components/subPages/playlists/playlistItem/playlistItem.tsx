import React from 'react'
import styles from './playlistItem.module.scss'
import loading from '../../../../animations/skeletonLoading/skeletonLoading.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified
import PlaylistMenu from '../../../sharedComponents/playlistMenu/playlistMenu'
import { CircularProgress } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import usePlaylistItem from './usePlaylistItem'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import TrackObjectFull = SpotifyApi.TrackObjectFull
import { Link } from 'react-router-dom'

interface ItemType {
	item: PlaylistObjectSimplified
}

const PlaylistItem = ({ item }: ItemType) => {
	const {
		isActive,
		setIsActive,
		playlistData,
		isPlaying,
		trackId,
		showSongs,
		playPlaylist,
	} = usePlaylistItem()

	return (
		<>
			<div className={styles.playlist}>
				<div className={styles.playlistData}>
					<img
						className={`${styles.playlistPhoto} ${loading.skeleton}`}
						src={item.images[0]?.url}
					/>
				</div>
			</div>
			<Link to={`/playlist/${item.id}`} className={styles.playlistName}>
				{item.name}
			</Link>
		</>
	)
}
export default PlaylistItem
