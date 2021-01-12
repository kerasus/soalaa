import axios from 'axios'

export default function auth({ from, next, router }) {
    window.localStorage.setItem('redirect_to', from.name)

    if (!window.localStorage.getItem('access_token')) {
        return router.push({ name: 'login' });
    }
    const token = window.localStorage.getItem('access_token')
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
    return next();
}
