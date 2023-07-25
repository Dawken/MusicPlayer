import axios from 'axios'
import { store } from '../redux/store'
import { getClientResponse } from '../redux/user'

const localHost = process.env.REACT_APP_BACKEND_HOST

const musicPlayerBackend = axios.create({
    baseURL: localHost,
    withCredentials: true,
})
musicPlayerBackend.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) {
        store.dispatch(getClientResponse({ isLogged: false }))
    }
    return Promise.reject(error)
})

export default musicPlayerBackend
