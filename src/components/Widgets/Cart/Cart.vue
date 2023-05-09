<template>
  <!--  <div>-->
  <!--    <q-btn-->
  <!--      label="add to cart"-->
  <!--      @click="add"-->
  <!--    />-->
  <!--  </div>-->
  <div
    v-if="cart.count > 0"
    class="cart-count">
    سبدخرید شما ({{cart.count}} محصول)
  </div>
  <div
    v-else
    class="cart-count"
  >
    سبدخرید شما ({{cart.count}})
  </div>
  <div class="cart-template row">
    <div
      v-if="cart.count !== 0"
      class="cart-item col-md-8 col-12"
    >
      <cart-view :cart="cart"
                 @cartReview="cartReview" />
    </div>

    <div
      v-if="cart.count"
      class="side-invoice col-md-4 col-12"
    >
      <cart-invoice :cart="cart" />
    </div>

    <div
      v-if="cart.count === 0"
      class="empty-cart col-12"
    >
      <cart-empty />
    </div>

  </div>
</template>

<script>
// import API_ADDRESS from 'src/api/Addresses'
import cartInvoice from 'components/Widgets/Cart/CartInvoice/CartInvoice'
import cartView from 'components/Widgets/Cart/CartView/CartView'
import cartEmpty from 'components/Widgets/Cart/CartEmpty/CartEmpty'
import { Cart } from 'src/models/Cart'

export default {
  name: 'Cart',
  components: {
    cartView,
    cartEmpty,
    cartInvoice
  },

  data() {
    return {
      cart: new Cart()
    }
  },

  created () {
    this.cartReview()
  },

  computed: {
    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    }
  },

  methods: {
    add () {
      this.$store.dispatch('Cart/addToCart', {
        product: { id: 901 },
        products: [903]
      })
        .then(() => {
          this.cartReview()
        })
    },
    cartReview() {
      this.$store.dispatch('loading/overlayLoading', true)
      this.$store.dispatch('Cart/reviewCart')
        .then((response) => {
          const invoice = response.data.data

          const cart = new Cart(invoice)

          if (invoice.count > 0) {
            invoice.items[0].order_product.forEach((order) => {
              cart.items.list.push(order)
            })
          }
          this.cart = cart
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
