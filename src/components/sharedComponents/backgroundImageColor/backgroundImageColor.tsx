import React from 'react'
import styles from './backgroundImageColor.module.scss'
import { useAppSelector } from '../../../redux/store'

const BackgroundImageColor = () => {
	const photoColor = useAppSelector((state) => state.auth.photoColor)

	return (
		<div
			className={styles.backgroundImageColor}
			style={{ backgroundColor: `${photoColor}` }}
		/>
	)
}
export default BackgroundImageColor
