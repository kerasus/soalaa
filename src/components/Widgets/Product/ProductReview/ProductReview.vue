<template>
  <div class="show-product-review"
       :style="options.style"
       :class="options.className">
    <div class="product-description">
      <div class="description-container">
        <p class="title-style">
          بررسی محصول
        </p>
        <q-skeleton v-if="product.loading"
                    class="description-text custom-card"
                    min-width="100%"
                    type="text" />

        <q-card v-else-if="description"
                class="description-text custom-card">
          <span v-html="description" />
        </q-card>
        <q-card v-else
                class="description-text custom-card">
          <span>
            توضیحی برای این محصول وجود ندارد
          </span>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ProductReview',
  mixins: [mixinWidget, mixinPrefetchServerData],
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
      isFavored: false,
      product: new Product()
    }
  },
  computed: {
    // product: {
    //   get () {
    //     return new Product(this.$store.getters['Widgets/data']('ProductReview'))
    //   },
    //   set (newData) {
    //     this.$store.dispatch('Widgets/updateData', { name: 'ProductReview', data: newData })
    //   }
    // },
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
    },
    description () {
      if (this.product.description.long) {
        return this.product.description.long
      } else if (this.product.description.short) {
        return this.product.description.short
      } else if (this.product.description.slogan) {
        return this.product.description.slogan
      }
      return null
    }
  },
  methods: {
    prefetchServerDataPromise() {
      this.product.loading = true
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (response) {
      this.product = new Product(response.data.data)
      this.isFavored = this.product.is_favored_2
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },
    getProduct() {
      this.product.loading = true
      return this.$axios.get(API_ADDRESS.product.show.base + '/' + this.productId)
      // return APIGateway.product.show(this.productId)
    }
  }
}
</script>

<style>
h2 {
  font-size: 28px;
}
</style>
<style lang="scss" scoped>
.show-product-review {
  margin-bottom: 10px;

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

.product-description {
  margin-bottom: 80px;

  .description-container {
    //width: 1140px;

    .description-text {
      margin-top: 20px;
      padding: 10px 20px;

      &:deep(h2) {
        font-size: 25px;
      }
    }
  }
}

@media screen and (max-width: 1199px) {
  .product-description {
    .description-container {

      .description-text {

      }
    }

  }
}

@media screen and (max-width: 991px) {
  .product-description {
    .description-container {
    }
  }
}

@media screen and (max-width: 767px) {
  .title-style {
    width: 100%;
  }
  .product-description {
    width: 100%;

    .description-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .description-text {
      }
    }

  }
}

@media screen and (max-width: 575px) {
  .product-description {
    .description-container {

      .description-text {
        width: 100%;
      }
    }

  }
}
</style>
