import React from 'react'
import styles from './song.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import dayjs from 'dayjs'
import SpotifyApi from 'spotify-web-api-node'
import useSong from './useSong'
import { Link } from 'react-router-dom'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import SongOptionsMenu from '../../songOptionsMenu/songOptionsMenu'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified

type ItemType = {
	item: TrackObjectFull
	index: number
	uri: string | undefined
	userPlaylists: PlaylistObjectSimplified[] | undefined
	isCreatingPlaylist?: boolean
	playlist?: PlaylistObjectSimplified
}

const Song = ({
	item,
	index,
	uri,
	userPlaylists,
	isCreatingPlaylist,
	playlist,
}: ItemType) => {
	const {
		isPlaying,
		playingSongId,
		isHovering,
		setIsHovering,
		playSong,
		playingSongColor,
		addSongToPlaylist,
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
					onClick={() => playSong(index, uri)}
				/>
			) : (
				<div className={styles.songNumber}>
					{!isCreatingPlaylist && index + 1}
				</div>
			)}
			<div className={styles.songContainer}>
				<img
					className={styles.songPhoto}
					src={item.album.images[0].url}
				/>
				<div className={styles.songData}>
					<Link to={`/track/${item.id}`} className={styles.songName}>
						{item.name}
					</Link>
					<Link
						to={`/artist/${item.artists[0].id}`}
						className={styles.artistName}
					>
						{item.artists[0].name}
					</Link>
				</div>
			</div>
			<Link to={`/album/${item.album.id}`} className={styles.albumName}>
				{item.album.name}
			</Link>
			<div className={styles.songDurationTime}>
				{dayjs(item.duration_ms).format('mm:ss')}
			</div>
			{isCreatingPlaylist && uri && playlist ? (
				<button
					className={styles.addSong}
					onClick={() => addSongToPlaylist(playlist, [uri])}
				>
					Add
				</button>
			) : (
				<SongOptionsMenu
					item={item}
					userPlaylists={userPlaylists}
					playlistId={uri}
				/>
			)}
		</div>
	)
}
export default Song
