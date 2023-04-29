import React from 'react'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import styles from './track.module.scss'
import useTrack from './useTrack'
import SongData from './songData/songData'
import LyricsSection from './lyricsSection/lyricsSection'
import PopularSongs from './popularSongs/popularSongs'

const Track = () => {
	const { trackData, artist, imageColor, songLyrics, isLoading } = useTrack()

	return (
		<div className={styles.layout}>
			<BackgroundImageColor color={imageColor} />
			<div className={styles.trackContainer}>
				<SongData trackData={trackData} artist={artist} />
				<div className={styles.background}>
					<LyricsSection
						songLyrics={songLyrics}
						isLoading={isLoading}
						trackData={trackData}
						imageColor={imageColor}
					/>
					<div className={styles.sectionText}>Popular Songs</div>
					<PopularSongs artist={artist} />
				</div>
			</div>
		</div>
	)
}
export default Track
