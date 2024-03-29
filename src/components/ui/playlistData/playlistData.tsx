import styles from './playlistData.module.scss'
import loading from '../../animations/skeletonLoading/skeletonLoading.module.scss'
import React from 'react'
import SpotifyApi from 'spotify-web-api-node'
import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import SingleAlbumResponse = SpotifyApi.SingleAlbumResponse
import PopupModifyPlaylist from './popupModifyPlaylist/popupModifyPlaylist'
import usePlaylistData from './usePlaylistData'

type PlaylistType = {
    playlist?: SinglePlaylistResponse | SingleAlbumResponse
}

const PlaylistData = ({ playlist }: PlaylistType) => {
    const playlistWithDescription = playlist as SinglePlaylistResponse

    const { open, handleClickOpen, handleClose } = usePlaylistData()

    return (
        <div className={styles.playlistData}>
            <div
                className={`${styles.playlistImageSkeleton} ${loading.skeleton}`}
                onClick={handleClickOpen}
            >
                {playlist?.images[0] ? (
                    <img
                        src={playlist?.images[0].url}
                        className={styles.playlistImage}
                    />
                ) : (
                    <div className={styles.songIcon}>
                        <MusicNoteIcon className={styles.icon} />
                    </div>
                )}
            </div>
            <div className={styles.playlist}>
                <div className={styles.playlistName} onClick={handleClickOpen}>
                    {playlist?.name ? (
                        playlist.name
                    ) : (
                        <div
                            className={`${loading.skeleton} ${loading.skeletonTrackText}`}
                        />
                    )}
                </div>
                <div className={styles.playlistDescription}>
                    {playlistWithDescription?.description}
                </div>
            </div>
            {playlistWithDescription && (
                <PopupModifyPlaylist
                    open={open}
                    handleClose={handleClose}
                    playlist={playlistWithDescription}
                />
            )}
        </div>
    )
}
export default PlaylistData
