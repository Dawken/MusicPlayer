import { useEffect, useState } from 'react';
import musicPlayerBackend from '../config/axiosConfig';
import { useNavigate, useOutletContext } from 'react-router-dom';

const useAuth = () => {
	const code = useOutletContext();
	const [spotify, setSpotify] = useState({
		accessToken: '',
		refreshToken: '',
		expiresIn: '',
	});
	const navigate = useNavigate();
	useEffect(() => {
		musicPlayerBackend
			.post('/api/login', {
				code,
			})
			.then((res) => {
				setSpotify(res.data);
				window.history.pushState({}, '', '/');
			})
			.catch(() => {
				navigate('/');
			});
	}, [code]);

	return spotify;
};
export default useAuth;
