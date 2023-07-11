import React from 'react'
import threejs from './threejs'
import styles from './welcomePage.module.scss'
import 'animate.css'
import { FullPage, Slide } from 'react-full-page'
import { Link } from 'react-router-dom'

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
						<h1
							className={'animate__animated animate__slideInLeft'}
						>
							Feel the vibe
						</h1>
					</div>
					<canvas className={styles.webgl} ref={canvasRef}></canvas>
				</Slide>
				<Slide>Example</Slide>
			</FullPage>
		</div>
	)
}
export default WelcomePage
