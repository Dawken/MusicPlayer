import { useAppSelector } from '../../../context/redux/store'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import musicPlayerBackend from '../../../lib/axiosConfig'
import { getClientResponse } from '../../../context/redux/user'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useLogin = () => {
    const isLogged = useAppSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, mutate: login } = useMutation(
        () => {
            return musicPlayerBackend.post('/api/login')
        },
        {
            onSuccess: () => {
                dispatch(getClientResponse({ isLogged: true }))
                navigate('/')
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
