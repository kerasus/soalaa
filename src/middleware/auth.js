import axios from 'axios'

function isLogin() {
    let accessToken = window.localStorage.getItem('access_token')
    // let user = window.localStorage.getItem('user')
    return !!(accessToken)
    // return !!((!process.env.VUE_APP_AUTH_MODE && accessToken) ||
    //     (process.env.VUE_APP_AUTH_MODE === 'TOKEN' && accessToken) ||
    //     (process.env.VUE_APP_AUTH_MODE === 'SESSION' && user && user.id))
}

export default function auth({ to, next, router }) {
    // console.log('from', from)
    // console.log('to', to)
    window.localStorage.setItem('redirect_to', to.name)

    if (!isLogin()) {
        return router.push({ name: 'login' });
    }
    const token = window.localStorage.getItem('access_token')
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
    return next();
}
