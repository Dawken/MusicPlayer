import React from 'react'
import { motion } from 'framer-motion'
import styles from './reveal.module.scss'
import useReveal from './useReveal'

type ChildrenType = {
    children: JSX.Element
}

const Reveal = ({ children }: ChildrenType) => {
    const { ref, mainControls, slideControls } = useReveal()

    return (
        <div ref={ref} className={styles.reveal}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial='hidden'
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
            <motion.div
                variants={{
                    hidden: { left: 0 },
                    visible: { left: '100%' },
                }}
                initial='hidden'
                animate={slideControls}
                transition={{ duration: 0.3, delay: 0.25, ease: 'easeIn' }}
                className={styles.greenReveal}
            ></motion.div>
        </div>
    )
}
export default Reveal
