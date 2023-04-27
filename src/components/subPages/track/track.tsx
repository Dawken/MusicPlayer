import React from 'react'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import styles from './track.module.scss'
import useTrack from './useTrack'
import dayjs from 'dayjs'

const Track = () => {
	const { trackData, artist, imageColor, lyrics } = useTrack()

	return (
		<div className={styles.layout}>
			<BackgroundImageColor color={imageColor} />
			<div className={styles.trackContainer}>
				<div className={styles.trackData}>
					<img
						src={trackData?.album.images[0].url}
						className={styles.trackImage}
					></img>
					<div className={styles.track}>
						<div className={styles.trackName}>
							{trackData?.name}
						</div>
						<section className={styles.artist}>
							<img
								src={artist?.images[2].url}
								className={styles.artistImage}
							></img>
							<span className={styles.artistName}>
								{trackData?.artists[0].name}
							</span>
							<span className={styles.songDurationTime}>
								{dayjs(trackData?.duration_ms).format('mm:ss')}
							</span>
						</section>
					</div>
				</div>
				<div className={styles.lyricsContainer}>
					<div className={styles.lyrics}>
						<p className={styles.text}>Text</p>
						{lyrics?.map((line: string, index: number) => (
							<p key={index}>{line}</p>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
export default Track
