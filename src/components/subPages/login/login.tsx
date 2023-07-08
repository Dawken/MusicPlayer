import React from 'react'
import { spotifyAuthenticationUrl } from '../../../shared/spotifyAuthenticationUrl'
import useLogin from './useLogin'

const Login = () => {
	const { isLoading } = useLogin()

	if (isLoading) return <div>Loading...</div>
	return <a href={spotifyAuthenticationUrl.url}>Login</a>
}
export default Login
