import React, { Fragment } from 'react'
import styles from './backgroundImageColor.module.scss'
import useBackgroundImageColor from './useBackgroundImageColor'

type colorType = {
    color?: string
}

const BackgroundImageColor = (color: colorType) => {
    const { photoColor, playingSongColor, isPlaying, opacity } =
        useBackgroundImageColor()

    return (
        <Fragment>
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
        </Fragment>
    )
}
export default BackgroundImageColor
