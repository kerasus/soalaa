import axios from 'axios'

export default function auth({ next, router }) {
    if (!window.localStorage.getItem('access_token')) {
        return router.push({ name: 'login' });
    }
    const token = localStorage.getItem('access_token')
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
    return next();
}
