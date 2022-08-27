<template>
  <!--  <div>-->
  <!--    <q-btn-->
  <!--      label="add to cart"-->
  <!--      @click="add"-->
  <!--    />-->
  <!--  </div>-->
  <div
    v-if="count > 0"
    class="cart-count">
    سبدخرید شما ({{count}} محصول)
  </div>
  <div
    v-else
    class="cart-count"
  >
    سبدخرید شما ({{count}})
  </div>
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
    // add () {
    //   this.$store.dispatch('Cart/addToCart', { id: 747 }).then(() => {
    //     this.cartReview()
    //   })
    // },
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

<style lang="scss" scoped>
.cart-count {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #6D708B;
  margin: 24px 0 22px 0;

  @media screen and (max-width: 1439px) {
    letter-spacing: -0.03em;
    margin: 20px 0;
  }
}
</style>
