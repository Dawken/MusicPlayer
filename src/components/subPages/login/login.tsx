import React, { useEffect } from 'react'
import { spotifyAuthenticationUrl } from '../../../shared/spotifyAuthenticationUrl'
import { useMutation } from 'react-query'
import { store, useAppSelector } from '../../../redux/store'
import { getClientResponse } from '../../../redux/user'
import musicPlayerBackend from '../../../config/axiosConfig'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const code = localStorage.getItem('code')
	const isLogged = useAppSelector((state) => state.auth.isLoggedIn)
	const navigate = useNavigate()

	const { isLoading, mutate: login } = useMutation(
		() => {
			return musicPlayerBackend.post('/api/login', {
				code,
			})
		},
		{
			onSuccess: () => {
				store.dispatch(getClientResponse({ isLogged: true }))
				window.history.pushState({}, '', '/')
				navigate('/')
			},
			onError: () => {
				navigate('/login')
			},
		}
	)
	useEffect(() => {
		if (code && !isLogged) {
			login()
		}
	}, [])

	if (isLoading) return <div>Loading...</div>
	return <a href={spotifyAuthenticationUrl.url}>Login</a>
}
export default Login
