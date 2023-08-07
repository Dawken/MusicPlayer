import styles from '../../ui/albumCard/albumCard.module.scss'
import React from 'react'
import loading from './skeletonLoading.module.scss'

const SkeletonAlbumCard = () => {
    return (
        <div className={styles.albumCard}>
            <div className={`${styles.albumImage} ${loading.skeleton}`} />
            <div
                className={`${loading.skeleton} ${loading.skeletonSmallText} ${styles.albumName}`}
            ></div>
        </div>
    )
}
export default SkeletonAlbumCard
