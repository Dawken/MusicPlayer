import React from 'react'
import styles from './playlists.module.scss'
import useLayout from '../../layout/useLayout'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { Link } from 'react-router-dom'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'

const Playlists = () => {
	const { playlists } = useLayout()

	if (!playlists) return <div>Loading...</div>

	return (
		<div className={styles.layout}>
			<div className={styles.playlistsContainer}>
				<BackgroundImageColor />
				{playlists?.items.length === 0 ? (
					<section className={styles.playlistsNotFound}>
						<div className={styles.playlistsNotFoundText}>
							Playlists not found
						</div>
						<Link to={'/createPlaylist'} className={styles.createPlaylist}>
							<AddBoxOutlinedIcon className={styles.createPlaylistButton} />
							<div className={styles.createPlaylistText}>Create playlist</div>
						</Link>
					</section>
				) : (
					<div>Your playlists:</div>
				)}
			</div>
		</div>
	)
}
export default Playlists
