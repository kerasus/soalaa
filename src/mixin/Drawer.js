const mixinDrawer = {
  computed: {
    drawer: {
      get () {
        return this.$store.getters['AppLayout/layoutLeftDrawer']
      },
      set (newInfo) {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', newInfo)
      }
    }
  },
  methods: {
    toggleDrawer () {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', !this.$store.getters['AppLayout/layoutLeftDrawerVisible'])
    }
  }
}

export default mixinDrawer
