import { useMutation } from 'react-query'
import musicPlayerBackend from '../../../lib/axiosConfig'
import { toast } from 'react-toastify'
import { store } from '../../../context/redux/store'
import { getClientResponse } from '../../../context/redux/user'
import styles from './logoutButton.module.scss'
import React from 'react'

const LogoutButton = () => {
    const { mutate: logout } = useMutation(
        () => {
            return musicPlayerBackend.post('/api/logout')
        },
        {
            onSuccess: () => {
                toast.success('Your session expired')
                store.dispatch(getClientResponse({ isLogged: false }))
            },
            onError: () => {
                toast.error('Logout failed')
            },
        }
    )

    return (
        <button className={styles.logout} onClick={() => logout()}>
            <div className={styles.logoutIcon}></div>
            <div className={styles.logoutText}>Logout</div>
        </button>
    )
}
export default LogoutButton
