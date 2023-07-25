import React from 'react'
import { spotifyAuthenticationUrl } from '../../../services/spotifyAuthenticationUrl'
import styles from './loginButton.module.scss'
import { Link } from 'react-router-dom'

const LoginButton = () => {
    return (
        <Link to={spotifyAuthenticationUrl.url} className={styles.loginButton}>
            <span>Login</span>
        </Link>
    )
}
export default LoginButton
