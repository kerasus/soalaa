<template>
  <option-panel-tabs v-model:options="localOptions">
    <!--    <template #main-tab>-->
    <!--      <div class="option-panel-container">-->
    <!--        <div class="row">-->
    <!--          <div class="col-md-6">-->
    <!--            <q-input v-model="localOptions.productId"-->
    <!--                     label="productId"-->
    <!--            />-->
    <!--          </div>-->
    <!--          <div class="col-md-6">-->
    <!--            <q-input v-model="localOptions.urlParam"-->
    <!--                     label="urlParam"-->
    <!--            />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </template>-->
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
  data() {
    return {
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  }
})
</script>
