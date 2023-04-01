import React from 'react'

type SearchType = {
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ search, setSearch }: SearchType) => {
	return (
		<input onChange={(event) => setSearch(event.target.value)} value={search} />
	)
}
export default SearchBar
