import React from 'react'
import styles from './musicPlayer.module.scss'
import SpotifyPlayer from 'react-spotify-web-playback'
import {
    setIsPlaying,
    setPlayingSongId,
    setPlayingSongPhoto,
} from '../../context/redux/user'
import useMusicPlayer from './useMusicPlayer'

const MusicPlayer = () => {
    const { spotify, track, songNumber, playingSongColor, dispatch } =
        useMusicPlayer()

    if (!spotify.accessToken) return null

    return (
        <div className={styles.footer}>
            <SpotifyPlayer
                token={spotify.accessToken}
                styles={{
                    activeColor: '#b9b9b9',
                    bgColor: '#0a0a0a',
                    color: playingSongColor,
                    loaderColor: '#b9b9b9',
                    sliderColor: playingSongColor,
                    trackArtistColor: '#c0c0c0',
                    trackNameColor: '#b9b9b9',
                }}
                initialVolume={0.5}
                play
                showSaveIcon
                uris={track}
                offset={songNumber}
                callback={(state) => {
                    if (state.isPlaying) {
                        dispatch(setIsPlaying({ isPlaying: true }))
                    } else {
                        dispatch(setIsPlaying({ isPlaying: false }))
                    }
                    dispatch(
                        setPlayingSongId({ playingSongId: state.track.id })
                    )
                    dispatch(
                        setPlayingSongPhoto({
                            playingSongPhoto: state.track.image,
                        })
                    )
                }}
            />
        </div>
    )
}
export default MusicPlayer
