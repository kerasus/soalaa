<template>
  <q-card v-if="product.price"
          class="product-price justify-center custom-card"
          :class="options.className"
          :style="options.style">

    <div v-if="options.discount && discountInPercent"
         class="discount-percent q-px-md">
      <div class="percent">{{ '%' + discountInPercent }}</div>
      <div class="discount-title">تخفیف</div>
    </div>

    <div class="price">
      <div v-if="options.basePrice && product.has_instalment_option && product.price.toman('base', null)"
           class="product-base-price">
        {{ product.price.toman('base', null) }}
      </div>

      <div v-if="product.price.toman('final', null) && options.finalPrice"
           class="product-final-price">
        {{ product.price.toman('final', null) }}
        <div v-if="product.price.toman('discount') !== 0"
             class="main-price">{{ product.price['base'] }}</div>
      </div>

      <div class="product-price-title"> تومان</div>
    </div>

    <div v-if="options.addToCart"
         class="action">
      <q-btn v-if="product.has_instalment_option"
             unelevated
             class="purchase-button pay-later"
             label="خرید اقساطی"
             text-color="white"
             icon="https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-add-square.png" />
      <q-btn unelevated
             class="purchase-button"
             label="خرید نقدی"
             text-color="white"
             icon="img:https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-add-square.png"
             @click="addToCart" />
    </div>
  </q-card>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ProductPrice',
  mixins: [mixinPrefetchServerData],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      product: new Product()
    }
  },
  computed: {
    discountInPercent () {
      if (this.product?.price?.discountInPercent && typeof this.product.price.discountInPercent === 'function') {
        return this.product.price.discountInPercent()
      }

      return 0
    },
    productId () {
      if (typeof this.options.productId !== 'undefined' && this.options.productId !== null) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.product.id
    }
  },
  methods: {
    prefetchServerDataPromise () {
      this.product.loading = true
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (response) {
      this.product = new Product(response.data.data)
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },
    getProduct() {
      return this.$axios.get(API_ADDRESS.product.show.base + '/' + this.productId)
      // return APIGateway.product.show(this.productId)
    },
    addToCart() {
      this.$store.dispatch('Cart/addToCart', { product_id: this.product.id }).then(() => {
        this.$router.push({ name: 'Public.Checkout.Review' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding-right: 20px;
  margin: 0 30px 20px;
  @media only screen and (max-width: 1439px) {
  }
  @media only screen and (max-width: 1023px) {
    width: 100%;
    margin: 0;
    padding-right: 30px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }

  .discount-percent {
    //width: 120px;
    height: 70px;
    background-color: #E05555;
    color: #ffffff;
    border-radius: 20px 0 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 600px) {
      flex-direction: column;
      padding: 5px;
    }

  .percent {
    margin-right: 5px;
  }
}

.price {
  display: flex;
  align-items: center;
  margin: 0 20px;
  @media only screen and (max-width: 1023px) {
    margin: 0 10px;
  }
  @media only screen and (max-width: 1023px) {
    //flex-direction: column;
    padding-left: 30px;
  }

  .product-base-price {
    text-decoration: line-through;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #E05555;
    margin-right: 10px;
  }

  .product-final-price {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 31px;
    letter-spacing: -0.05em;
    margin-left: 5px;
    margin-right: 10px;

    .main-price {
      text-decoration: line-through;
      /* margin-left: 12px; */
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #656f7b;

      opacity: 0.4;
    }
  }

  .product-price-title {
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 17px;
  }
}

.purchase-button {
  display: flex;
  width: 117px;
  height: 40px;
  background-color: #4CAF50;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

&.pay-later {
   background-color: #75B7FF;
 }
}

}
</style>
