import React from 'react'
import styles from './playlists.module.scss'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import PlaylistItem from './playlistItem/playlistItem'
import SkeletonPlaylistItem from '../../../animations/skeletonLoading/skeletonPlaylistItem'
import usePlaylists from './usePlaylists'

const Playlists = () => {
	const { playlists } = usePlaylists()

	return (
		<div className={styles.layout}>
			<div className={styles.playlistsContainer}>
				<BackgroundImageColor color={undefined} />
				{playlists?.items.length === 0 ? (
					<section className={styles.playlistsNotFound}>
						<div className={styles.playlistsNotFoundText}>
							Playlists not found
						</div>
						<Link
							to={'/createPlaylist'}
							className={styles.createPlaylist}
						>
							<AddIcon className={styles.createPlaylistButton} />
							<div className={styles.createPlaylistText}>
								Create playlist
							</div>
						</Link>
					</section>
				) : (
					<section className={styles.playlists}>
						<div className={styles.yourPlaylists}>
							<div className={styles.yourPlaylistsText}>
								Your playlists
							</div>
							<Link
								to={'/createPlaylist'}
								className={styles.createPlaylist}
							>
								<AddIcon
									className={styles.createPlaylistButton}
								/>
								<div className={styles.createPlaylistText}>
									Create playlist
								</div>
							</Link>
						</div>
						{!playlists
							? Array.from({ length: 5 }, (_, i) => (
									<SkeletonPlaylistItem key={i} />
							  ))
							: playlists?.items.map((item) => {
									return (
										<PlaylistItem
											item={item}
											key={item.id}
										/>
									)
							  })}
					</section>
				)}
			</div>
		</div>
	)
}
export default Playlists
