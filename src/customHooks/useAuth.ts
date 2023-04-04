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

	useEffect(() => {
		if (isLogged)
			musicPlayerBackend
				.get('/api/get-cookie')
				.then((res) => {
					setSpotify(res.data)
				})
				.catch(() => {
					navigate('/login')
				})
	}, [])

	return spotify
}
export default useAuth
