import { APIGateway } from 'src/api/APIGateway'

const mixinPageOptions = {
  data() {
    return {
      pageConfig: {}
    }
  },
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
    pageDataLoaded () {
      return this.$store.getters['PageBuilder/pageDataLoaded']
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
  },
  methods: {
    prefetchServerDataPromise () {
      return this.getPageConfigRequest()
    },
    prefetchServerDataPromiseThen (pageSetting) {
      const sections = pageSetting.value.sections
      const seo = pageSetting.value.seo

      // PageBuilder
      this.$store.commit('PageBuilder/updateCurrentSections', sections)

      // SEO
      this.$store.commit('SEO/updateTitle', seo.title)
      this.$store.commit('SEO/updateDescription', seo.description)
      this.$store.commit('SEO/updateRobots', seo.robots)
      this.$store.commit('SEO/updateOgTitle', seo.ogTitle)
      this.$store.commit('SEO/updateOgDescription', seo.ogDescription)
      this.$store.commit('SEO/updateOgUrl', seo.ogUrl)
      this.$store.commit('SEO/updateOgImage', seo.ogImage)

      this.pageBuilderLoading = false

      this.$store.commit('PageBuilder/updatePageDataLoaded', true)
    },
    prefetchServerDataPromiseCatch () {
      this.pageBuilderLoading = false
    },
    getPageConfigRequest() {
      this.pageBuilderLoading = true
      const params = JSON.stringify(this.$route.params)
      const routeName = this.$route.name
      const key = 'route_name:' + routeName + (this.hasDynamicSettingWithParams ? ('-params:' + params) : '')
      return APIGateway.pageSetting.get(key)
    }
  }
}

export default mixinPageOptions
