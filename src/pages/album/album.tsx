import React from 'react'
import styles from './album.module.scss'
import BackgroundImageColor from '../../components/ui/backgroundImageColor/backgroundImageColor'
import PlaylistData from '../../components/ui/playlistData/playlistData'
import useAlbum from './useAlbum'
import Song from '../../components/ui/playlistMenu/song/song'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import spotifyApi from '../../services/spotifyApi'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import setSong from '../../utils/setSong'
import PopularSongsAlbums from '../../components/ui/popularSongsAlbums/popularSongsAlbums'
import SkeletonPlaylistSongItem from '../../animations/skeletonLoading/skeletonPlaylistSongItem'

const Album = () => {
    const { imageColor, album, playlistId, isPlaying, track } = useAlbum()

    return (
        <div className={styles.layout}>
            <BackgroundImageColor color={imageColor} />
            <div className={styles.playlist}>
                <PlaylistData playlist={album} />
                <div className={styles.background}>
                    {isPlaying && album?.uri === playlistId ? (
                        <PauseCircleIcon
                            style={{ color: imageColor }}
                            className={styles.playIcon}
                            onClick={() => spotifyApi.pause()}
                        />
                    ) : (
                        <PlayCircleFilledIcon
                            style={{ color: imageColor }}
                            className={styles.playIcon}
                            onClick={() => {
                                album && setSong(album.uri, 0, track)
                            }}
                        />
                    )}
                    {album
                        ? album.tracks.items.map((item, i) => {
                              return (
                                  <Song
                                      item={item}
                                      index={i}
                                      uri={album.uri}
                                      key={i}
                                  />
                              )
                          })
                        : Array.from({ length: 5 }, (_, i) => {
                              return (
                                  <SkeletonPlaylistSongItem
                                      key={i}
                                      isAlbumTrack={true}
                                  />
                              )
                          })}
                    <PopularSongsAlbums artist={album?.artists[0]} />
                </div>
            </div>
        </div>
    )
}
export default Album
