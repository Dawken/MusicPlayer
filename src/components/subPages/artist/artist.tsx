import React from 'react'
import styles from '../track/track.module.scss'
import PopularSongsAlbums from '../../sharedComponents/popularSongsAlbums/popularSongsAlbums'
import useArtist from './useAritist'

const Artist = () => {
	const { artist } = useArtist()

	return (
		<div className={styles.layout}>
			<div className={styles.trackContainer}>
				<div className={styles.background}>
					<PopularSongsAlbums artist={artist} />
				</div>
			</div>
		</div>
	)
}
export default Artist
