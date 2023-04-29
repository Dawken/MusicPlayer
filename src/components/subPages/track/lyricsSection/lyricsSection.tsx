import styles from './lyricsSection.module.scss'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import loading from '../../../../animations/skeletonLoading/skeletonLoading.module.scss'
import React from 'react'
import useLyricsSection from './useLyricsSection'
import SpotifyApi from 'spotify-web-api-node'
import SingleTrackResponse = SpotifyApi.SingleTrackResponse
import SingleArtistResponse = SpotifyApi.SingleArtistResponse

type TrackType = {
	trackData: SingleTrackResponse | undefined
	artist: SingleArtistResponse | undefined
	imageColor: string
}

const LyricsSection = ({ trackData, artist, imageColor }: TrackType) => {
	const {
		songLyrics,
		setSong,
		pauseSong,
		isPlaying,
		playingSongId,
		id,
		addToSavedTracks,
		removeFromSavedTracks,
		lyricsWidth,
		isLoading,
		isTrackFollowed,
	} = useLyricsSection({ trackData, artist })
	return (
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
	)
}
export default LyricsSection
