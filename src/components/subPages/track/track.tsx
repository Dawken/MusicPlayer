import React from 'react'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import styles from './track.module.scss'
import useTrack from './useTrack'
import SongData from './songData/songData'
import LyricsSection from './lyricsSection/lyricsSection'

const Track = () => {
	const { trackData, artist, imageColor } = useTrack()

	return (
		<div className={styles.layout}>
			<BackgroundImageColor color={imageColor} />
			<div className={styles.trackContainer}>
				<SongData trackData={trackData} artist={artist} />
				<LyricsSection
					trackData={trackData}
					artist={artist}
					imageColor={imageColor}
				/>
			</div>
		</div>
	)
}
export default Track
