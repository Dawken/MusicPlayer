import React from 'react'
import styles from './album.module.scss'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import PlaylistData from '../playlist/playlistData/playlistData'
import useAlbum from './useAlbum'
import Song from '../../sharedComponents/playlistMenu/song/song'

const Album = () => {
	const { imageColor, album } = useAlbum()

	return (
		<div className={styles.layout}>
			<BackgroundImageColor color={imageColor} />
			<div className={styles.playlist}>
				<PlaylistData playlist={album} />
				<div className={styles.background}></div>
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
			</div>
		</div>
	)
}
export default Album
