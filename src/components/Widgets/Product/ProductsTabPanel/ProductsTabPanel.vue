<template>
  <div class="product-panels-row"
       :style="localOptions.style"
       :class="localOptions.className">
    <product-panel :loading="loading"
                   :data="products"
                   :options="localOptions" />
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { ProductList } from 'src/models/Product.js'
import ProductPanel from './components/ProductPanel.vue'

export default {
  name: 'ProductsTabPanel',
  components: {
    ProductPanel
  },
  mixins: [mixinWidget],
  data() {
    return {
      products: [],
      productFlatList: [],
      loading: false,
      defaultOptions: {
        className: '',
        style: {},
        data: []
      }
    }
  },
  created() {
    this.prefetchServerDataPromise()
      .then((response) => {
        this.prefetchServerDataPromiseThen(new ProductList(response.data.data))
      })
      .catch(() => {
        this.prefetchServerDataPromiseCatch()
      })
  },
  methods: {
    extractProducts(group) {
      for (let index = 0; index < group.length; index++) {
        const groupItem = group[index]
        if (groupItem.type === 'GroupList') {
          this.extractProducts(groupItem.data)
        } else {
          this.productFlatList.push(...groupItem.data)
        }
      }
    },
    replaceProducts(optionList, productList) {
      for (let groupIndex = 0; groupIndex < optionList.length; groupIndex++) {
        const group = optionList[groupIndex]
        if (group.type === 'GroupList') {
          this.replaceProducts(optionList[groupIndex].data, productList)
        } else if (group.type === 'ProductList') {
          for (let productIndex = 0; productIndex < optionList[groupIndex].data.length; productIndex++) {
            const productItem = productList.find(product => product.id === optionList[groupIndex].data[productIndex])
            if (productItem) {
              optionList[groupIndex].data[productIndex] = productItem
            }
          }
        }
      }
    },
    getProductsPromise() {
      this.extractProducts(this.localOptions.data)
      // return this.$apiGateway.product.getProductList(this.productFlatList)
      return this.$axios.get(API_ADDRESS.product.bulk(this.productFlatList))
    },
    prefetchServerDataPromise () {
      this.loading = true
      return this.getProductsPromise()
    },
    prefetchServerDataPromiseThen (productList) {
      const products = this.localOptions.data
      this.replaceProducts(products, productList.list)
      this.products = products
      this.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.product-panels-row {
  width: 100%;
}
</style>
