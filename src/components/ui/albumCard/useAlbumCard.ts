import { useAppSelector } from '../../../context/redux/store'
import React, { useEffect, useState } from 'react'
import getColorFromImage from '../../../utils/functions/getColorFromImage'
import { hexToRgb } from '@mui/material'
import SpotifyApi from 'spotify-web-api-node'
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified
import PlaylistObjectSimplified = SpotifyApi.PlaylistObjectSimplified

const useAlbumCard = (
    item: AlbumObjectSimplified | PlaylistObjectSimplified
) => {
    const isPlaying = useAppSelector((state) => state.auth.isPlaying)
    const trackId = useAppSelector((state) => state.auth.track)

    const [imageColor, setImageColor] = useState('')
    useEffect(() => {
        getColorFromImage(item.images[0]?.url, setImageColor)
    }, [])

    const rgbaColor = hexToRgb(imageColor)

    const boxShadowStyle = {
        '--box-shadow-color': rgbaColor.slice(4, -1),
    } as React.CSSProperties

    return {
        isPlaying,
        trackId,
        imageColor,
        boxShadowStyle,
    }
}
export default useAlbumCard
