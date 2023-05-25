import React from 'react'
import styles from './album.module.scss'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import PlaylistData from '../playlist/playlistData/playlistData'
import useAlbum from './useAlbum'
import Song from '../../sharedComponents/playlistMenu/song/song'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import spotifyApi from '../../../shared/spotifyApi'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import setSong from '../../sharedFunctions/setSong'
import PopularSongsAlbums from '../../sharedComponents/popularSongsAlbums/popularSongsAlbums'

const Album = () => {
	const { imageColor, album, playlistId, isPlaying } = useAlbum()

	return (
		<div className={styles.layout}>
			<BackgroundImageColor color={imageColor} />
			<div className={styles.playlist}>
				<PlaylistData playlist={album} />
				<div className={styles.background}>
					{isPlaying && album?.uri === playlistId ? (
						<PauseCircleIcon
							style={{ color: imageColor }}
							className={styles.playIcon}
							onClick={() => spotifyApi.pause()}
						/>
					) : (
						<PlayCircleFilledIcon
							style={{ color: imageColor }}
							className={styles.playIcon}
							onClick={() => {
								album && setSong(album.uri, 0, album.uri)
							}}
						/>
					)}
					{album &&
						album.tracks.items.map((item, i) => {
							return (
								<Song
									item={item}
									index={i}
									uri={album.uri}
									key={i}
								/>
							)
						})}
					<PopularSongsAlbums artist={album?.artists[0]} />
				</div>
			</div>
		</div>
	)
}
export default Album
