import React from 'react'
import styles from './song.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import dayjs from 'dayjs'
import SpotifyApi from 'spotify-web-api-node'
import useSong from './useSong'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteIcon from '@mui/icons-material/Delete'
import AlbumIcon from '@mui/icons-material/Album'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import PersonIcon from '@mui/icons-material/Person'
import {
	Button,
	Fade,
	ListItemIcon,
	MenuItem,
	Paper,
	Popper,
} from '@mui/material'
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state'
import { Link } from 'react-router-dom'
import TrackObjectFull = SpotifyApi.TrackObjectFull

type ItemType = {
	item: TrackObjectFull
	index: number
	uri: string | undefined
}

const Song = ({ item, index, uri }: ItemType) => {
	const {
		isPlaying,
		playingSongId,
		isHovering,
		setIsHovering,
		playSong,
		playingSongColor,
		path,
	} = useSong()

	return (
		<div
			className={styles.playlistSong}
			key={item.id}
			style={{
				backgroundColor:
					item.id === playingSongId && isPlaying
						? playingSongColor
						: 'transparent',
			}}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{item.id === playingSongId && isPlaying ? (
				<img
					className={styles.equalizer}
					src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif'
				/>
			) : isHovering && uri ? (
				<PlayArrowIcon
					className={styles.playIcon}
					onClick={() => playSong(item, index, uri)}
				/>
			) : (
				<div className={styles.songNumber}>{index + 1}</div>
			)}
			<div className={styles.songContainer}>
				<img
					className={styles.songPhoto}
					src={item.album.images[2].url}
				/>
				<div className={styles.songData}>
					<Link to={`/track/${item.id}`} className={styles.songName}>
						{item.name}
					</Link>
					<div className={styles.artistName}>
						{item.artists[0].name}
					</div>
				</div>
			</div>
			<Link to={`/album/${item.album.id}`} className={styles.albumName}>
				{item.album.name}
			</Link>
			<div className={styles.songDurationTime}>
				{dayjs(item.duration_ms).format('mm:ss')}
			</div>
			<PopupState variant='popper' popupId='demo-popup-popper'>
				{(popupState) => (
					<div>
						<Button {...bindToggle(popupState)}>
							<MoreHorizIcon style={{ color: '#fff' }} />
						</Button>
						<Popper {...bindPopper(popupState)} transition>
							{({ TransitionProps }) => (
								<Fade {...TransitionProps} timeout={350}>
									<Paper
										style={{
											background: '#1c1c1c',
											color: '#ffffff',
											borderRadius: '12px',
											justifyContent: 'space-between',
										}}
									>
										<Link
											to={`/artist/${item.artists[0].id}`}
											className={styles.optionsText}
										>
											<MenuItem sx={{ p: 2 }}>
												<ListItemIcon>
													<PersonIcon
														style={{
															color: '#fff',
														}}
													/>
												</ListItemIcon>
												Show artist
											</MenuItem>
										</Link>
										<Link
											to={`/album/${item.album.id}`}
											className={styles.optionsText}
										>
											<MenuItem sx={{ p: 2 }}>
												<ListItemIcon>
													<AlbumIcon
														style={{
															color: '#fff',
														}}
													/>
												</ListItemIcon>
												Show album
											</MenuItem>
										</Link>
										<Link
											to={`/track/${item.id}`}
											className={styles.optionsText}
										>
											<MenuItem sx={{ p: 2 }}>
												<ListItemIcon>
													<MusicNoteIcon
														style={{
															color: '#fff',
														}}
													/>
												</ListItemIcon>
												Go to the song
											</MenuItem>
										</Link>
										{path === 'playlists' && (
											<MenuItem sx={{ p: 2 }}>
												<ListItemIcon>
													<DeleteIcon
														style={{
															color: '#fff',
														}}
													/>
												</ListItemIcon>
												Delete song
											</MenuItem>
										)}
									</Paper>
								</Fade>
							)}
						</Popper>
					</div>
				)}
			</PopupState>
		</div>
	)
}
export default Song
