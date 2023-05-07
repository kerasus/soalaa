<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-4">
            <q-checkbox v-model="localOptions.basePrice"
                        left-label
                        label="قیمت اصلی" />
          </div>
          <div class="col-md-4">
            <q-checkbox v-model="localOptions.discount"
                        left-label
                        label="تخفیف" />
          </div>
          <div class="col-md-4">
            <q-checkbox v-model="localOptions.finalPrice"
                        left-label
                        label="قیمت نهایی" />
          </div>
          <div class="col-md-5">
            <q-checkbox v-model="localOptions.addToCart"
                        left-label
                        label="افزودن به سبد خرید" />
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
