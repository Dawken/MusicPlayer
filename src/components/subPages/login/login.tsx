import React from 'react'
import useLogin from './useLogin'
import styles from './login.module.scss'
import SpotifyLogo from '../../../assets/spotify.png'
import LoginButton from '../../sharedComponents/loginButton/loginButton'

const Login = () => {
	useLogin()

	return (
		<div className={styles.layout}>
			<div className={styles.spotify}>
				<img src={SpotifyLogo} className={styles.spotifyLogo} />
				<div className={styles.spotifyText}>Spotify</div>
			</div>
			<LoginButton />
		</div>
	)
}
export default Login
