const mixinWindowSize = {
    computed: {
        windowSize: {
            get() {
                return this.$store.getters.windowSize
            },
            set(newInfo) {
                this.$store.commit('updateWindowSize', newInfo)
            }
        }
    },
    mounted() {
        this.updateWindowSize()
    },
    methods: {
        updateWindowSize() {
            this.$store.commit('updateWindowSize', { x: window.innerWidth, y: window.innerHeight })
        }
    }
}

export default mixinWindowSize
