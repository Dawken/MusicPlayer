import React from 'react'
import threejs from './threejs'
import styles from './welcomePage.module.scss'
import 'animate.css'
import { Link } from 'react-router-dom'
import Reveal from './reveal/reveal'
import { FullPage, Slide } from 'react-full-page'
import explore from '../../../assets/spotify-premium.jpg'
import managePlaylist from '../../../assets/managePlaylist.png'
import favouriteArtis from '../../../assets/favouriteArists.png'
import SlideSection from './slideSection/slideSection'

const WelcomePage = () => {
	const canvasRef = threejs()

	return (
		<div className={styles.layoutBackground}>
			<Link to={'/login'} className={styles.login}>
				<span>Login</span>
			</Link>
			<FullPage>
				<Slide>
					<div className={styles.headerTitle}>
						<Reveal>
							<div className={styles.title}>Feel the vibe</div>
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
			</FullPage>
		</div>
	)
}
export default WelcomePage
