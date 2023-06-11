<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div
          class="row">
          <div class="col-md-12">
            <q-editor v-model="localOptions.text"
                      min-height="10rem"
                      :toolbar="[
                        [
                          {
                            label: $q.lang.editor.align,
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            list: 'only-icons',
                          },
                        ],
                        ['bold', 'italic', 'strike', 'underline'],
                        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                        ['viewsource']
                      ]">
            </q-editor>
          </div>
          <div class="col-md-3">
            <q-select v-model="responsive"
                      :options="responsiveOpts"
                      label="responsive" />
          </div>
          <div class="col-md-3 offset-1">
            <q-select v-model="localOptions[responsive].fontStyle"
                      :options="fontStyle"
                      label="fontStyle" />
          </div>
          <div class="col-md-3 offset-1">
            <q-input v-model="localOptions.fontFamily"
                     label="font family" />
          </div>
          <div class="col-md-3">
            <q-input v-model="localOptions[responsive].fontSize"
                     label="font size" />
          </div>
          <div class="col-md-3 offset-1">
            <q-input v-model="localOptions[responsive].fontWeight"
                     label="font weight" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import mixinOptionPanel from 'quasar-ui-q-page-builder/src/mixin/OptionPanel.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
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
      fontStyle: ['inherit', 'normal', 'italic'],
      responsiveOpts: ['xs', 'sm', 'md', 'lg', 'xl'],
      responsive: 'xs',
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
  mounted() {
    const windowWidth = window.innerWidth
    if (windowWidth > 1920) {
      this.responsive = 'xl'
    } else if (windowWidth > 1440 < 1920) {
      this.responsive = 'lg'
    } else if (windowWidth > 1024 < 1440) {
      this.responsive = 'md'
    } else if (windowWidth > 600 < 1024) {
      this.responsive = 'sm'
    } else if (windowWidth < 600) {
      this.responsive = 'xs'
    }
  }
})
</script>
