import React from 'react'
import styles from './dropdownPlaylistMenu.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DropdownItem from './dropdownItem/dropdownItem'

interface PlaylistDataType {
	playlistData: PlaylistTrackObject[]
	uri: string
}

const DropdownPlaylistMenu = ({ playlistData, uri }: PlaylistDataType) => {
	return (
		<div className={styles.dropdownContainer}>
			<div className={styles.playlistInfo}>
				<span>#</span>
				<span>Title</span>
				<span className={styles.album}>Album</span>
				<AccessTimeIcon className={styles.clock} />
			</div>
			{playlistData.map((item, index) => {
				return (
					<DropdownItem
						item={item}
						index={index}
						uri={uri}
						key={index}
					/>
				)
			})}
		</div>
	)
}
export default DropdownPlaylistMenu
