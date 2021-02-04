const mixinDrawer = {
  computed: {
    drawer: {
      get() {
        return this.$store.getters['AppLayout/drawer']
      },
      set(newInfo) {
        this.$store.commit('AppLayout/updateDrawer', newInfo)
      }
    }
  },
  methods: {
    toggleDrawer() {
      this.$store.commit('AppLayout/updateDrawer', !this.$store.getters['AppLayout/drawer'])
    }
  }
}

export default mixinDrawer
