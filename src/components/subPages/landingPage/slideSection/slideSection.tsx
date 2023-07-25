import React from 'react'
import styles from './slideSections.module.scss'
import Reveal from '../reveal/reveal'

type SectionType = {
    header: string
    image: string
    list: string[]
}

const SlideSection = ({ header, image, list }: SectionType) => {
    return (
        <div className={styles.exploreLayout}>
            <div className={styles.soundsHeader}>
                <Reveal>
                    <h1>{header}</h1>
                </Reveal>
            </div>
            <div className={styles.explore}>
                <img src={image} className={styles.exploreImg}></img>
                <ul className={styles.exploreList}>
                    {list.map((item) => {
                        return (
                            <Reveal key={item}>
                                <li>{item}</li>
                            </Reveal>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
export default SlideSection
