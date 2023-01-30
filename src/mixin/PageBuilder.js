const mixinPageBuilder = {
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    },
    initialSections() {
      return this.$store.getters['AppLayout/initialSections']
    },
    currenSections: {
      get() {
        return this.$store.getters['AppLayout/currentSections']
      },
      set(newInfo) {
        return this.$store.commit('AppLayout/updateCurrentSections', newInfo)
      }
    }
  }
}

export default mixinPageBuilder
