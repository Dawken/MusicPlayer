import React from 'react'
import threejs from './threejs'
import styles from './welcomePage.module.scss'
import 'animate.css'
import { Link } from 'react-router-dom'
import Reveal from './reveal'
import { FullPage, Slide } from 'react-full-page'
import explore from '../../../assets/spotify-premium.jpg'

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
					<div className={styles.exploreLayout}>
						<div className={styles.soundsHeader}>
							<Reveal>
								<h1>Explore new sounds</h1>
							</Reveal>
						</div>
						<div className={styles.explore}>
							<img
								src={explore}
								className={styles.exploreImg}
							></img>
							<ul className={styles.exploreList}>
								<Reveal>
									<li>
										Search for new songs, artists and albums
									</li>
								</Reveal>
								<Reveal>
									<li>
										Explore personalized recommendations and
										discover new music
									</li>
								</Reveal>
								<Reveal>
									<li>
										Stream songs and create your own music
										library
									</li>
								</Reveal>
							</ul>
						</div>
					</div>
				</Slide>
			</FullPage>
		</div>
	)
}
export default WelcomePage
