import React from 'react'
import SearchBar from './searchBar/searchBar'
import PlaylistContainer from './playlistContainer/playlistContainer'
import useLayout from './useLayout'
import MusicPlayer from '../sharedComponents/musicPlayer/musicPlayer'
import { useAppSelector } from '../../redux/store'

const Layout = () => {
	const { setSearch, search, searchResult } = useLayout()

	const track = useAppSelector((state) => state.auth.track)

	return (
		<div>
			<SearchBar search={search} setSearch={setSearch} />
			<PlaylistContainer searchResult={searchResult} />
			<MusicPlayer trackUri={track} />
		</div>
	)
}
export default Layout
