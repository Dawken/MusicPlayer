import React from 'react'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import styles from './track.module.scss'
import useTrack from './useTrack'
import dayjs from 'dayjs'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import loading from '../../../animations/skeletonLoading/skeletonLoading.module.scss'

const Track = () => {
	const {
		trackData,
		artist,
		imageColor,
		songLyrics,
		setSong,
		pauseSong,
		isPlaying,
		playingSongId,
		id,
		addToSavedTracks,
		removeFromSavedTracks,
		isTrackFollowed,
		lyricsWidth,
		isLoading,
	} = useTrack()

	return (
		<div className={styles.layout}>
			<BackgroundImageColor color={imageColor} />
			<div className={styles.trackContainer}>
				<div className={styles.trackData}>
					<div
						className={`${styles.trackImageSkeleton} ${loading.skeleton}`}
					>
						<img
							src={trackData?.album.images[0].url}
							className={styles.trackImage}
						/>
					</div>

					<div className={styles.track}>
						<div className={styles.trackName}>
							{trackData?.name ? (
								trackData.name
							) : (
								<div
									className={`${loading.skeleton} ${loading.skeletonTrackText}`}
								/>
							)}
						</div>
						<section className={styles.artist}>
							{artist?.images[0].url ? (
								<img
									src={artist?.images[0].url}
									className={styles.artistImage}
								/>
							) : (
								<div
									className={`${styles.artistImage} ${loading.skeleton}`}
								></div>
							)}
							{trackData?.artists[0].name ? (
								<div className={styles.artistName}>
									{trackData?.artists[0].name}
								</div>
							) : (
								<div
									className={`${loading.skeleton} ${loading.skeletonSmallText}`}
								/>
							)}
							{trackData?.duration_ms ? (
								<div className={styles.songDurationTime}>
									{dayjs(trackData?.duration_ms).format(
										'mm:ss'
									)}
								</div>
							) : (
								<div
									className={`${loading.skeleton} ${loading.skeletonSmallText}`}
								/>
							)}
						</section>
					</div>
				</div>
				<div className={styles.background}>
					<div className={styles.songActions}>
						{id === playingSongId && isPlaying ? (
							<PauseCircleIcon
								style={{ color: imageColor }}
								className={styles.playIcon}
								onClick={() => pauseSong()}
							/>
						) : (
							<PlayCircleFilledIcon
								style={{ color: imageColor }}
								className={styles.playIcon}
								onClick={() => {
									trackData &&
										setSong(
											trackData.album.images[1]?.url,
											trackData.album.uri,
											trackData.track_number - 1
										)
								}}
							/>
						)}
						{isTrackFollowed ? (
							<FavoriteIcon
								className={styles.likeIcon}
								style={{ color: imageColor }}
								onClick={() => removeFromSavedTracks()}
							/>
						) : (
							<FavoriteBorderIcon
								className={styles.likeIcon}
								style={{ color: imageColor }}
								onClick={() => addToSavedTracks()}
							/>
						)}
					</div>
					<section className={styles.lyricsContainer}>
						<div className={styles.lyrics}>
							{!songLyrics && isLoading
								? lyricsWidth.map((width, index) => {
										return (
											<p
												className={`${loading.skeleton} ${loading.skeletonLyricsText}`}
												key={index}
												style={{ width: `${width}px` }}
											/>
										)
								  })
								: songLyrics
										?.split(/\r?\n/)
										.map((line: string, index: number) => (
											<p key={index}>{line}</p>
										))}
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}
export default Track
