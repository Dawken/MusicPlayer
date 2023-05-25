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
					<Link
						to={`/playlist/${item.id}`}
						className={styles.playlistName}
					>
						{item.name}
					</Link>
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
					<PlaylistMenu
						playlistData={
							playlistData as
								| (PlaylistTrackObject & {
										track?: TrackObjectFull | undefined
								  })[]
								| TrackObjectFull[]
						}
						uri={item.uri}
					/>
				)}
			</div>
		</>
	)
}
export default PlaylistItem
