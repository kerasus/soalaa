import axios from 'axios'

export default function auth({ store, to, next, router }) {
    let token = store.getters['Auth/accessToken']

    if (to.name === 'login') {
        return next();
    }

    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        return next();
    }

    if (!token) {
        store.commit('Auth/updateRedirectTo', to.name)
        return router.push({ name: 'login' });
    }
}
