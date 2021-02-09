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
    mounted() {
    },
    methods: {
    }
}

export default mixinAuth
