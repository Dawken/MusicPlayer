import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	IconButton,
} from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

type PopupDeletePlaylistProps = {
	open: boolean
	handleClose: () => void
	deletePlaylist: () => void
}

const PopupDeletePlaylist: React.FC<PopupDeletePlaylistProps> = ({
	open,
	handleClose,
	deletePlaylist,
}) => {
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
			<DialogTitle>Are you sure to delete this playlist?</DialogTitle>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={deletePlaylist} autoFocus>
					Delete playlist
					<IconButton
						edge='end'
						color='inherit'
						onClick={handleClose}
					>
						<DeleteIcon />
					</IconButton>
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default PopupDeletePlaylist
