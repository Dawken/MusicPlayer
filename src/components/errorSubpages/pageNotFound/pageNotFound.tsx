import React from 'react'
import styles from './pageNotFound.module.scss'
import { Link } from 'react-router-dom'
import ghost from '../../../assets/ghost.png'

const PageNotFound = () => {
	return (
		<div className={styles.errorContainer}>
			<div className={styles.error}>
				<div className={styles.errorMessage}>
					Something went wrong...
				</div>
				<div className={styles.ghostContainer}>
					<img src={ghost} className={styles.ghost} />
				</div>
				<div className={styles.buttonContainer}>
					<Link to={'/'}>
						<button className={styles.takeMeBackButton}>
							Take me Back
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default PageNotFound
