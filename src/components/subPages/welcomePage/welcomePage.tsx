import React from 'react'
import threejs from './threejs'
import { FullPage, Slide } from 'react-full-page'
import styles from './welcomePage.module.scss'

const WelcomePage = () => {
	threejs()

	return (
		<div className={styles.layoutBackground}>
			<FullPage>
				<Slide>
					<canvas className='webgl'></canvas>
				</Slide>
				<Slide>
					<h1>Another slide content</h1>
				</Slide>
			</FullPage>
		</div>
	)
}
export default WelcomePage
