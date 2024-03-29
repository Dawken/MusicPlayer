import React from 'react'
import styles from './artist.module.scss'
import PopularSongsAlbums from '../../components/ui/popularSongsAlbums/popularSongsAlbums'
import useArtist from './useArtist'
import BackgroundImageColor from '../../components/ui/backgroundImageColor/backgroundImageColor'
import ArtistData from './artistData/artistData'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import setSong from '../../utils/setSong'
import spotifyApi from '../../services/spotifyApi'
import ScrollContainer from 'react-indiana-drag-scroll'
import SkeletonArtistSearchResult from '../../components/animations/skeletonLoading/skeletonArtistSearchResult'
import ArtistSearchResult from '../home/homeResults/artistsSearchResult/artistSearchResult'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import arrayFrom from '../../utils/arrayFrom'

const Artist = () => {
    const {
        artist,
        imageColor,
        recommendedArtists,
        playingSongArtistId,
        isPlaying,
        track,
    } = useArtist()

    return (
        <div className={styles.layout}>
            <BackgroundImageColor color={imageColor} />
            <div className={styles.artist}>
                <ArtistData artist={artist} />
                <div className={styles.background}>
                    {isPlaying && playingSongArtistId === artist?.id ? (
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
                                artist && setSong(artist.uri, 0, track)
                            }}
                        />
                    )}
                    <PopularSongsAlbums artist={artist} />
                    <div className={styles.sectionText}>Fans also like</div>
                    <section className={styles.recommendedArtists}>
                        {!recommendedArtists ? (
                            <ScrollContainer
                                horizontal={true}
                                className={styles.scrollContainer}
                            >
                                {arrayFrom(8, <SkeletonArtistSearchResult />)}
                            </ScrollContainer>
                        ) : (
                            <ScrollContainer
                                horizontal={true}
                                className={styles.scrollContainer}
                            >
                                {recommendedArtists?.map(
                                    (item: ArtistObjectFull) => (
                                        <ArtistSearchResult
                                            item={item}
                                            key={item.id}
                                        />
                                    )
                                )}
                            </ScrollContainer>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
export default Artist
