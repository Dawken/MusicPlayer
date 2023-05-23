import React from 'react'
import styles from './playlist.module.scss'
import BackgroundImageColor from '../../sharedComponents/backgroundImageColor/backgroundImageColor'
import usePlaylist from './usePlaylist'
import PlaylistData from './playlistData/playlistData'
import SearchBar from '../../sharedComponents/searchBar/searchBar'
import useSearchBar from '../../sharedComponents/searchBar/useSearchBar'
import PlaylistMenu from '../../sharedComponents/playlistMenu/playlistMenu'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import TrackObjectFull = SpotifyApi.TrackObjectFull
import Song from '../../sharedComponents/playlistMenu/song/song'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import { useAppSelector } from '../../../redux/store'
import setSong from '../../sharedFunctions/setSong'
import spotifyApi from '../../../shared/spotifyApi'

const Playlist = () => {
	const { imageColor, playlist, playlistSongs } = usePlaylist()
	const { setSearch, search, searchResult } = useSearchBar()

	const playlistId = useAppSelector((state) => state.auth.track)
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)

	return (
		<div className={styles.layout}>
			<BackgroundImageColor color={imageColor} />
			<div className={styles.playlist}>
				<PlaylistData playlist={playlist} />
				<div className={styles.background}>
					{isPlaying && playlist?.uri === playlistId ? (
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
								playlist &&
									setSong(playlist.uri, 0, playlist.uri)
							}}
						/>
					)}
					<div className={styles.playlistSongs}>
						{playlistSongs && playlist && (
							<PlaylistMenu
								playlistData={
									playlistSongs as
										| (PlaylistTrackObject & {
												track?:
													| TrackObjectFull
													| undefined
										  })[]
										| TrackObjectFull[]
								}
								uri={playlist.uri}
							/>
						)}
					</div>
					<div className={styles.searchBar}>
						<SearchBar search={search} setSearch={setSearch} />
						{searchResult.map((item, index) => {
							return (
								<Song
									item={item}
									index={0}
									uri={item.uri}
									key={index}
									userPlaylists={undefined}
									isCreatingPlaylist={true}
									playlist={playlist}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
export default Playlist
