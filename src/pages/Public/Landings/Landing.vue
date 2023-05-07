<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :loading="pageLoading"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinPageBuilder } from 'src/mixin/Mixins.js'
import { PageSetting } from 'src/models/PageSetting.js'

export default {
  name: 'Landing',
  mixins: [mixinPageBuilder],
  data: () => ({
    pageLoading: false,
    pageConfig: {}
  }),
  created () {
    this.pageLoading = true
    this.createLanding()
    this.$store.dispatch('PageBuilder/getPageWidget', this.getLandingKey())
      .then(() => {
        this.pageLoading = false
      })
      .catch(() => {
        this.pageLoading = false
      })
  },
  // mounted () {
  //   // ToDo: must call after prefetchServerDataPromiseThen or prefetchServerDataPromiseCatch (mixinPageOptions)
  //   setTimeout(() => {
  //     this.checkNewLanding()
  //   }, 1000)
  // },
  methods: {
    checkNewLanding () {
      if (this.pageDataLoaded) {
        return
      }
      this.$q.dialog({
        title: 'ساخت لندینگ جدید',
        message: 'از نام لندینگ ' + this.$route.params.landing_name + ' اطمینان دارید؟ ',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.createNewLanding()
      }).onCancel(() => {
        this.$router.push({ name: 'HomePage' })
      })
    },
    getLandingKey () {
      const params = JSON.stringify(this.$route.params)
      const routeName = this.$route.name
      return 'route_name:' + routeName + '-params:' + params
    },
    createLanding () {
      // this.$store.dispatch('PageBuilder/getPageWidget', this.$route.name)
      this.$store.dispatch('PageBuilder/editPageWidget', {
        key: this.getLandingKey(),
        value: this.getPageSettingValue()
      })
        .then(() => {
          this.pageLoading = false
        })
        .catch(() => {
          this.pageLoading = false
        })
    },
    getPageSettingValue (sections = [], seo = {}, layoutConfig = {}) {
      const pageSetting = new PageSetting({
        value: { sections, seo, layoutConfig }
      })
      return pageSetting.getStringifyValue()
    }
  }
}
</script>
