const mixinWindowSize = {
    computed: {
        windowSize: {
            get() {
                return this.$store.getters['AppLayout/windowSize']
            },
            set(newInfo) {
                this.$store.commit('AppLayout/updateWindowSize', newInfo)
            }
        }
    },
    mounted() {
        this.updateWindowSize()
    },
    methods: {
        updateWindowSize() {
            this.$store.commit('AppLayout/updateWindowSize', { x: window.innerWidth, y: window.innerHeight })
        }
    }
}

export default mixinWindowSize
