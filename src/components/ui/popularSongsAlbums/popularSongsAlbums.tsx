import React from 'react'
import styles from './popularSongsAlbums.module.scss'
import ScrollContainer from 'react-indiana-drag-scroll'
import SkeletonTrackCard from '../../animations/skeletonLoading/skeletonTrackCard'
import TrackCard from '../trackCard/trackCard'
import usePopularSongsAlbums from './usePopularSongsAlbums'
import SpotifyApi from 'spotify-web-api-node'
import SingleArtistResponse = SpotifyApi.SingleArtistResponse
import AlbumCard from '../albumCard/albumCard'
import ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified
import arrayFrom from '../../../utils/arrayFrom'
import SkeletonAlbumCard from '../../animations/skeletonLoading/skeletonAlbumCard'

const PopularSongsAlbums = ({
    artist,
}: {
    artist?: SingleArtistResponse | ArtistObjectSimplified
}) => {
    const { popular } = usePopularSongsAlbums(artist)

    return (
        <>
            <div className={styles.sectionText}>Popular Songs</div>
            <section className={styles.popularSongs}>
                {!popular.songs.length ? (
                    <ScrollContainer
                        horizontal={true}
                        className={styles.scrollContainer}
                    >
                        {arrayFrom(8, <SkeletonTrackCard />)}
                    </ScrollContainer>
                ) : (
                    <ScrollContainer
                        horizontal={true}
                        className={styles.scrollContainer}
                    >
                        {popular.songs?.map((item) => (
                            <TrackCard item={item} key={item.id} />
                        ))}
                    </ScrollContainer>
                )}
            </section>
            <div className={styles.sectionText}>Popular Albums</div>
            <section className={styles.popularAlbums}>
                {!popular.albums.length ? (
                    <ScrollContainer
                        horizontal={true}
                        className={styles.scrollContainer}
                    >
                        {arrayFrom(8, <SkeletonAlbumCard />)}
                    </ScrollContainer>
                ) : (
                    <ScrollContainer
                        horizontal={true}
                        className={styles.scrollContainer}
                    >
                        {popular.albums?.map((item, index) => (
                            <AlbumCard
                                item={item}
                                key={index}
                                route={'album'}
                            />
                        ))}
                    </ScrollContainer>
                )}
            </section>
        </>
    )
}
export default PopularSongsAlbums
