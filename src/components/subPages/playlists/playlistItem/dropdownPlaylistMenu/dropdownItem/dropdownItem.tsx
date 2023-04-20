import React from 'react'
import styles from './dropdownItem.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import dayjs from 'dayjs'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import useDropdownItem from './useDropdownItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

type ItemType = {
	item: PlaylistTrackObject
	index: number
	uri: string
}

const DropdownItem = ({ item, index, uri }: ItemType) => {
	const { isPlaying, playingSongId, isHovering, setIsHovering, playSong } =
		useDropdownItem()

	return (
		<div
			className={styles.playlistSong}
			key={item.track?.id}
			onClick={() => playSong(item, index, uri)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{item.track?.id === playingSongId && isPlaying ? (
				<img
					className={styles.equalizer}
					src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif'
				/>
			) : isHovering ? (
				<PlayArrowIcon className={styles.playIcon} />
			) : (
				<div className={styles.songNumber}>{index + 1}</div>
			)}
			<div className={styles.songContainer}>
				<img
					className={styles.songPhoto}
					src={item.track?.album.images[2].url}
				/>
				<div className={styles.songData}>
					<div className={styles.songName}>{item.track?.name}</div>
					<div className={styles.artistName}>
						{item.track?.artists[0].name}
					</div>
				</div>
			</div>
			<div className={styles.albumName}>{item.track?.album.name}</div>
			<div className={styles.songDurationTime}>
				{dayjs(item.track?.duration_ms).format('mm:ss')}
			</div>
			<MoreHorizIcon className={styles.options} />
		</div>
	)
}
export default DropdownItem
