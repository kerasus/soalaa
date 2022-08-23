<template>
  <div class="cart-template row">
    <div class="cart-item col-md-8 col-12">
      <cart-view />
    </div>
    <div class="side-invoice col-md-4 col-12">
      <cart-invoice />
    </div>

    <div class="empty-cart col-12">
      <CartEmpty />
    </div>

  </div>
</template>

<script>
import cartInvoice from 'components/Widgets/Cart/CartInvoice/CartInvoice'
import cartView from 'components/Widgets/Cart/CartView/CartView'
import cartEmpty from 'components/Widgets/Cart/CartEmpty/CartEmpty'
export default {
  name: 'Cart',
  components: {
    cartView,
    cartEmpty,
    cartInvoice
  }
}
</script>

<style scoped>

</style>
