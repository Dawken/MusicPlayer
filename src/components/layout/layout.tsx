import React from 'react'
import SearchBar from './searchBar/searchBar'
import PlaylistContainer from './playlistContainer/playlistContainer'
import useLayout from './useLayout'
import MusicPlayer from '../sharedComponents/musicPlayer/musicPlayer'
import styles from './layout.module.scss'
import SidebarMenu from '../sharedComponents/sidebarMenu/sidebarMenu'

const Layout = () => {
	const { setSearch, search, searchResult, artists, track, color } = useLayout()

	return (
		<div className={styles.layoutContainer}>
			<SidebarMenu />
			<div className={styles.mainContainer}>
				<div
					className={styles.backgroundImageColor}
					style={{ backgroundColor: `${color}` }}
				></div>
				<SearchBar search={search} setSearch={setSearch} />
				<PlaylistContainer searchResult={searchResult} artists={artists} />
			</div>
			<MusicPlayer trackUri={track} />
		</div>
	)
}
export default Layout
