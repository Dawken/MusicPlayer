import styles from './logoutButton.module.scss'
import React from 'react'
import useLogoutButton from './useLogoutButton'

const LogoutButton = () => {
    const { logout } = useLogoutButton()

    return (
        <button className={styles.logout} onClick={() => logout()}>
            <div className={styles.logoutIcon}></div>
            <div className={styles.logoutText}>Logout</div>
        </button>
    )
}
export default LogoutButton
