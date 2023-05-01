import React from 'react'
import styles from './dropdownItem.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import dayjs from 'dayjs'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import useDropdownItem from './useDropdownItem'
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
import setSong from '../../../../../sharedFunctions/setSong'

type ItemType = {
	item: PlaylistTrackObject
	index: number
	uri: string
}

const DropdownItem = ({ item, index, uri }: ItemType) => {
	const { isPlaying, playingSongId, isHovering, setIsHovering, trackId } =
		useDropdownItem()

	return (
		<div
			className={styles.playlistSong}
			key={item.track?.id}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{item.track?.id === playingSongId && isPlaying ? (
				<img
					className={styles.equalizer}
					src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif'
				/>
			) : isHovering ? (
				<PlayArrowIcon
					className={styles.playIcon}
					onClick={() => setSong(uri, index, trackId)}
				/>
			) : (
				<div className={styles.songNumber}>{index + 1}</div>
			)}
			<div className={styles.songContainer}>
				<img
					className={styles.songPhoto}
					src={item.track?.album.images[2].url}
				/>
				<div className={styles.songData}>
					<Link
						to={`/track/${item.track?.id}`}
						className={styles.songName}
					>
						{item.track?.name}
					</Link>
					<div className={styles.artistName}>
						{item.track?.artists[0].name}
					</div>
				</div>
			</div>
			<div className={styles.albumName}>{item.track?.album.name}</div>
			<div className={styles.songDurationTime}>
				{dayjs(item.track?.duration_ms).format('mm:ss')}
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
										<MenuItem sx={{ p: 2 }}>
											<ListItemIcon>
												<PersonIcon
													style={{ color: '#fff' }}
												/>
											</ListItemIcon>
											Show artist
										</MenuItem>
										<MenuItem sx={{ p: 2 }}>
											<ListItemIcon>
												<AlbumIcon
													style={{ color: '#fff' }}
												/>
											</ListItemIcon>
											Show album
										</MenuItem>
										<MenuItem sx={{ p: 2 }}>
											<ListItemIcon>
												<MusicNoteIcon
													style={{ color: '#fff' }}
												/>
											</ListItemIcon>
											<Link
												to={`/track/${item.track?.id}`}
												className={styles.optionsText}
											>
												Go to the song
											</Link>
										</MenuItem>
										<MenuItem sx={{ p: 2 }}>
											<ListItemIcon>
												<DeleteIcon
													style={{ color: '#fff' }}
												/>
											</ListItemIcon>
											Delete song
										</MenuItem>
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
export default DropdownItem
