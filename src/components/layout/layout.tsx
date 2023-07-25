import React from 'react'
import SearchBar from '../sharedComponents/searchBar/searchBar'
import ResultsLayout from './resultsLayout/resultsLayout'
import styles from './layout.module.scss'
import BackgroundImageColor from '../sharedComponents/backgroundImageColor/backgroundImageColor'
import useSearchBar from '../sharedComponents/searchBar/useSearchBar'

const Layout = () => {
    const { setSearch, search, searchResult, artists } = useSearchBar()

    return (
        <div className={styles.layoutContainer}>
            <BackgroundImageColor color={undefined} />
            <div className={styles.mainContainer}>
                <SearchBar search={search} setSearch={setSearch} />
                <ResultsLayout searchResult={searchResult} artists={artists} />
            </div>
        </div>
    )
}
export default Layout
