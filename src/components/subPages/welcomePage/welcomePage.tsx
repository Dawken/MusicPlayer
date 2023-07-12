import React from 'react'
import threejs from './threejs'
import styles from './welcomePage.module.scss'
import 'animate.css'
import { Link } from 'react-router-dom'
import Reveal from './reveal'
import { FullPage, Slide } from 'react-full-page'

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
							<h1>Feel the vibe</h1>
						</Reveal>
					</div>
					<canvas className={styles.webgl} ref={canvasRef}></canvas>
				</Slide>
			</FullPage>
		</div>
	)
}
export default WelcomePage
