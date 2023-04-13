import React from 'react'
import styles from './sidebarMenu.module.scss'
import SpotifyLogo from '../../../assets/spotify.png'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import HomeIcon from '@mui/icons-material/Home'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined'
import LibraryAddSharpIcon from '@mui/icons-material/LibraryAddSharp'
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined'
import { useLocation } from 'react-router-dom'

const SidebarMenu = () => {
	const params = useLocation()

	const { pathname } = params

	return (
		<nav className={styles.sidebarMenuContainer}>
			<div className={styles.homePage}>
				<img src={SpotifyLogo} className={styles.spotifyLogo} />
				<div className={styles.spotifyText}>Spotify</div>
			</div>
			<ul className={styles.optionsList}>
				<li>
					<div className={styles.listOption}>
						{pathname === '/' ? (
							<HomeIcon className={styles.icon} />
						) : (
							<HomeOutlinedIcon className={styles.icon} />
						)}
						<div className={styles.listOptionText}>Home</div>
					</div>
				</li>
				<li>
					<div className={styles.listOption}>
						{pathname === '/createplaylist' ? (
							<LibraryAddSharpIcon className={styles.icon} />
						) : (
							<LibraryAddOutlinedIcon className={styles.icon} />
						)}
						<div className={styles.listOptionText}>Create playlist</div>
					</div>
				</li>
				<li>
					<div className={styles.listOption}>
						{pathname === '/playlists' ? (
							<CollectionsBookmarkIcon className={styles.icon} />
						) : (
							<CollectionsBookmarkOutlinedIcon className={styles.icon} />
						)}
						<div className={styles.listOptionText}>My playlists</div>
					</div>
				</li>
			</ul>
		</nav>
	)
}
export default SidebarMenu
