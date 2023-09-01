import React from 'react'
import styles from './song.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import dayjs from 'dayjs'
import SpotifyApi from 'spotify-web-api-node'
import useSong from './useSong'
import { Link } from 'react-router-dom'
import TrackObjectFull = SpotifyApi.TrackObjectFull
import SongOptionsMenu from '../../songOptionsMenu/songOptionsMenu'
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified
import RecommendationTrackObject = SpotifyApi.RecommendationTrackObject
import TrackObjectSimplified = SpotifyApi.TrackObjectSimplified

type ItemType = {
    item: TrackObjectFull | RecommendationTrackObject | TrackObjectSimplified
    index: number
    uri?: string
    isCreatingPlaylist?: boolean
    playlist?: PlaylistObjectSimplified
    userPlaylists?: PlaylistObjectSimplified[]
}

const Song = ({
    item,
    index,
    uri,
    isCreatingPlaylist,
    playlist,
    userPlaylists,
}: ItemType) => {
    const {
        isPlaying,
        playingSongId,
        isHovering,
        setIsHovering,
        playSong,
        playingSongColor,
        addSongToPlaylist,
        album,
    } = useSong({ item })

    return (
        <div
            className={styles.playlistSong}
            key={item.id}
            style={{
                backgroundColor:
                    item.id === playingSongId && isPlaying
                        ? playingSongColor
                        : 'transparent',
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {item.id === playingSongId && isPlaying ? (
                <img
                    className={styles.equalizer}
                    src='https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif'
                />
            ) : isHovering && uri ? (
                <PlayArrowIcon
                    className={styles.playIcon}
                    onClick={() => playSong(index, uri)}
                />
            ) : (
                <div className={styles.songNumber}>
                    {!isCreatingPlaylist && index + 1}
                </div>
            )}
            <div className={styles.songContainer}>
                {album && (
                    <img
                        className={styles.songPhoto}
                        src={album.images[0].url}
                    />
                )}
                <div className={styles.songData}>
                    <Link to={`/track/${item.id}`} className={styles.songName}>
                        {item.name}
                    </Link>
                    <Link
                        to={`/artist/${item.artists[0].id}`}
                        className={styles.artistName}
                    >
                        {item.artists[0].name}
                    </Link>
                </div>
            </div>
            <Link to={`/album/${album?.id}`} className={styles.albumName}>
                {album?.name}
            </Link>
            <div className={styles.songDurationTime}>
                {dayjs(item.duration_ms).format('mm:ss')}
            </div>
            {isCreatingPlaylist && uri && playlist ? (
                <button
                    className={styles.addSong}
                    onClick={() => addSongToPlaylist(playlist, [uri])}
                >
                    Add
                </button>
            ) : (
                <SongOptionsMenu
                    item={item}
                    userPlaylists={userPlaylists}
                    playlistId={uri}
                    album={album}
                />
            )}
        </div>
    )
}
export default Song
