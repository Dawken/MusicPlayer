import { store, useAppSelector } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import musicPlayerBackend from '../../../config/axiosConfig'
import { getClientResponse } from '../../../redux/user'
import { useEffect } from 'react'

const useLogin = () => {
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
	return {
		isLoading,
	}
}
export default useLogin
