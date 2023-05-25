import React from 'react'
import {
	Button,
	Fade,
	ListItemIcon,
	MenuItem,
	Paper,
	Popper,
} from '@mui/material'
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Link } from 'react-router-dom'
import styles from '../playlistMenu/song/song.module.scss'
import PersonIcon from '@mui/icons-material/Person'
import AlbumIcon from '@mui/icons-material/Album'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import DeleteIcon from '@mui/icons-material/Delete'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import AddIcon from '@mui/icons-material/Add'
import useSongOptionsMenu from './useSongOptionsMenu'
import SpotifyApi from 'spotify-web-api-node'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified
import RecommendationTrackObject = SpotifyApi.RecommendationTrackObject
import TrackObjectSimplified = SpotifyApi.TrackObjectSimplified
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified

type SongOptionMenuType = {
	item: TrackObjectFull | RecommendationTrackObject | TrackObjectSimplified
	userPlaylists: PlaylistObjectSimplified[] | undefined
	playlistId?: string
	album: AlbumObjectSimplified | undefined
}

const SongOptionsMenu = ({
	item,
	userPlaylists,
	playlistId,
	album,
}: SongOptionMenuType) => {
	const { path, addSongToPlaylist, deleteSongFromPlaylist } =
		useSongOptionsMenu()

	return (
		<div>
			<PopupState variant='popper' popupId='demo-popup-popper'>
				{(popupState) => (
					<div>
						<Button {...bindToggle(popupState)}>
							<MoreHorizIcon style={{ color: '#fff' }} />
						</Button>
						<Popper {...bindPopper(popupState)} transition>
							{({ TransitionProps }) => (
								<Fade {...TransitionProps} timeout={350}>
									<Paper
										style={{
											background: '#1c1c1c',
											color: '#ffffff',
											borderRadius: '12px',
											justifyContent: 'space-between',
										}}
									>
										<Link
											to={`/artist/${item.artists[0].id}`}
											className={styles.optionsText}
										>
											<MenuItem sx={{ p: 2 }}>
												<ListItemIcon>
													<PersonIcon
														style={{
															color: '#fff',
														}}
													/>
												</ListItemIcon>
												Show artist
											</MenuItem>
										</Link>
										{album && (
											<Link
												to={`/album/${album.id}`}
												className={styles.optionsText}
											>
												<MenuItem sx={{ p: 2 }}>
													<ListItemIcon>
														<AlbumIcon
															style={{
																color: '#fff',
															}}
														/>
													</ListItemIcon>
													Show album
												</MenuItem>
											</Link>
										)}
										<Link
											to={`/track/${item.id}`}
											className={styles.optionsText}
										>
											<MenuItem sx={{ p: 2 }}>
												<ListItemIcon>
													<MusicNoteIcon
														style={{
															color: '#fff',
														}}
													/>
												</ListItemIcon>
												Go to the song
											</MenuItem>
										</Link>
										{path === 'playlists' ||
											(path === 'playlist' && (
												<MenuItem
													sx={{ p: 2 }}
													onClick={() =>
														deleteSongFromPlaylist(
															playlistId?.slice(
																17
															),
															item.uri
														)
													}
												>
													<ListItemIcon>
														<DeleteIcon
															style={{
																color: '#fff',
															}}
														/>
													</ListItemIcon>
													Delete song
												</MenuItem>
											))}
										<PopupState
											variant='popper'
											popupId='demo-popup-popper'
										>
											{(popupState) => (
												<div
													style={{
														justifyContent:
															'center',
													}}
												>
													<Button
														{...bindToggle(
															popupState
														)}
														style={{
															color: '#fff',
															textTransform:
																'none',
															width: '100%',
															fontSize: '0.96rem',
														}}
													>
														<PlaylistAddIcon
															style={{
																color: '#fff',
																marginRight:
																	'11px',
															}}
														/>
														Add to playlist
													</Button>
													<Popper
														{...bindPopper(
															popupState
														)}
														transition
													>
														{({
															TransitionProps,
														}) => (
															<Fade
																{...TransitionProps}
																timeout={350}
															>
																<Paper
																	style={{
																		background:
																			'#1c1c1c',
																		color: '#ffffff',
																		borderRadius:
																			'12px',
																		justifyContent:
																			'space-between',
																	}}
																>
																	{' '}
																	{userPlaylists?.map(
																		(
																			playlist,
																			index
																		) => {
																			return (
																				<MenuItem
																					sx={{
																						p: 2,
																					}}
																					key={
																						index
																					}
																					onClick={() =>
																						addSongToPlaylist(
																							playlist,
																							[
																								item.uri,
																							]
																						)
																					}
																				>
																					<AddIcon />
																					{
																						playlist.name
																					}
																				</MenuItem>
																			)
																		}
																	)}
																</Paper>
															</Fade>
														)}
													</Popper>
												</div>
											)}
										</PopupState>
									</Paper>
								</Fade>
							)}
						</Popper>
					</div>
				)}
			</PopupState>
		</div>
	)
}
export default SongOptionsMenu
