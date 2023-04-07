import React from 'react'
import styles from './searchBar.module.scss'
import SearchIcon from '@mui/icons-material/Search'

type SearchType = {
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ search, setSearch }: SearchType) => {
	return (
		<div className={styles.searchBarContainer}>
			<div className={styles.searchBar}>
				<SearchIcon className={styles.searchIcon} />
				<input
					className={styles.searchInput}
					placeholder={'Search something'}
					onChange={(event) => setSearch(event.target.value)}
					value={search}
				/>
			</div>
		</div>
	)
}
export default SearchBar
