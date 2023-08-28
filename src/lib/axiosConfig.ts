import axios from 'axios'
import { store } from '../context/redux/store'
import { getClientResponse } from '../context/redux/user'

const authGateway = process.env.REACT_APP_AUTH_GATEWAY

const musicPlayerBackend = axios.create({
    baseURL: authGateway,
    withCredentials: true,
})
musicPlayerBackend.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) {
        store.dispatch(getClientResponse({ isLogged: false }))
    }
    return Promise.reject(error)
})

export default musicPlayerBackend
