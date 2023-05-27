import React from 'react'
import styles from './playlists.module.scss'
import AddIcon from '@mui/icons-material/Add'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import usePlaylists from './usePlaylists'
import SkeletonAlbumCard from '../../../animations/skeletonLoading/skeletonAlbumCard'
import AlbumCard from '../../sharedComponents/albumCard/albumCard'

const Playlists = () => {
	const { playlists, createPlaylist } = usePlaylists()

	return (
		<div className={styles.layout}>
			<BackgroundImageColor color={undefined} />
			<div className={styles.playlistsContainer}>
				{playlists?.items.length === 0 ? (
					<section className={styles.playlistsNotFound}>
						<div className={styles.playlistsNotFoundText}>
							Playlists not found
						</div>
						<div
							onClick={() => createPlaylist()}
							className={styles.createPlaylist}
						>
							<AddIcon className={styles.createPlaylistButton} />
							<div className={styles.createPlaylistText}>
								Create playlist
							</div>
						</div>
					</section>
				) : (
					<section className={styles.playlists}>
						<div
							onClick={() => createPlaylist()}
							className={styles.createPlaylist}
						>
							<AddIcon className={styles.createPlaylistButton} />
							<div className={styles.createPlaylistText}>
								Create playlist
							</div>
						</div>
						<div className={styles.yourPlaylists}>
							{!playlists
								? Array.from({ length: 10 }, (_, i) => (
										<SkeletonAlbumCard key={i} />
								  ))
								: playlists?.items.map((item) => {
										return (
											<AlbumCard
												item={item}
												key={item.id}
												route={'playlist'}
											/>
										)
								  })}
						</div>
					</section>
				)}
			</div>
		</div>
	)
}
export default Playlists
