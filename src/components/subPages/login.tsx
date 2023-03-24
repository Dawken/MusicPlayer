import React from 'react'
import {spotifyAuthenticationUrl} from '../shared/spotifyAuthenticationUrl'


const Login = () => {
	return (
		<a href={spotifyAuthenticationUrl.url}>Login</a>
	)
}
export default Login
