const mixinAuth = {
    computed: {
        user: {
            get() {
                return this.$store.getters['Auth/user']
            },
            set(newInfo) {
                this.$store.commit('Auth/updateUser', newInfo)
            }
        }
    },
    methods: {
        getUserData (callbasck) {
            let that = this
            this.user.getUserData()
                .then( (user) => {
                    that.$store.commit('Auth/updateUser', user)
                    if (typeof callbasck === 'function') {
                        callbasck()
                    }
                })
        }
    }
}

export default mixinAuth
