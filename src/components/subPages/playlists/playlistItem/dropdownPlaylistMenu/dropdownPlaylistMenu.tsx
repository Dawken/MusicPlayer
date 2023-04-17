import React from 'react'
import styles from './dropdownPlaylistMenu.module.scss'
import dayjs from 'dayjs'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import { store } from '../../../../../redux/store'
import { setSongNumber, setTrack } from '../../../../../redux/user'

interface PlaylistDataType {
	playlistData: PlaylistTrackObject[]
	uri: string
}

const DropdownPlaylistMenu = ({ playlistData, uri }: PlaylistDataType) => {
	const playSong = (item: PlaylistTrackObject, index: number) => {
		store.dispatch(setTrack({ track: uri }))
		store.dispatch(setSongNumber({ songNumber: index }))
	}

	return (
		<div className={styles.dropdownContainer}>
			{playlistData.map((item, index) => {
				return (
					<div
						className={styles.playlistSong}
						key={item.track?.id}
						onClick={() => playSong(item, index)}
					>
						<div className={styles.songContainer}>
							<img
								className={styles.songPhoto}
								src={item.track?.album.images[2].url}
							></img>
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
