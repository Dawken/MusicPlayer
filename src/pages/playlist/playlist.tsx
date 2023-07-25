import React from 'react'
import styles from './playlist.module.scss'
import BackgroundImageColor from '../../components/ui/backgroundImageColor/backgroundImageColor'
import usePlaylist from './usePlaylist'
import PlaylistData from '../../components/ui/playlistData/playlistData'
import SearchBar from '../../components/ui/searchBar/searchBar'
import useSearchBar from '../../components/ui/searchBar/useSearchBar'
import PlaylistMenu from '../../components/ui/playlistMenu/playlistMenu'
import SpotifyApi from 'spotify-web-api-node'
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject
import TrackObjectFull = SpotifyApi.TrackObjectFull
import Song from '../../components/ui/playlistMenu/song/song'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import setSong from '../../utils/setSong'
import spotifyApi from '../../services/spotifyApi'
import SkeletonPlaylistSongItem from '../../animations/skeletonLoading/skeletonPlaylistSongItem'
import DeleteIcon from '@mui/icons-material/Delete'
import PopupDeletePlaylist from './popupDeletePlaylist'

const Playlist = () => {
    const {
        imageColor,
        playlist,
        playlistSongs,
        playlistId,
        isPlaying,
        recommendedTracks,
        isTyping,
        track,
        open,
        handleClickOpen,
        handleClose,
        deletePlaylist,
    } = usePlaylist()

    const { setSearch, search, searchResult } = useSearchBar()

    return (
        <div className={styles.layout}>
            <BackgroundImageColor color={imageColor} />
            <div className={styles.playlist}>
                <PlaylistData playlist={playlist} />
                <div className={styles.background}>
                    <div className={styles.actionButtons}>
                        {isPlaying && playlist?.uri === playlistId ? (
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
                                    playlist && setSong(playlist.uri, 0, track)
                                }}
                            />
                        )}
                        <DeleteIcon
                            className={styles.deletePlaylist}
                            onClick={handleClickOpen}
                        />
                    </div>
                    {playlistSongs && playlist ? (
                        <PlaylistMenu
                            playlistData={
                                playlistSongs as
                                    | (PlaylistTrackObject & {
                                          track?: TrackObjectFull | undefined
                                      })[]
                                    | TrackObjectFull[]
                            }
                            uri={playlist.uri}
                        />
                    ) : (
                        Array.from({ length: 5 }, (_, i) => {
                            return <SkeletonPlaylistSongItem key={i} />
                        })
                    )}
                    <div className={styles.searchBar}>
                        <div className={styles.sectionText}>Add new songs</div>
                        <SearchBar search={search} setSearch={setSearch} />
                        {isTyping
                            ? Array.from({ length: 5 }, (_, i) => {
                                  return <SkeletonPlaylistSongItem key={i} />
                              })
                            : searchResult.map((item, index) => {
                                  return (
                                      <Song
                                          item={item}
                                          index={0}
                                          uri={item.uri}
                                          key={index}
                                          isCreatingPlaylist={true}
                                          playlist={playlist}
                                      />
                                  )
                              })}
                        <div className={styles.sectionText}>
                            You may also like
                        </div>
                        {recommendedTracks
                            ? recommendedTracks.map((item, index) => {
                                  return (
                                      <Song
                                          item={item}
                                          index={0}
                                          uri={item.uri}
                                          key={index}
                                          isCreatingPlaylist={true}
                                          playlist={playlist}
                                      />
                                  )
                              })
                            : Array.from({ length: 5 }, (_, i) => {
                                  return <SkeletonPlaylistSongItem key={i} />
                              })}
                    </div>
                </div>
            </div>
            <PopupDeletePlaylist
                open={open}
                handleClose={handleClose}
                deletePlaylist={deletePlaylist}
            />
        </div>
    )
}
export default Playlist
