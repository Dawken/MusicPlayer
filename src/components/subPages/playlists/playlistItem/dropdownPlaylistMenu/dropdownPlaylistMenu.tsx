import React from 'react'
import styles from './dropdownPlaylistMenu.module.scss'
import dayjs from 'dayjs'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import { store, useAppSelector } from '../../../../../redux/store'
import { setSongNumber, setTrack } from '../../../../../redux/user'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

interface PlaylistDataType {
	playlistData: PlaylistTrackObject[]
	uri: string
}

const DropdownPlaylistMenu = ({ playlistData, uri }: PlaylistDataType) => {
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)
	const playingSongId = useAppSelector((state) => state.auth.playingSongId)

	const playSong = (item: PlaylistTrackObject, index: number) => {
		store.dispatch(setTrack({ track: uri }))
		store.dispatch(setSongNumber({ songNumber: index }))
	}

	return (
		<div className={styles.dropdownContainer}>
			<div className={styles.playlistInfo}>
				<span>#</span>
				<span>Title</span>
				<span className={styles.albumName}>Album</span>
				<AccessTimeIcon className={styles.clock} />
			</div>
			{playlistData.map((item, index) => {
				return (
					<div
						className={styles.playlistSong}
						key={item.track?.id}
						onClick={() => playSong(item, index)}
					>
						{item.track?.id === playingSongId && isPlaying ? (
							<img
								className={styles.equalizer}
								src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif'
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
					</div>
				)
			})}
		</div>
	)
}
export default DropdownPlaylistMenu
