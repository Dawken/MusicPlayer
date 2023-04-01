import { useEffect, useState } from 'react'
import musicPlayerBackend from '../config/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/store'

const useAuth = () => {
	const navigate = useNavigate()
	const [spotify, setSpotify] = useState({
		accessToken: '',
		refreshToken: '',
		expires: 0,
	})

	const isLogged = useAppSelector((state) => state.auth.isLoggedIn)

	const { refreshToken, expires, accessToken } = spotify
	useEffect(() => {
		if (!accessToken && isLogged)
			musicPlayerBackend
				.get('/api/get-cookie')
				.then((res) => {
					window.history.pushState({}, '', '/')
					setSpotify(res.data)
				})
				.catch(() => {
					navigate('/login')
				})
	}, [])

	useEffect(() => {
		if (!refreshToken || !expires) return
		const interval = setInterval(() => {
			musicPlayerBackend
				.post('/api/refreshToken', {
					refreshToken,
				})
				.then((res) => {
					setSpotify({
						...spotify,
						accessToken: res.data.accessToken,
						expires: res.data.expires,
					})
				})
				.catch(() => {
					navigate('/login')
				})
		}, (expires - 120) * 1000)
		return () => clearInterval(interval)
	}, [accessToken, expires])
	return spotify
}
export default useAuth
