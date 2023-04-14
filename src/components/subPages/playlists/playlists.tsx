import React from 'react'
import styles from './playlists.module.scss'
import useLayout from '../../layout/useLayout'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { Link } from 'react-router-dom'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import PlaylistItem from './playlistItem/playlistItem'

const Playlists = () => {
	const { playlists } = useLayout()

	if (!playlists) return <div>Loading...</div>

	console.log(playlists)

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
					<section className={styles.playlists}>
						<div className={styles.yourPlaylists}>
							<div className={styles.yourPlaylistsText}>Your playlists</div>
							<Link to={'/createPlaylist'} className={styles.createPlaylist}>
								<AddBoxOutlinedIcon className={styles.createPlaylistButton} />
								<div className={styles.createPlaylistText}>Create playlist</div>
							</Link>
						</div>
						{playlists.items.map((item) => {
							return <PlaylistItem item={item} key={item.id} />
						})}
					</section>
				)}
			</div>
		</div>
	)
}
export default Playlists
