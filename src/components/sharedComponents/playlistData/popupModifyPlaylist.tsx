import { Button, Dialog, IconButton } from '@mui/material'
import React, { useState } from 'react'
import styles from './popupModifyPlaylist.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse

type PopupDeletePlaylistProps = {
	open: boolean
	handleClose: () => void
	playlist: SinglePlaylistResponse
}

const PopupModifyPlaylist: React.FC<PopupDeletePlaylistProps> = ({
	open,
	handleClose,
	playlist,
}) => {
	const [playlistName, setPlaylistName] = useState(playlist.name)

	const [playlistDescription, setPlaylistDescription] = useState(
		playlist.description
	)
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				style: {
					backgroundColor: '#1f1f1f',
					color: 'white',
				},
			}}
		>
			<div className={styles.playlist}>
				<img
					className={styles.playlistImage}
					src={playlist?.images[0].url}
				/>
				<div className={styles.playlistData}>
					<input
						className={styles.playlistName}
						value={playlistName}
						onChange={(event) =>
							setPlaylistName(event.target.value)
						}
					/>
					<textarea
						className={styles.playlistDescription}
						placeholder={'Enter description (optional)'}
						value={playlistDescription ?? ''}
						onChange={(event) =>
							setPlaylistDescription(event.target.value)
						}
					/>
				</div>
			</div>
			<Button autoFocus>
				Save
				<IconButton
					edge='end'
					color='inherit'
					onClick={handleClose}
				></IconButton>
			</Button>
		</Dialog>
	)
}
export default PopupModifyPlaylist
