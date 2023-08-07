import { useEffect, useState } from 'react'
import spotifyApi from '../../../services/spotifyApi'
import useAuth from '../../../hooks/useAuth'
import SpotifyApi from 'spotify-web-api-node'
import ArtistObjectFull = SpotifyApi.ArtistObjectFull
import TrackObjectFull = SpotifyApi.TrackObjectFull
import { store } from '../../../context/redux/store'
import { setIsUserTyping } from '../../../context/redux/user'

const useSearchBar = () => {
    const spotify = useAuth()
    const { accessToken } = spotify

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState<TrackObjectFull[]>([])
    const [artists, setArtists] = useState<ArtistObjectFull[]>()

    useEffect(() => {
        if (!search) return setSearchResult([])
        if (!accessToken) return

        if (accessToken) {
            spotifyApi.setAccessToken(accessToken)
            spotifyApi.searchTracks(search).then((res) => {
                if (res.body.tracks) {
                    setSearchResult(res.body.tracks.items)
                }
            })
            spotifyApi.searchArtists(search).then((res) => {
                if (res.body.artists?.items) {
                    setArtists(res.body.artists.items)
                }
            })
        }
    }, [search])

    const handleTyping = () => {
        store.dispatch(setIsUserTyping({ isUserTyping: true }))
        setTimeout(() => {
            store.dispatch(setIsUserTyping({ isUserTyping: false }))
        }, 2500)
    }

    const handleNotTyping = () => {
        store.dispatch(setIsUserTyping({ isUserTyping: false }))
    }

    return {
        setSearch,
        search,
        searchResult,
        artists,
        handleTyping,
        handleNotTyping,
    }
}
export default useSearchBar
