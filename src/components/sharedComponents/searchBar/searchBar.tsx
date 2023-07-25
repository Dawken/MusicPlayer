import React from 'react'
import styles from './searchBar.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import { store } from '../../../redux/store'
import { setIsUserTyping } from '../../../redux/user'

type SearchType = {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ search, setSearch }: SearchType) => {
    const handleTyping = () => {
        store.dispatch(setIsUserTyping({ isUserTyping: true }))
        setTimeout(() => {
            store.dispatch(setIsUserTyping({ isUserTyping: false }))
        }, 2500)
    }

    const handleNotTyping = () => {
        store.dispatch(setIsUserTyping({ isUserTyping: false }))
    }

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
