import styles from '../../components/sharedComponents/playlistMenu/song/song.module.scss'
import React from 'react'
import loading from './skeletonLoading.module.scss'

const SkeletonPlaylistSongItem = ({
    isAlbumTrack,
}: {
    isAlbumTrack?: boolean
}) => {
    return (
        <div className={styles.playlistSong}>
            <div />
            <div className={styles.songContainer}>
                {isAlbumTrack ? (
                    <div />
                ) : (
                    <div
                        className={`${styles.songPhoto} ${loading.skeleton}`}
                    />
                )}
                <div className={styles.songData}>
                    <div
                        className={`${loading.skeleton} ${loading.skeletonPlaylistSongText}`}
                    ></div>
                    <div
                        className={`${loading.skeleton} ${loading.skeletonPlaylistArtistNameText}`}
                    ></div>
                </div>
            </div>
            {isAlbumTrack ? (
                <div />
            ) : (
                <div
                    className={`${loading.skeleton} ${loading.skeletonPlaylistAlbumNameText} ${styles.albumName}`}
                ></div>
            )}
            <div
                className={`${loading.skeleton} ${loading.skeletonSmallText} ${styles.songDurationTime}`}
            ></div>
            <div />
        </div>
    )
}
export default SkeletonPlaylistSongItem
