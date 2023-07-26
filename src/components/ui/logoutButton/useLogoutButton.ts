import { useMutation } from 'react-query'
import musicPlayerBackend from '../../../lib/axiosConfig'
import { toast } from 'react-toastify'
import { getClientResponse } from '../../../context/redux/user'
import { useDispatch } from 'react-redux'

const useLogoutButton = () => {
    const dispatch = useDispatch()

    const { mutate: logout } = useMutation(
        () => {
            return musicPlayerBackend.post('/api/logout')
        },
        {
            onSuccess: () => {
                toast.success('Your session expired')
                dispatch(getClientResponse({ isLogged: false }))
            },
            onError: () => {
                toast.error('Logout failed')
            },
        }
    )
    return {
        logout,
    }
}
export default useLogoutButton
