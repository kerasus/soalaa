<template>
  <div v-if="products.list && products.list.length > 0"
       class="product-gift-widgets row"
       :style="options.style"
       :class="options.className">
    <div class="gift-container">
      <p class="title-style">
        هدایا
      </p>
      <div class="gift-text">
        <span>این محصول شامل هدایای زیر میباشد: </span>
        <div class="flex q-py-lg">
          <div v-for="(product, index) in products.list"
               :key="index"
               class="block-list-widget">
            <div class="img-box q-mx-lg">
              <router-link :to="{
                name: 'Public.Product.Show',
                params: { id: product.id ? product.id : -1 }
              }">
                <product-item :options="{product, canAddToCart: false}" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductList } from 'src/models/Product.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import ProductItem from 'components/Widgets/Product/ProductItem/ProductItem.vue'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ProductGifts',
  components: { ProductItem },
  mixins: [mixinPrefetchServerData],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      products: new ProductList()
    }
  },
  computed: {
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
      if (this.product) {
        return this.product.id
      }

      return null
    }
  },
  methods: {
    prefetchServerDataPromise () {
      this.products.loading = true
      return this.getPriductCifts()
    },
    prefetchServerDataPromiseThen (response) {
      this.products = new ProductList(response.data.data)
      this.products.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.products.loading = false
    },
    getPriductCifts() {
      return this.$axios.get(API_ADDRESS.product.gifts(this.productId))
      // return APIGateway.product.gifts(this.productId)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-gift-widgets {
  display: flex;
  justify-content: center;

  .gift-container {
    width: 1140px;
  }
}

.gift-text {
  margin-top: 20px;
  padding: 10px 20px;
}

.title-style {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;

  &::before {
    content: ".";
    color: #BAD9FB;
    font-size: 50px;
    font-weight: bold;
    line-height: 10px;
  }
}

</style>
