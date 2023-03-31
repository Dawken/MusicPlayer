import React from 'react'
import useSearchBar from './useSearchBar'

const SearchBar = () => {
	const { setSearch, search } = useSearchBar()

	return (
		<input onChange={(event) => setSearch(event.target.value)} value={search} />
	)
}
export default SearchBar
