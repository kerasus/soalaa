const mixinPageBuilder = {
  computed: {
    hasDynamicSetting () {
      return !!this.$route.meta?.hasDynamicSetting
    },
    hasDynamicSettingWithParams () {
      return !!this.$route.meta?.hasDynamicSettingWithParams
    },
    pageBuilderEditable () {
      return this.$store.getters['PageBuilder/pageBuilderEditable']
    },
    initialSections() {
      return this.$store.getters['PageBuilder/initialSections']
    },
    pageBuilderLoading: {
      get() {
        return this.$store.getters['PageBuilder/pageBuilderLoading']
      },
      set(newInfo) {
        return this.$store.commit('PageBuilder/updatePageBuilderLoading', newInfo)
      }
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
