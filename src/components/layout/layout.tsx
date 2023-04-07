import React from 'react'
import SearchBar from './searchBar/searchBar'
import PlaylistContainer from './playlistContainer/playlistContainer'
import useLayout from './useLayout'
import MusicPlayer from '../sharedComponents/musicPlayer/musicPlayer'
import { useAppSelector } from '../../redux/store'
import styles from './layout.module.scss'

const Layout = () => {
	const { setSearch, search, searchResult, artists } = useLayout()

	const track = useAppSelector((state) => state.auth.track)

	return (
		<div className={styles.layoutContainer}>
			<SearchBar search={search} setSearch={setSearch} />
			<PlaylistContainer searchResult={searchResult} artists={artists} />
			<MusicPlayer trackUri={track} />
		</div>
	)
}
export default Layout
