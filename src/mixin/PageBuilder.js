const mixinPageBuilder = {
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['PageBuilder/pageBuilderEditable']
    },
    initialSections() {
      return this.$store.getters['PageBuilder/initialSections']
    },
    currenSections: {
      get() {
        return this.$store.getters['PageBuilder/currentSections']
      },
      set(newInfo) {
        return this.$store.commit('PageBuilder/updateCurrentSections', newInfo)
      }
    }
  }
}

export default mixinPageBuilder
