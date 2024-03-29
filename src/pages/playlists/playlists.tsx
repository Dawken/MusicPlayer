import React from 'react'
import styles from './playlists.module.scss'
import AddIcon from '@mui/icons-material/Add'
import BackgroundImageColor from '../../components/ui/backgroundImageColor/backgroundImageColor'
import usePlaylists from './usePlaylists'
import SkeletonAlbumCard from '../../components/animations/skeletonLoading/skeletonAlbumCard'
import AlbumCard from '../../components/ui/albumCard/albumCard'
import { Button } from '@mui/material'
import arrayFrom from '../../utils/arrayFrom'

const Playlists = () => {
    const { playlists, createPlaylist } = usePlaylists()

    return (
        <div className={styles.layout}>
            <BackgroundImageColor color={undefined} />
            <div className={styles.playlistsContainer}>
                {playlists?.items.length === 0 ? (
                    <section className={styles.playlistsNotFound}>
                        <div className={styles.playlistsNotFoundText}>
                            Playlists not found
                        </div>
                        <div className={styles.createPlaylist}>
                            <Button
                                variant='outlined'
                                startIcon={<AddIcon />}
                                onClick={() => createPlaylist()}
                            >
                                Add new playlist
                            </Button>
                        </div>
                    </section>
                ) : (
                    <section className={styles.playlists}>
                        <div className={styles.createPlaylist}>
                            <Button
                                variant='outlined'
                                startIcon={<AddIcon />}
                                onClick={() => createPlaylist()}
                            >
                                Add new playlist
                            </Button>
                        </div>
                        <div className={styles.yourPlaylists}>
                            {!playlists
                                ? arrayFrom(10, <SkeletonAlbumCard />)
                                : playlists?.items.map((item) => {
                                      return (
                                          item.tracks.total > 0 && (
                                              <AlbumCard
                                                  item={item}
                                                  key={item.id}
                                                  route={'playlist'}
                                              />
                                          )
                                      )
                                  })}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
export default Playlists
