<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <q-list>
          <q-expansion-item expand-separator
                            icon="shopping_bag"
                            label="صورتحساب"
                            caption="Invoice">
            <cart-invoice-option-panel />
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="sell"
                            label="ارقام سبد خرید"
                            caption="View">
            <cart-view-option-panel />
          </q-expansion-item>
        </q-list>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import CartViewOptionPanel from 'src/components/Widgets/Cart/CartView/OptionPanel.vue'
import CartInvoiceOptionPanel from 'src/components/Widgets/Cart/CartInvoice/OptionPanel.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    CartInvoiceOptionPanel,
    CartViewOptionPanel
  },
  mixins: [mixinOptionPanel]
})
</script>
