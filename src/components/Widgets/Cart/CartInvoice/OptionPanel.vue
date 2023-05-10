<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-7">
            <q-input v-model="localOptions.totalPrice" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasTotalPrice"
                        left-label
                        :label="localOptions.totalPrice" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.useWallet" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasUseWallet"
                        left-label
                        label="استفاده از کیف پول" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.purchaseProfit" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasPurchaseProfit"
                        left-label
                        label="سود شما از خرید" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.discountPercent" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasDiscountPercent"
                        left-label
                        label="کد تخفیف" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.giftcard" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasGiftcard"
                        left-label
                        label="کارت هدیه" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.finalPrice" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasFinalPrice"
                        left-label
                        label="مبلغ نهایی" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.paymentMethod" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasPaymentMethod"
                        left-label
                        label="درگاه پرداخت" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.commentLabel" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasComment"
                        left-label
                        label="توضیحات" />
          </div>
          <div class="col-md-7">
            <q-input v-model="localOptions.paymentBtn" />
          </div>
          <div class="col-md-4 offset-1 text-right">
            <q-checkbox v-model="localOptions.hasPaymentBtn"
                        left-label
                        label="پرداخت و ثبت نهایی" />
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
  data() {
    return {
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {},
        totalPrice: 'جمع سبد خرید',
        hasTotalPrice: true,
        useWallet: 'استفاده از کیف پول',
        hasUseWallet: true,
        purchaseProfit: 'سود شما از خرید',
        hasPurchaseProfit: true,
        discountPercent: 'کد تخفیف',
        hasDiscountPercent: true,
        giftcard: 'کارت هدیه',
        hasGiftcard: true,
        finalPrice: 'مبلغ نهایی',
        hasFinalPrice: true,
        paymentMethod: 'درگاه پرداخت',
        hasPaymentMethod: true,
        commentLabel: 'اگر توضیحی درباره ی محصول دارید اسنجا بنویسید',
        hasComment: true,
        paymentBtn: 'پرداخت و ثبت نهایی',
        hasPaymentBtn: true
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
  }
})
</script>

<style scoped>

</style>
