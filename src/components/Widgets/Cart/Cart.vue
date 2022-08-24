<template>
  <div class="cart-template row">
    <div
      v-if="count !== 0"
      class="cart-item col-md-8 col-12"
    >
      <cart-view />
    </div>

    <div
      v-if="count"
      class="side-invoice col-md-4 col-12"
    >
      <cart-invoice :data="checkOutReviewResponse" />
    </div>

    <div
      v-if="count === 0"
      class="empty-cart col-12"
    >
      <cart-empty />
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
  },

  data() {
    return {
      checkOutReviewResponse: {}
    }
  },

  created () {
    this.cartReview()
  },

  computed: {
    count() {
      return this.$store.getters['Cart/cart'].count
    }
  },

  methods: {
    add () {
      this.$store.dispatch('Cart/addToCart', { id: 748 }).then(() => {
        this.cartReview()
      })
    },
    cartReview() {
      this.$store.dispatch('loading/overlayLoading', true)
      this.$store.dispatch('Cart/reviewCart')
        .then((response) => {
          this.checkOutReviewResponse = response.data.data
          this.$store.dispatch('loading/overlayLoading', false)
        })
    }
  }
}
</script>

<style scoped>

</style>
