import React from 'react'
import SearchBar from '../../components/ui/searchBar/searchBar'
import HomeResults from './homeResults/homeResults'
import styles from './home.module.scss'
import BackgroundImageColor from '../../components/ui/backgroundImageColor/backgroundImageColor'
import useSearchBar from '../../components/ui/searchBar/useSearchBar'

const Home = () => {
    const { setSearch, search, searchResult, artists } = useSearchBar()

    return (
        <div className={styles.layoutContainer}>
            <BackgroundImageColor color={undefined} />
            <div className={styles.mainContainer}>
                <SearchBar search={search} setSearch={setSearch} />
                <HomeResults searchResult={searchResult} artists={artists} />
            </div>
        </div>
    )
}
export default Home
