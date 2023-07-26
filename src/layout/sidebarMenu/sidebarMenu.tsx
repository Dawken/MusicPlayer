import React from 'react'
import styles from './sidebarMenu.module.scss'
import SpotifyLogo from '../../assets/spotify.png'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import HomeIcon from '@mui/icons-material/Home'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined'
import LibraryAddSharpIcon from '@mui/icons-material/LibraryAddSharp'
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined'
import { Link } from 'react-router-dom'
import useSidebarMenu from './useSidebarMenu'

const SidebarMenu = () => {
    const { playingSongPhoto, pathname, windowWidth, createPlaylist } =
        useSidebarMenu()

    return (
        <nav className={styles.sidebarMenuContainer}>
            <Link to={'/'} className={styles.homePage}>
                <img src={SpotifyLogo} className={styles.spotifyLogo} />
                <div className={styles.spotifyText}>Spotify</div>
            </Link>
            <ul className={styles.optionsList}>
                <li>
                    <Link to={'/'} className={styles.listOption}>
                        {pathname === '/' ? (
                            <HomeIcon className={styles.icon} />
                        ) : (
                            <HomeOutlinedIcon className={styles.icon} />
                        )}
                        <div className={styles.listOptionText}>Home</div>
                    </Link>
                </li>
                <li>
                    <div onClick={createPlaylist} className={styles.listOption}>
                        {pathname === '/playlist' ? (
                            <LibraryAddSharpIcon className={styles.icon} />
                        ) : (
                            <LibraryAddOutlinedIcon className={styles.icon} />
                        )}
                        <div className={styles.listOptionText}>
                            Create playlist
                        </div>
                    </div>
                </li>
                <li>
                    <Link to={'/playlists'} className={styles.listOption}>
                        {pathname === '/playlists' ? (
                            <CollectionsBookmarkIcon className={styles.icon} />
                        ) : (
                            <CollectionsBookmarkOutlinedIcon
                                className={styles.icon}
                            />
                        )}
                        <div className={styles.listOptionText}>
                            My playlists
                        </div>
                    </Link>
                </li>
            </ul>
            {playingSongPhoto && windowWidth > 1100 && (
                <div style={{ width: '250px', height: '250px' }}>
                    <img
                        src={playingSongPhoto}
                        className={styles.playingSongPhoto}
                        alt='Song Cover'
                    />
                </div>
            )}
        </nav>
    )
}
export default SidebarMenu
