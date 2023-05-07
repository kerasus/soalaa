<template>
  <q-page-sticky position="bottom-left"
                 :offset="fabPos"
                 class="floating-action-btn-page-builder">
    <q-fab v-model="pageOptionsFloatingActionButton"
           v-touch-pan.prevent.mouse="moveFab"
           :persistent="true"
           label-position="top"
           external-label
           color="primary"
           icon="isax:edit"
           direction="up">
      <template v-if="!pageBuilderEditable">
        <q-fab-action external-label
                      label-position="right"
                      color="primary"
                      icon="isax:grid-edit"
                      label="ویرایش صفحه"
                      @click="togglePageBuilderEditable" />
        <q-fab-action external-label
                      label-position="right"
                      color="primary"
                      icon="isax:subtitle"
                      label="ویرایش SEO"
                      @click="openSeoDialog" />
      </template>
      <template v-else>
        <q-fab-action external-label
                      label-position="right"
                      color="info"
                      icon="isax:eye"
                      label="نمایش کانفیگ"
                      @click="showPageBuilderShowConfigs" />
        <q-fab-action external-label
                      label-position="right"
                      color="info"
                      icon="isax:eye"
                      label="وارد کردن کانفیگ"
                      @click="showPageBuilderImportConfigs" />
        <q-fab-action external-label
                      label-position="right"
                      color="info"
                      icon="isax:eye"
                      label="پیشنمایش"
                      @click="togglePageBuilderEditable" />
        <q-fab-action external-label
                      label-position="right"
                      color="positive"
                      icon="isax:clipboard-tick"
                      label="ساخت"
                      @click="createPageBuilderConfig" />
        <q-fab-action external-label
                      label-position="right"
                      color="positive"
                      icon="isax:clipboard-tick"
                      label="تایید"
                      @click="acceptPageBuilderConfig" />
        <q-fab-action external-label
                      label-position="right"
                      color="negative"
                      icon="isax:forbidden"
                      label="انصراف"
                      @click="togglePageBuilderEditable" />
      </template>
    </q-fab>
  </q-page-sticky>
  <q-dialog v-model="seoDialog">
    <q-card class="seo-option-panel-in-floating-btn">
      <q-card-section>
        <div class="text-h6">SEO</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div dir="ltr">
          main:
        </div>
        <q-input v-model="seo.title"
                 label="title" />
        <q-input v-model="seo.description"
                 label="description"
                 type="textarea" />
        <q-input v-model="seo.robots"
                 label="robots" />
        <q-separator />
        <div dir="ltr">
          open graph:
        </div>
        <q-input v-model="seo.ogTitle"
                 label="open graph title" />
        <q-input v-model="seo.ogDescription"
                 label="open graph description"
                 type="textarea" />
        <q-input v-model="seo.ogUrl"
                 label="open graph url"
                 dir="ltr" />
        <q-input v-model="seo.ogImage"
                 label="open graph image"
                 dir="ltr" />
        <q-img class="og-image"
               :src="seo.ogImage" />
      </q-card-section>
      <q-card-section>
        <div class="vue-google-serp">
          <div class="preview">
            <h3>{{ truncateString(seo.title,titleLength)}}</h3>
            <cite>{{seo.ogUrl}}</cite>
            <p>{{ truncateString(seo.description, descriptionLengthMobile)}}</p>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="vue-google-serp-mobile">
          <div class="preview">
            <h3>{{ truncateString(seo.title,titleLength)}}</h3>
            <cite>{{seo.ogUrl}}</cite>
            <p>{{ truncateString(seo.description, descriptionLengthMobile)}}</p>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-close-popup
               label="save"
               color="primary"
               @click="updateSeo" />
        <q-btn v-close-popup
               flat
               label="close"
               color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="pageBuilderShowConfigDialog"
            class="pageBuilderShowConfigDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">تنظیمات صفحه</div>
      </q-card-section>
      <q-card-section class="pageBuilderShowConfigDialog-config-section">
        {{ currenSections }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-close-popup
               flat
               label="کپی کردن"
               color="primary"
               @click="copyPageBuilderConfigs" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="pageBuilderImportConfigDialog"
            class="pageBuilderImportConfigDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">وارد کردن تنظیمات صفحه</div>
      </q-card-section>
      <q-card-section class="pageBuilderImportConfigDialog-config-section">
        <q-input v-model="pageBuilderImportedConfigs"
                 type="textarea"
                 label="configs" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-close-popup
               flat
               label="وارد کردن تنظیمات"
               color="primary"
               @click="importPageBuilderConfigs" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { copyToClipboard } from 'quasar'
import { mixinPageBuilder } from 'src/mixin/Mixins.js'

export default {
  name: 'FloatingActionButton',
  mixins: [mixinPageBuilder],
  data () {
    return {
      pageBuilderImportedConfigs: null,
      titleLength: 60,
      descriptionLength: 160,
      descriptionLengthMobile: 80,
      seo: {
        title: null,
        description: null,
        robots: null,
        ogTitle: null,
        ogUrl: null,
        ogDescription: null,
        ogImage: null
      },
      seoDialog: false,
      pageBuilderShowConfigDialog: false,
      pageBuilderImportConfigDialog: false,
      pageBuilderConfigs: {},
      fabPos: [18, 18],
      pageOptionsFloatingActionButton: false
    }
  },
  computed: {
    canShowDynamicSettings () {
      return this.hasDynamicSetting || this.hasDynamicSettingWithParams
    },
    hasDynamicSetting () {
      return !!this.$route.meta?.hasDynamicSetting
    },
    hasDynamicSettingWithParams () {
      return !!this.$route.meta?.hasDynamicSettingWithParams
    }
  },
  created () {
    this.loadDefaultSeoData()
  },
  methods: {
    truncateString(string, length) {
      return string.length > length ? string.slice(0, length) + '...' : string
    },
    importPageBuilderConfigs () {
      this.$store.commit('PageBuilder/updateCurrentSections', JSON.parse(this.pageBuilderImportedConfigs))
    },
    updateSeo () {
      this.$store.commit('SEO/updateTitle', this.seo.title)
      this.$store.commit('SEO/updateDescription', this.seo.description)
      this.$store.commit('SEO/updateRobots', this.seo.robots)
      this.$store.commit('SEO/updateOgTitle', this.seo.ogTitle)
      this.$store.commit('SEO/updateOgDescription', this.seo.ogDescription)
      this.$store.commit('SEO/updateOgUrl', this.seo.ogUrl)
      this.$store.commit('SEO/updateOgImage', this.seo.ogImage)
      this.updateSetting()
    },
    updateSetting () {
      const params = JSON.stringify(this.$route.params)
      const routeName = this.$route.name
      const key = 'route_name:' + routeName + (this.hasDynamicSettingWithParams ? ('-params:' + params) : '')

      this.$store.dispatch('PageBuilder/editPageWidget', { key, sections: this.currenSections })
        .then(() => {
          // this.currenSections = sections
          this.$store.commit('PageBuilder/updatePageBuilderEditable', false)
        })

      // const sections = this.$store.getters['PageBuilder/currentSections'] ? this.$store.getters['PageBuilder/currentSections'] : []
      // const seo = {
      //   title: this.$store.getters['SEO/title'],
      //   description: this.$store.getters['SEO/description'],
      //   robots: this.$store.getters['SEO/robots'],
      //   ogTitle: this.$store.getters['SEO/ogTitle'],
      //   ogUrl: this.$store.getters['SEO/ogUrl'],
      //   ogDescription: this.$store.getters['SEO/ogDescription'],
      //   ogImage: this.$store.getters['SEO/ogImage']
      // }
      // const value = new PageSetting({
      //   value: { sections, seo, layoutConfig: {} }
      // }).getStringifyValue()
      // APIGateway.pageSetting.update({ key, value })
      //   .then(() => {
      //     this.currenSections = sections
      //     this.$store.commit('PageBuilder/updatePageBuilderEditable', false)
      //   })
    },
    loadDefaultSeoData () {
      this.seo.title = this.$store.getters['SEO/title']
      this.seo.description = this.$store.getters['SEO/description']
      this.seo.robots = this.$store.getters['SEO/robots']
      this.seo.ogTitle = this.$store.getters['SEO/ogTitle'] ? this.$store.getters['SEO/ogTitle'] : this.seo.title
      this.seo.ogUrl = this.$store.getters['SEO/ogUrl'] ? this.$store.getters['SEO/ogUrl'] : ''
      this.seo.ogDescription = this.$store.getters['SEO/ogDescription'] ? this.$store.getters['SEO/ogDescription'] : this.seo.description
      this.seo.ogImage = this.$store.getters['SEO/ogImage']
    },
    moveFab (ev) {
      // this.draggingFab = ev.isFirst !== true && ev.isFinal !== true
      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
    showPageBuilderShowConfigs () {
      this.pageBuilderShowConfigDialog = true
    },
    showPageBuilderImportConfigs () {
      this.pageBuilderImportConfigDialog = true
    },
    copyPageBuilderConfigs () {
      copyToClipboard(JSON.stringify(this.currenSections))
        .then(() => {
          this.$q.notify({
            message: 'کانفیگ کپی شد',
            type: 'positive'
          })
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در کپی کردن کانفیگ رخ داده اس.'
          })
        })
    },
    togglePageBuilderEditable () {
      const newStateOfPageBuilderEditable = !this.$store.getters['PageBuilder/pageBuilderEditable']
      this.$store.commit('PageBuilder/updatePageBuilderEditable', newStateOfPageBuilderEditable)
      if (newStateOfPageBuilderEditable) {
        setTimeout(() => {
          this.pageOptionsFloatingActionButton = true
        }, 700)
      }
    },
    acceptPageBuilderConfig () {
      this.updateSetting()
    },
    createPageBuilderConfig () {
      const params = JSON.stringify(this.$route.params)
      const routeName = this.$route.name
      const key = 'route_name:' + routeName + (this.hasDynamicSettingWithParams ? ('-params:' + params) : '')
      this.pageLoading = true
      this.$store.dispatch('PageBuilder/createPageWidget', { key, sections: this.currenSections })
        .then(() => {
          this.pageLoading = false
          this.$store.commit('PageBuilder/updatePageBuilderEditable', false)
        })
        .catch(() => {
          this.pageLoading = false
          this.$store.commit('PageBuilder/updatePageBuilderEditable', false)
        })
    },
    showPageBuilderConfig () {

    },
    openSeoDialog () {
      this.seoDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.floating-action-btn-page-builder {
  z-index: 2001;
}

.og-image {
  width: 200px;
  margin: 0 auto;
}
.vue-google-serp {
  direction: rtl;
  font-family: arial, sans-serif !important;
  margin: 0;
  padding: 0;
  .preview {
    padding: 20px;
    max-width: 600px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  h3 {
    font-family: arial, sans-serif !important;
    margin: 0;
    color: rgb(26, 13, 171);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.2;
  }
  p {
    font-family: arial, sans-serif !important;
    margin: 0;
    color: rgb(84, 84, 84);
    font-size: 13px;
    line-height: 1.4;
  }
  cite {
    font-family: arial, sans-serif !important;
    margin: 0;
    font-style: normal;
    height: 18px;
    color: rgb(0, 102, 33);
    font-size: 14px;
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.vue-google-serp-mobile {
  direction: rtl;
  font-family: arial, sans-serif !important;
  margin: 0;
  padding: 0;
  .preview {
    padding: 20px;
    max-width: 350px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  h3 {
    font-family: arial, sans-serif !important;
    margin: 0 0 5px 0;
    color: rgb(26, 13, 171);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.2;
  }
  p {
    font-family: arial, sans-serif !important;
    margin: 0;
    color: rgb(84, 84, 84);
    font-size: 12px;
    line-height: 1.4;
  }
  cite {
    font-family: arial, sans-serif !important;
    margin: 0;
    font-style: normal;
    height: 18px;
    color: rgb(0, 102, 33);
    font-size: 14px;
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

<style lang="scss">
.seo-option-panel-in-floating-btn {
  &.q-card {
    width: 700px;
    max-width: 80vw;
  }
}
.pageBuilderShowConfigDialog {
  .pageBuilderShowConfigDialog-config-section {
    overflow: auto;
    max-height: 50vh;
  }
}
</style>
