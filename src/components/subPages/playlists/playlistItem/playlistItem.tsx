import React from 'react'
import styles from './playlistItem.module.scss'
import loading from '../../../../animations/skeletonLoading/skeletonLoading.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified
import DropdownPlaylistMenu from './dropdownPlaylistMenu/dropdownPlaylistMenu'
import { CircularProgress } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import usePlaylistItem from './usePlaylistItem'

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
					<div className={styles.playlistPlayState}>
						{trackId === item.uri && isPlaying ? (
							<img
								className={styles.equalizer}
								src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif'
							/>
						) : (
							<PlayArrowIcon
								className={styles.playIcon}
								onClick={() => playPlaylist(item)}
							/>
						)}
					</div>
					<img
						className={`${styles.playlistPhoto} ${loading.skeleton}`}
						src={item.images[0]?.url}
					/>
					<span className={styles.playlistName}>{item.name}</span>
				</div>
				{isActive ? (
					playlistData.length === 0 ? (
						<div className={styles.loader}>
							<CircularProgress size={30} />
						</div>
					) : (
						<KeyboardArrowUpIcon
							className={styles.arrow}
							onClick={() =>
								setIsActive((prevState) => !prevState)
							}
						/>
					)
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
				{playlistData.length > 0 && (
					<DropdownPlaylistMenu
						playlistData={playlistData}
						uri={item.uri}
					/>
				)}
			</div>
		</>
	)
}
export default PlaylistItem
