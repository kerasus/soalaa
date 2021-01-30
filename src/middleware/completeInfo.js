export default function completeInfo({ store, next, router }) {
    let user = store.getters.user
    console.log('user', user)
    if (user.needToCompleteInfo() && process.env.VUE_APP_NEED_USER_INFO === 'true') {
        return router.push({ name: 'user-info' });
    }

    return next();
}
