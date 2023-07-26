import React, { Fragment } from 'react'
import TrackSearchResult from '../../../components/ui/trackCard/trackCard'
import useResultsLayout from './useResultsLayout'
import styles from './resultsLayout.module.scss'
import ArtistSearchResult from './artistsSearchResult/artistSearchResult'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import TrackObjectFull = SpotifyApi.TrackObjectFull
import RecommendationTrackObject = SpotifyApi.RecommendationTrackObject
import SkeletonTrackCard from '../../../components/animations/skeletonLoading/skeletonTrackCard'
import SkeletonArtistSearchResult from '../../../components/animations/skeletonLoading/skeletonArtistSearchResult'
import ScrollContainer from 'react-indiana-drag-scroll'
import TrackCard from '../../../components/ui/trackCard/trackCard'

interface SearchResultType {
    searchResult: TrackObjectFull[]
    artists?: ArtistObjectFull[]
}

const ResultsLayout = ({ searchResult, artists }: SearchResultType) => {
    const { tracks, isTyping, recommendations } = useResultsLayout()

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
                                    style={{ display: 'flex' }}
                                >
                                    {Array.from({ length: 8 }, (_, i) => (
                                        <SkeletonTrackCard key={i} />
                                    ))}
                                </ScrollContainer>
                            ) : (
                                <ScrollContainer
                                    horizontal={true}
                                    style={{ display: 'flex' }}
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
                                    style={{ display: 'flex' }}
                                >
                                    {Array.from({ length: 8 }, (_, i) => (
                                        <SkeletonArtistSearchResult key={i} />
                                    ))}
                                </ScrollContainer>
                            ) : (
                                <ScrollContainer
                                    horizontal={true}
                                    style={{ display: 'flex' }}
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
                            style={{ display: 'flex' }}
                        >
                            {Array.from({ length: 8 }, (_, i) => (
                                <SkeletonTrackCard key={i} />
                            ))}
                        </ScrollContainer>
                    ) : (
                        <ScrollContainer
                            horizontal={true}
                            style={{ display: 'flex' }}
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
                            style={{ display: 'flex' }}
                        >
                            {Array.from({ length: 8 }, (_, i) => (
                                <SkeletonTrackCard key={i} />
                            ))}
                        </ScrollContainer>
                    ) : (
                        <ScrollContainer
                            horizontal={true}
                            style={{ display: 'flex' }}
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
export default ResultsLayout
