const mixinDrawer = {
  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer
      },
      set(newInfo) {
        this.$store.commit('updateDrawer', newInfo)
      }
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.commit('updateDrawer', !this.$store.getters.drawer)
    }
  }
}

export default mixinDrawer
