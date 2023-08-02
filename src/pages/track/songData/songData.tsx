import styles from './songData.module.scss'
import loading from '../../../components/animations/skeletonLoading/skeletonLoading.module.scss'
import dayjs from 'dayjs'
import React from 'react'
import SpotifyApi from 'spotify-web-api-node'
import SingleTrackResponse = SpotifyApi.SingleTrackResponse
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import { Link } from 'react-router-dom'

type TrackType = {
    trackData?: SingleTrackResponse
    artist?: SingleArtistResponse
}

const SongData = ({ trackData, artist }: TrackType) => {
    return (
        <div className={styles.trackData}>
            <div className={`${styles.trackImageSkeleton} ${loading.skeleton}`}>
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
                        <Link
                            to={`/artist/${artist?.id}`}
                            className={styles.artistName}
                        >
                            {trackData?.artists[0].name}
                        </Link>
                    ) : (
                        <div
                            className={`${loading.skeleton} ${loading.skeletonSmallText}`}
                        />
                    )}
                    {trackData?.duration_ms ? (
                        <div className={styles.songDurationTime}>
                            {dayjs(trackData?.duration_ms).format('mm:ss')}
                        </div>
                    ) : (
                        <div
                            className={`${loading.skeleton} ${loading.skeletonSmallText}`}
                        />
                    )}
                </section>
            </div>
        </div>
    )
}
export default SongData
