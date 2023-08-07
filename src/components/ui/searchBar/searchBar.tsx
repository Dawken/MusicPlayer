import React from 'react'
import styles from './searchBar.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import useSearchBar from './useSearchBar'

type SearchType = {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ search, setSearch }: SearchType) => {
    const { handleTyping, handleNotTyping } = useSearchBar()
    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
                <SearchIcon className={styles.searchIcon} />
                <input
                    onInput={handleTyping}
                    onBlur={handleNotTyping}
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
