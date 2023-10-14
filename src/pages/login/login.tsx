import React from 'react'
import threejs from './threejs'
import styles from './login.module.scss'
import Reveal from '../../components/animations/reveal/reveal'
import { FullPage, Slide } from 'react-full-page'
import explore from '../../assets/spotifyPremium.jpg'
import managePlaylist from '../../assets/managePlaylist.png'
import favouriteArtis from '../../assets/favouriteArists.png'
import SlideSection from './slideSection/slideSection'
import LoginButton from '../../components/ui/loginButton/loginButton'
import { spotifyAuthenticationUrl } from '../../services/spotifyAuthenticationUrl'
import { Link } from 'react-router-dom'

const Login = () => {
    const canvasRef = threejs()

    return (
        <div className={styles.layoutBackground}>
            <Link to={spotifyAuthenticationUrl.url} className={styles.login}>
                <span>Login</span>
            </Link>
            <FullPage>
                <Slide>
                    <div className={styles.headerTitle}>
                        <Reveal>
                            <div>Feel the vibe</div>
                        </Reveal>
                    </div>
                    <canvas className={styles.webgl} ref={canvasRef}></canvas>
                </Slide>
                <Slide>
                    <SlideSection
                        header={'Explore new sounds'}
                        image={explore}
                        list={[
                            'Search for new songs, artists and albums',
                            'Explore personalized recommendations and discover new music',
                            'Stream songs and create your own music library',
                        ]}
                    />
                </Slide>
                <Slide>
                    <SlideSection
                        header={'Create and Manage Playlists'}
                        image={managePlaylist}
                        list={[
                            'Create custom playlists for different moods, genres, or occasions',
                            'Add songs from the vast music catalog to your playlists',
                            'Edit and delete songs within your playlists',
                        ]}
                    />
                </Slide>
                <Slide>
                    <SlideSection
                        header={'Enjoy favourite artists content'}
                        image={favouriteArtis}
                        list={[
                            'Immerse yourself in their latest tracks and albums.',
                            'Expand your musical horizons by discovering similar artists and exploring their unique sounds.',
                        ]}
                    />
                </Slide>
                <Slide>
                    <div className={styles.headerTitle}>
                        <div className={styles.title}>
                            <Reveal>
                                <div>Are you ready?</div>
                            </Reveal>
                            <LoginButton />
                            <a
                                href={
                                    'https://github.com/Dawken/MusicPlayer/blob/main/README.md'
                                }
                                className={styles.loginInformation}
                            >
                                Don&apos;t want to login? Checkout ReadME
                                presentation
                            </a>
                        </div>
                    </div>
                </Slide>
            </FullPage>
        </div>
    )
}
export default Login
