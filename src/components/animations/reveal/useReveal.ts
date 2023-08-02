import { useEffect, useRef } from 'react'
import { useAnimation, useInView } from 'framer-motion'

const useReveal = () => {
    const ref = useRef(null)

    const isInView = useInView(ref, { once: false })

    const mainControls = useAnimation()
    const slideControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible')
            slideControls.start('visible')
        } else {
            mainControls.start('hidden')
            slideControls.start('hidden')
        }
    }, [isInView])

    return {
        ref,
        mainControls,
        slideControls,
    }
}
export default useReveal
