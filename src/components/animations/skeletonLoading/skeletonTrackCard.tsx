import React from 'react'
import styles from '../../ui/trackCard/trackCard.module.scss'
import loading from './skeletonLoading.module.scss'

const SkeletonTrackCard = () => {
    return (
        <div className={styles.songContainer}>
            <div className={styles.songPhotoContainer}>
                <div className={`${styles.songPhoto} ${loading.skeleton}`} />
            </div>
            <div className={styles.artistName}>
                <div
                    className={`${loading.skeleton} ${loading.skeletonArtist}`}
                ></div>
            </div>
            <div className={styles.songName}>
                <div
                    className={`${loading.skeleton} ${loading.skeletonText}`}
                ></div>
            </div>
        </div>
    )
}
export default SkeletonTrackCard
