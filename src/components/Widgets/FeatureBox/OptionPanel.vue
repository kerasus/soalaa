<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-col-gutter-md">
          <div class="col-md-6">
            <div class="row no-wrap q-mb-md">
              <q-input v-model="localOptions.data.head"
                       label="title" />
            </div>
            <div class="row no-wrap q-mb-md">
              <q-input v-model="localOptions.data.button.text"
                       label="button title" />
            </div>
            <div class="row no-wrap q-mb-md">
              <q-input v-model="localOptions.data.button.link"
                       label="button color" />
            </div>
            <div class="row no-wrap q-mb-md">
              <q-input v-model="localOptions.data.button.url"
                       label="button link" />
            </div>
          </div>
          <div class="col-md-6 q-mt-sm text-center">
            title color
            <q-color v-model="localOptions.titleColor"
                     label="titleColor" />
          </div>
          <div class="col-md-12 q-pa-md q-gutter-sm">
            <q-editor v-model="localOptions.data.editor"
                      min-height="10rem"
                      :toolbar="[
                        [
                          {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            list: 'only-icons',
                            options: ['left', 'center', 'right', 'justify']
                          },
                          {
                            label: $q.lang.editor.fontSize,
                            icon: $q.iconSet.editor.fontSize,
                            fixedLabel: true,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                              'size-1',
                              'size-2',
                              'size-3',
                              'size-4',
                              'size-5',
                              'size-6',
                              'size-7'
                            ]
                          }
                        ],
                        ['bold', 'italic', 'strike', 'underline'],
                        ['quote', 'unordered', 'ordered'],
                        ['viewsource']
                      ]">
            </q-editor>
          </div>
          <div class="col-md-12">
            <q-input v-model="localOptions.data.image.link"
                     dir="rtl"
                     label="image" />
            <lazy-img :src="localOptions.data.image.link" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent, getCurrentInstance } from 'vue'
import mixinOptionPanel from 'quasar-ui-q-page-builder/src/mixin/OptionPanel.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import lazyImg from 'components/lazyImg'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, lazyImg },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      foreColor: '#000000',
      proxy: getCurrentInstance(),
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  methods: {
    color(cmd, name) {
      // this.proxy.token.hide()
      this.proxy.targetRef.runCmd(cmd, name)
      this.proxy.targetRef.focus()
    }
  }
})
</script>
