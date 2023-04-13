import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.REACT_APP_CLIENT_ID,
})
export default spotifyApi
