import React from 'react'
import { spotifyAuthenticationUrl } from '../../../shared/spotifyAuthenticationUrl'
import useLogin from './useLogin'
import styles from './login.module.scss'
import SpotifyLogo from '../../../assets/spotify.png'
import { Link } from 'react-router-dom'

const Login = () => {
	useLogin()

	return (
		<div className={styles.layout}>
			<div className={styles.spotify}>
				<img src={SpotifyLogo} className={styles.spotifyLogo} />
				<div className={styles.spotifyText}>Spotify</div>
			</div>
			<Link
				to={spotifyAuthenticationUrl.url}
				className={styles.loginButton}
			>
				<span>Login</span>
			</Link>
		</div>
	)
}
export default Login
