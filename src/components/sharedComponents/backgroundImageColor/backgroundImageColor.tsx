import React, { useEffect, useState } from 'react'
import styles from './backgroundImageColor.module.scss'
import { useAppSelector } from '../../../redux/store'

const BackgroundImageColor = () => {
	const photoColor = useAppSelector((state) => state.auth.photoColor)
	const playingSongColor = useAppSelector(
		(state) => state.auth.playingSongColor
	)
	const isPlaying = useAppSelector((state) => state.auth.isPlaying)

	const [opacity, setOpacity] = useState(0)

	const handleScroll = () => {
		const scrollY = window.pageYOffset
		const opacityValue = scrollY / 200
		setOpacity(opacityValue)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return (
		<>
			<div
				className={styles.backgroundScrolled}
				style={{
					backgroundColor: isPlaying ? playingSongColor : photoColor,
					opacity: opacity,
				}}
			/>
			<div
				className={styles.backgroundImageColor}
				style={{
					backgroundColor: isPlaying ? playingSongColor : photoColor,
				}}
			/>
		</>
	)
}
export default BackgroundImageColor
