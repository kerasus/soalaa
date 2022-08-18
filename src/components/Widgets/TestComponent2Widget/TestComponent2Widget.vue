<template>
  <div class="row">
    <div class="col-md-8 col-12">
      <h1>hi</h1>
    </div>
    <div class="col-md-4 col-12">
      <cart-invoice/>
    </div>
  </div>
</template>

<script>
import CartInvoice from 'src/components/Widgets/CartInvoice/CartInvoice.vue'
export default {
  name: 'Test-component-2widget',
  components: { CartInvoice }
}
</script>

<style scoped>
</style>
