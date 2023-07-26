import { store, useAppSelector } from '../../../context/redux/store'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import musicPlayerBackend from '../../../lib/axiosConfig'
import { getClientResponse } from '../../../context/redux/user'
import { useEffect } from 'react'

const useLogin = () => {
    const isLogged = useAppSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate()

    const { isLoading, mutate: login } = useMutation(
        () => {
            return musicPlayerBackend.post('/api/login')
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
        if (!isLogged) {
            login()
        }
    }, [])
    return {
        isLoading,
    }
}
export default useLogin