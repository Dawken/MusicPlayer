import React, { useState } from 'react'
import styles from './playlistItem.module.scss'
import loading from '../../../../animations/skeletonLoading/skeletonLoading.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import spotifyApi from '../../../../shared/spotifyApi'
import DropdownPlaylistMenu from './dropdownPlaylistMenu/dropdownPlaylistMenu'

interface ItemType {
	item: PlaylistObjectSimplified
}

const PlaylistItem = ({ item }: ItemType) => {
	const [isActive, setIsActive] = useState(false)
	const [playlistData, setPlaylistData] = useState<PlaylistTrackObject[]>([])

	const showSongs = (id: string) => {
		spotifyApi.getPlaylistTracks(id).then((data) => {
			if (data.body.items) {
				setPlaylistData(data.body.items)
			}
		})
		setIsActive((prevState) => !prevState)
	}

	return (
		<>
			<div className={styles.playlist}>
				<div className={styles.playlistData}>
					<img
						className={`${styles.playlistPhoto} ${loading.skeleton}`}
						src={item.images[0]?.url}
					/>
					<div className={styles.playlistName}>{item.name}</div>
				</div>
				{isActive ? (
					<KeyboardArrowUpIcon
						className={styles.arrow}
						onClick={() => showSongs(item.id)}
					/>
				) : (
					<KeyboardArrowDownOutlinedIcon
						className={styles.arrow}
						onClick={() => showSongs(item.id)}
					/>
				)}
			</div>
			<div
				className={
					isActive
						? `${styles.dropdownMenu} ${styles.active}`
						: `${styles.dropdownMenu}`
				}
			>
				<DropdownPlaylistMenu playlistData={playlistData} />
			</div>
		</>
	)
}
export default PlaylistItem
