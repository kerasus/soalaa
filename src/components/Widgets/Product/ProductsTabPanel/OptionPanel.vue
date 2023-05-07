<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-12">
            <q-input v-model="localOptions.style.padding"
                     label="padding" />
          </div>
        </div>
        <div v-for="(item, index) in localOptions.data"
             :key="index">
          <q-card class="custom-card">
            <q-card-section>
              <q-expansion-item expand-separator>
                <template v-slot:header>
                  <q-btn color="negative"
                         icon="close"
                         class="q-mr-sm"
                         @click="removeTabPanel(index)" />
                  <q-input v-model="item.type"
                           autogrow
                           class="full-width"
                           label="label" />
                </template>
                <recursive-component :options="item" />
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-gutter-xs justify-center">
        <q-btn color="positive"
               class="full-width"
               label="اضافه کردن تب پنل جدید"
               @click="addTabPanel" />
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import recursiveComponent from './recursiveComponent.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, recursiveComponent },
  mixins: [mixinOptionPanel],
  methods: {
    addTabPanel() {

    }
  }
})
</script>
<style lang="scss" scoped>
:deep(.q-card.custom-card) {
  :not([class^=col]) {
    box-shadow: none;
  }
  .custom-card {
    //width: 150px;
  }
}
</style>
