export default function completeInfo({ store, next, router }) {
    let user = store.getters['Auth/user']
    if (user.needToCompleteInfo()) {
        return router.push({ name: 'user-info' });
    }

    return next();
}
