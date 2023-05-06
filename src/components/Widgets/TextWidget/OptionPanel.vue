<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-mt-sm">
          <div class="col-md-12">
            <editor v-model:value="localOptions.text" />
          </div>
          <div class="col-md-3 q-ma-sm">
            <q-select v-model="responsive"
                      :options="responsiveOpts"
                      label="responsive" />
          </div>
          <div class="col-md-3 offset-1 q-ma-sm">
            <q-select v-model="localOptions[responsive].fontStyle"
                      :options="fontStyle"
                      label="fontStyle" />
          </div>
          <div class="col-md-3 offset-1 q-ma-sm">
            <q-input v-model="localOptions.fontFamily"
                     label="font family" />
          </div>
          <div class="col-md-3 q-ma-sm">
            <q-input v-model="localOptions[responsive].fontSize"
                     label="font size" />
          </div>
          <div class="col-md-3 offset-1 q-ma-sm">
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
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import Editor from 'components/Utils/Editor.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { Editor, OptionPanelTabs },
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
      foreColor: '#000000',
      token: null,
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
  },
  methods: {
    color(cmd, name) {
      const edit = this.$refs.editor
      this.$refs.token.hide()
      edit.caret.restore()
      edit.runCmd(cmd, name)
      edit.focus()
    }
  }
})
</script>
