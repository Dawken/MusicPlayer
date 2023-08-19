import { ReactNode } from 'react'

const arrayFrom = (length: number, skeleton: ReactNode) => {
    return Array.from({ length }, () => skeleton)
}
export default arrayFrom
