const { REACT_APP_SPOTIFY_CLIENT_ID, REACT_APP_FRONT_HOST } = process.env

const clientId = REACT_APP_SPOTIFY_CLIENT_ID || 'clientId'
const frontHost = REACT_APP_FRONT_HOST || 'http://localhost:3000'

const spotifyUrl = new URL('https://accounts.spotify.com/authorize')
spotifyUrl.searchParams.append('client_id', clientId)
spotifyUrl.searchParams.append('response_type', 'code')
spotifyUrl.searchParams.append('redirect_uri', frontHost)
spotifyUrl.searchParams.append(
    'scope',
    [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-library-read',
        'user-library-modify',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-recently-played',
        'playlist-modify-public',
        'playlist-modify-private',
    ].join(' ')
)
export const spotifyAuthenticationUrl = {
    url: spotifyUrl.toString(),
}
