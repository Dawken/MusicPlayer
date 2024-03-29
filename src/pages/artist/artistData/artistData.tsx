import styles from './artistData.module.scss'
import loading from '../../../components/animations/skeletonLoading/skeletonLoading.module.scss'
import React from 'react'
import SpotifyApi from 'spotify-web-api-node'
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const ArtistData = ({ artist }: { artist?: SingleArtistResponse }) => {
    return (
        <div className={styles.artistData}>
            <div
                className={`${styles.artistImageSkeleton} ${loading.skeleton}`}
            >
                <img
                    src={artist?.images[0].url}
                    className={styles.artistImage}
                />
            </div>
            <div className={styles.artist}>
                <div className={styles.artistName}>
                    {artist?.name ? (
                        artist.name
                    ) : (
                        <div
                            className={`${loading.skeleton} ${loading.skeletonTrackText}`}
                        />
                    )}
                </div>
                <div className={styles.followers}>
                    <AccountCircleIcon />
                    {artist?.followers.total ? (
                        artist.followers.total
                            .toLocaleString()
                            .replace(',', ' ') + ' followers'
                    ) : (
                        <div
                            className={`${loading.skeleton} ${loading.skeletonSmallText}`}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
export default ArtistData
