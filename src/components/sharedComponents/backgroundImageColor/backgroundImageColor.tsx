import React from 'react'
import styles from './backgroundImageColor.module.scss'
import useBackgroundImageColor from './useBackgroundImageColor'

const BackgroundImageColor = (color: { color: string | undefined }) => {
    const { photoColor, playingSongColor, isPlaying, opacity } =
        useBackgroundImageColor()

    return (
        <>
            <div
                className={styles.backgroundScrolled}
                style={{
                    backgroundColor: color.color
                        ? color.color
                        : isPlaying
                        ? playingSongColor
                        : photoColor,
                    opacity: opacity,
                }}
            />
            <div
                className={styles.backgroundImageColor}
                style={{
                    backgroundColor: color.color
                        ? color.color
                        : isPlaying
                        ? playingSongColor
                        : photoColor,
                }}
            />
        </>
    )
}
export default BackgroundImageColor
