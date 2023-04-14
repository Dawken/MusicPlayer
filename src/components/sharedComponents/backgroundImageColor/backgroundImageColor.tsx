import React from 'react'
import styles from './backgroundImageColor.module.scss'
import { useAppSelector } from '../../../redux/store'

const BackgroundImageColor = () => {
	const imageColor = useAppSelector((state) => state.auth.photoColor)

	return (
		<div
			className={styles.backgroundImageColor}
			style={{ backgroundColor: `${imageColor}` }}
		/>
	)
}
export default BackgroundImageColor
