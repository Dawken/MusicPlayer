import React from 'react'
import styles from './albumCard.module.scss'
import SpotifyApi from 'spotify-web-api-node'
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified
import { Link } from 'react-router-dom'
import PlayButton from '../../../assets/playButton.png'
import PauseIcon from '../../../assets/pauseButton.png'
import spotifyApi from '../../../services/spotifyApi'
import setSong from '../../../utils/setSong'
import useAlbumCard from './useAlbumCard'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified
import NotFoundPhoto from '../../../assets/notFound.png'

type CardProps = {
    item: AlbumObjectSimplified | PlaylistObjectSimplified
    route: string
}

const AlbumCard = ({ item, route }: CardProps) => {
    const { isPlaying, trackId, imageColor, boxShadowStyle } =
        useAlbumCard(item)

    return (
        <div className={styles.albumCard}>
            <Link to={`/${route}/${item.id}`}>
                <img
                    src={
                        item.images[0]?.url ? item.images[0].url : NotFoundPhoto
                    }
                    className={styles.albumImage}
                    style={boxShadowStyle}
                />
            </Link>
            {item.uri === trackId && isPlaying ? (
                <img
                    src={PauseIcon}
                    style={{ color: imageColor }}
                    className={styles.pauseIcon}
                    onClick={() => spotifyApi.pause()}
                />
            ) : (
                <img
                    src={PlayButton}
                    className={styles.playIcon}
                    onClick={() => setSong(item.uri, 0, trackId)}
                />
            )}
            <Link to={`/${route}/${item.id}`} className={styles.albumName}>
                {item.name}
            </Link>
        </div>
    )
}
export default AlbumCard
