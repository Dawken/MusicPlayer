import React from 'react'
import SearchBar from './searchBar/searchBar'
import PlaylistContainer from './playlistContainer/playlistContainer'
import useLayout from './useLayout'
import styles from './layout.module.scss'
import BackgroundImageColor from '../sharedComponents/backgroundImageColor/backgroundImageColor'

const Layout = () => {
	const { setSearch, search, searchResult, artists } = useLayout()

	return (
		<div className={styles.layoutContainer}>
			<BackgroundImageColor />
			<div className={styles.mainContainer}>
				<SearchBar search={search} setSearch={setSearch} />
				<PlaylistContainer searchResult={searchResult} artists={artists} />
			</div>
		</div>
	)
}
export default Layout
