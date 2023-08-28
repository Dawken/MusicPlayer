import React, { Fragment } from 'react'
import TrackSearchResult from '../../../components/ui/trackCard/trackCard'
import useHomeResults from './useHomeResults'
import styles from './homeResults.module.scss'
import ArtistSearchResult from './artistsSearchResult/artistSearchResult'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import TrackObjectFull = SpotifyApi.TrackObjectFull
import RecommendationTrackObject = SpotifyApi.RecommendationTrackObject
import SkeletonTrackCard from '../../../components/animations/skeletonLoading/skeletonTrackCard'
import SkeletonArtistSearchResult from '../../../components/animations/skeletonLoading/skeletonArtistSearchResult'
import ScrollContainer from 'react-indiana-drag-scroll'
import TrackCard from '../../../components/ui/trackCard/trackCard'
import arrayFrom from '../../../utils/arrayFrom'

interface SearchResultType {
    searchResult: TrackObjectFull[]
    artists?: ArtistObjectFull[]
}

const HomeResults = ({ searchResult, artists }: SearchResultType) => {
    const { tracks, isTyping, recommendations } = useHomeResults()

    return (
        <div className={styles.mainContainer}>
            {searchResult.length > 0 && (
                <Fragment>
                    <section>
                        <div className={styles.sectionText}>Best results</div>
                        <div className={styles.cardsContainer}>
                            {isTyping ? (
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
                                    {searchResult.map(
                                        (item: TrackObjectFull) => (
                                            <TrackCard
                                                item={item}
                                                key={item.id}
                                            />
                                        )
                                    )}
                                </ScrollContainer>
                            )}
                        </div>
                    </section>
                    <section>
                        <div className={styles.sectionText}>Best artists</div>
                        <div className={styles.cardsContainer}>
                            {isTyping ? (
                                <ScrollContainer
                                    horizontal={true}
                                    className={styles.scrollContainer}
                                >
                                    {arrayFrom(
                                        8,
                                        <SkeletonArtistSearchResult />
                                    )}
                                </ScrollContainer>
                            ) : (
                                <ScrollContainer
                                    horizontal={true}
                                    className={styles.scrollContainer}
                                >
                                    {artists?.map((item: ArtistObjectFull) => (
                                        <ArtistSearchResult
                                            item={item}
                                            key={item.id}
                                        />
                                    ))}
                                </ScrollContainer>
                            )}
                        </div>
                    </section>
                </Fragment>
            )}
            <section>
                <div className={styles.sectionText}>Last Played</div>
                <div className={styles.cardsContainer}>
                    {!tracks.length ? (
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
                            {tracks.map((item: TrackObjectFull) => (
                                <TrackCard item={item} key={item.id} />
                            ))}
                        </ScrollContainer>
                    )}
                </div>
            </section>
            <section>
                <div className={styles.sectionText}>Recommendations</div>
                <div className={styles.cardsContainer}>
                    {!recommendations.length ? (
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
                            {recommendations.map(
                                (item: RecommendationTrackObject) => (
                                    <TrackSearchResult
                                        item={item}
                                        key={item.id}
                                    />
                                )
                            )}
                        </ScrollContainer>
                    )}
                </div>
            </section>
        </div>
    )
}
export default HomeResults
