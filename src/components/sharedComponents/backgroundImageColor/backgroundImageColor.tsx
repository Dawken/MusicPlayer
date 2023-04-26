import React from 'react'
import styles from './backgroundImageColor.module.scss'
import useBackgroundImageColor from './useBackgroundImageColor'

const BackgroundImageColor = () => {
	const { photoColor, playingSongColor, isPlaying, opacity } =
		useBackgroundImageColor()

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
