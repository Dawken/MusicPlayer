import React, { Fragment } from 'react'
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
import styles from './songOptions.module.scss'
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
    userPlaylists?: PlaylistObjectSimplified[]
    playlistId?: string
    album?: AlbumObjectSimplified
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
        <PopupState variant='popper' popupId='demo-popup-popper'>
            {(popupState) => (
                <Fragment>
                    <Button {...bindToggle(popupState)}>
                        <MoreHorizIcon className={styles.moreHorizonIcon} />
                    </Button>
                    <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper
                                    className={styles.paper}
                                    sx={{ backgroundColor: '#1c1c1c' }}
                                >
                                    <Link
                                        to={`/artist/${item.artists[0].id}`}
                                        className={styles.optionsText}
                                    >
                                        <MenuItem sx={{ p: 2 }}>
                                            <ListItemIcon>
                                                <PersonIcon
                                                    className={
                                                        styles.personIcon
                                                    }
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
                                                        className={
                                                            styles.albumIcon
                                                        }
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
                                                    className={
                                                        styles.musicNoteIcon
                                                    }
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
                                                        playlistId?.slice(17),
                                                        item.uri
                                                    )
                                                }
                                                className={styles.deleteIcon}
                                            >
                                                <ListItemIcon>
                                                    <DeleteIcon
                                                        className={
                                                            styles.deleteIcon
                                                        }
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
                                            <div>
                                                <Button
                                                    {...bindToggle(popupState)}
                                                    className={
                                                        styles.addToPlaylist
                                                    }
                                                >
                                                    <PlaylistAddIcon
                                                        className={
                                                            styles.playlistAddIcon
                                                        }
                                                    />
                                                    Add to playlist
                                                </Button>
                                                <Popper
                                                    {...bindPopper(popupState)}
                                                    transition
                                                >
                                                    {({ TransitionProps }) => (
                                                        <Fade
                                                            {...TransitionProps}
                                                            timeout={350}
                                                        >
                                                            <Paper
                                                                sx={{
                                                                    backgroundColor:
                                                                        '#1c1c1c',
                                                                    color: '#ffffff',
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
                </Fragment>
            )}
        </PopupState>
    )
}
export default SongOptionsMenu
