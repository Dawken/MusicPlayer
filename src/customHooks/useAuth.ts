import { useEffect, useState } from 'react'
import musicPlayerBackend from '../config/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/store'

const useAuth = () => {
	const navigate = useNavigate()
	const [spotify, setSpotify] = useState({
		accessToken: '',
	})

	const isLogged = useAppSelector((state) => state.auth.isLoggedIn)

	const { accessToken } = spotify
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

	return spotify
}
export default useAuth
