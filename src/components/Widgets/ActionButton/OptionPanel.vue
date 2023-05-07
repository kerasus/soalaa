<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <div class="row q-gutter-sm">
          <div class="input-container col-md-3">
            <div class="outsideLabel">label</div>
            <q-input v-model="localOptions.label"
                     label="label" />
          </div>
          <div class="input-container col-md-3">
            <div class="outsideLabel">icon name</div>
            <q-input v-model="localOptions.icon"
                     label="icon name" />
          </div>
          <div class="input-container col-md-3">
            <div class="outsideLabel">color</div>
            <q-input v-model="localOptions.color"
                     label="color" />
          </div>
          <div class="input-container">
            <div class="outsideLabel">flat</div>
            <q-checkbox v-model="localOptions.flat"
                        left-label />
          </div>
        </div>
        <div class="input-container q-my-md">
          <div class="outsideLabel">image source</div>
          <q-input v-model="localOptions.imageSource"
                   label="image source" />
        </div>
        <div class="row q-col-gutter-sm">
          <div class="input-container col-md-2">
            <div class="outsideLabel">action</div>
            <q-select v-model="localOptions.action"
                      :options="actionOptions" />
          </div>
          <div v-if="localOptions.action === 'scroll'"
               class="input-container col-md-10">
            <div class="outsideLabel">scrollTo</div>
            <q-input v-model="localOptions.scrollTo"
                     label="scrollTo" />
          </div>
          <div v-if="localOptions.action === 'link'"
               class="input-container col-md-10">
            <div class="outsideLabel">route</div>
            <q-input v-model="localOptions.route"
                     label="route" />
          </div>
          <div v-if="localOptions.action === 'event'"
               class="input-container col-md-5">
            <div class="outsideLabel">eventName</div>
            <q-input v-model="localOptions.eventName"
                     label="eventName" />
          </div>
          <div v-if="localOptions.action === 'event'"
               class="input-container col-md-5">
            <div class="outsideLabel">eventArgs</div>
            <q-input v-model="localOptions.eventArgs"
                     label="eventArgs" />
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
  data () {
    return {
      actionOptions: ['scroll', 'link', 'event'],
      defaultOptions: {
        color: null,
        icon: null,
        label: null,
        flat: false,
        callBack: null,
        imageSource: null,
        className: null,
        fixed: false,
        fixedPosition: null,
        eventArgs: null,
        action: null,
        scrollTo: null,
        route: null,
        eventName: null
      }
    }
  }
})
</script>
