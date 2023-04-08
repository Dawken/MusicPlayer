import React from 'react'
import SearchBar from './searchBar/searchBar'
import PlaylistContainer from './playlistContainer/playlistContainer'
import useLayout from './useLayout'
import MusicPlayer from '../sharedComponents/musicPlayer/musicPlayer'
import { useAppSelector } from '../../redux/store'
import styles from './layout.module.scss'
import SidebarMenu from '../sharedComponents/sidebarMenu/sidebarMenu'

const Layout = () => {
	const { setSearch, search, searchResult, artists } = useLayout()

	const track = useAppSelector((state) => state.auth.track)

	return (
		<div className={styles.layoutContainer}>
			<SidebarMenu />
			<div className={styles.mainContainer}>
				<SearchBar search={search} setSearch={setSearch} />
				<PlaylistContainer searchResult={searchResult} artists={artists} />
			</div>
			<MusicPlayer trackUri={track} />
		</div>
	)
}
export default Layout
