import React from 'react'
import styles from './trackCard.module.scss'
import loading from '../../animations/skeletonLoading/skeletonLoading.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import RecommendationTrackObject = SpotifyApi.RecommendationTrackObject
import useTrackCard from './useTrackCard'
import { Link } from 'react-router-dom'
import setSong from '../../../utils/functions/setSong'

interface TrackSearchResultProps {
    item: TrackObjectFull | RecommendationTrackObject
}

const TrackCard = ({ item }: TrackSearchResultProps) => {
    const { trackId, handleHover, handleMouseLeave } = useTrackCard()

    return (
        <div
            className={styles.songContainer}
            onClick={() =>
                setSong(item.album.uri, item.track_number - 1, trackId)
            }
            onMouseEnter={() => handleHover(item.album.images[1]?.url)}
            onMouseLeave={() => handleMouseLeave()}
        >
            <div className={styles.songPhotoContainer}>
                <img
                    className={`${styles.songPhoto} ${loading.skeleton}`}
                    src={item.album.images[1]?.url}
                />
            </div>
            <Link
                to={`/artist/${item.artists[0].id}`}
                className={styles.artistName}
            >
                {item.artists[0].name}
            </Link>
            <Link to={`/track/${item.id}`} className={styles.songName}>
                {item.name}
            </Link>
        </div>
    )
}
export default TrackCard
