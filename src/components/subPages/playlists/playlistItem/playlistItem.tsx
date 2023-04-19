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
import { store } from '../../../../redux/store'
import { setSongNumber, setTrack } from '../../../../redux/user'

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
	const playPlaylist = () => {
		store.dispatch(setTrack({ track: item.uri }))
		store.dispatch(setSongNumber({ songNumber: 0 }))
	}
	return (
		<>
			<div className={styles.playlist} onClick={() => showSongs(item.id)}>
				<div className={styles.playlistData}>
					<img
						onClick={playPlaylist}
						className={`${styles.playlistPhoto} ${loading.skeleton}`}
						src={item.images[0]?.url}
					/>
					<span className={styles.playlistName}>{item.name}</span>
				</div>
				{isActive ? (
					<KeyboardArrowUpIcon className={styles.arrow} />
				) : (
					<KeyboardArrowDownOutlinedIcon className={styles.arrow} />
				)}
			</div>
			<div
				className={
					isActive
						? `${styles.dropdownMenu} ${styles.active}`
						: `${styles.dropdownMenu}`
				}
			>
				<DropdownPlaylistMenu playlistData={playlistData} uri={item.uri} />
			</div>
		</>
	)
}
export default PlaylistItem
