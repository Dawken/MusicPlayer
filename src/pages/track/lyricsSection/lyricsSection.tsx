import styles from './lyricsSection.module.scss'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import loading from '../../../components/animations/skeletonLoading/skeletonLoading.module.scss'
import React from 'react'
import useLyricsSection from './useLyricsSection'
import SpotifyApi from 'spotify-web-api-node'
import SingleTrackResponse = SpotifyApi.SingleTrackResponse

type TrackType = {
    trackData: SingleTrackResponse | undefined
    songLyrics: string
    isLoading: boolean
    imageColor: string
}

const LyricsSection = ({
    songLyrics,
    isLoading,
    trackData,
    imageColor,
}: TrackType) => {
    const {
        pauseSong,
        playSong,
        isPlaying,
        playingSongId,
        id,
        addToSavedTracks,
        removeFromSavedTracks,
        lyricsWidth,
        isTrackFollowed,
    } = useLyricsSection()

    return (
        <>
            <div className={styles.songActions}>
                {id === playingSongId && isPlaying ? (
                    <PauseCircleIcon
                        style={{ color: imageColor }}
                        className={styles.playIcon}
                        onClick={() => pauseSong()}
                    />
                ) : (
                    <PlayCircleFilledIcon
                        style={{ color: imageColor }}
                        className={styles.playIcon}
                        onClick={() => {
                            trackData &&
                                playSong(
                                    trackData.track_number - 1,
                                    trackData.album.uri
                                )
                        }}
                    />
                )}
                {isTrackFollowed ? (
                    <FavoriteIcon
                        className={styles.likeIcon}
                        style={{ color: imageColor }}
                        onClick={() => removeFromSavedTracks()}
                    />
                ) : (
                    <FavoriteBorderIcon
                        className={styles.likeIcon}
                        style={{ color: imageColor }}
                        onClick={() => addToSavedTracks()}
                    />
                )}
            </div>
            <section className={styles.lyricsContainer}>
                <div className={styles.lyrics}>
                    {!songLyrics && isLoading
                        ? lyricsWidth.map((width, index) => {
                              return (
                                  <p
                                      className={`${loading.skeleton} ${loading.skeletonLyricsText}`}
                                      key={index}
                                      style={{ width: `${width}px` }}
                                  />
                              )
                          })
                        : songLyrics
                              ?.split(/\r?\n/)
                              .map((line: string, index: number) => (
                                  <p key={index}>{line}</p>
                              ))}
                </div>
            </section>
        </>
    )
}
export default LyricsSection
