<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <q-card class="custom-card">
          <q-card-section>
            <q-expansion-item v-for="(item, index) in options.expansionList"
                              :key="index"
                              expand-separator>
              <template v-slot:header>
                <q-btn color="negative"
                       icon="close"
                       size="14px"
                       class="q-mr-sm"
                       @click="removeItem(index)" />
                <q-input v-model="item.label"
                         class="full-width"
                         label="label" />
              </template>
              <div class="caption q-my-md q-mx-xl">
                <q-input v-model="item.caption"
                         label="caption" />
              </div>
              <div class="text">
                <editor v-model:value="item.text" />
              </div>
            </q-expansion-item>
          </q-card-section>

          <div class="row q-gutter-xs justify-center">
            <q-btn color="positive"
                   class="full-width"
                   label="add Item"
                   @click="addItem" />
          </div>
        </q-card>
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
  data () {
    return {
      expansionList: []
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
    addItem () {
      this.localOptions.expansionList.push([])
    },
    removeItem (itemIndex) {
      this.localOptions.expansionList.splice(itemIndex, 1)
    }
  }
})
</script>
