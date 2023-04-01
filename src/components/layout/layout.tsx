import React from 'react'
import SearchBar from './searchBar/searchBar'
import PlaylistContainer from './playlistContainer/playlistContainer'
import useLayout from './useLayout'

const Layout = () => {
	const { setSearch, search, searchResult } = useLayout()
	return (
		<div>
			<SearchBar search={search} setSearch={setSearch} />
			<PlaylistContainer searchResult={searchResult} />
		</div>
	)
}
export default Layout
