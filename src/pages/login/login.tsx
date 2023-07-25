import React from 'react'
import threejs from './threejs'
import styles from './login.module.scss'
import Reveal from './reveal/reveal'
import { FullPage, Slide } from 'react-full-page'
import explore from '../../assets/spotify-premium.jpg'
import managePlaylist from '../../assets/managePlaylist.png'
import favouriteArtis from '../../assets/favouriteArists.png'
import SlideSection from './slideSection/slideSection'
import LoginButton from '../../components/ui/loginButton/loginButton'
import useLogin from '../../components/ui/loginButton/useLogin'
import { spotifyAuthenticationUrl } from '../../services/spotifyAuthenticationUrl'
import { Link } from 'react-router-dom'

const Login = () => {
    const canvasRef = threejs()

    useLogin()

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
                        </div>
                    </div>
                </Slide>
            </FullPage>
        </div>
    )
}
export default Login
