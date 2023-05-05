import React from 'react'
import styles from './artist.module.scss'
import PopularSongsAlbums from '../../sharedComponents/popularSongsAlbums/popularSongsAlbums'
import useArtist from './useArtist'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import ArtistData from './artistData/artistData'

const Artist = () => {
	const { artist, imageColor } = useArtist()

	return (
		<div className={styles.layout}>
			<BackgroundImageColor color={imageColor} />
			<div className={styles.artist}>
				<ArtistData artist={artist} />
				<div className={styles.background}>
					<PopularSongsAlbums artist={artist} />
				</div>
			</div>
		</div>
	)
}
export default Artist
