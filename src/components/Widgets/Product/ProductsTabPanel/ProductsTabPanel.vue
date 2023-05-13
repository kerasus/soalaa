<template>
  <div class="product-panels-row"
       :style="localOptions.style"
       :class="localOptions.className">
    <product-panel :loading="loading"
                   :data="localOptions.data"
                   :options="localOptions" />
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses.js'
import { ProductList } from 'src/models/Product.js'
import ProductPanel from './components/ProductPanel.vue'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'ProductsTabPanel',
  components: {
    ProductPanel
  },
  mixins: [mixinPrefetchServerData, mixinWidget],
  data() {
    return {
      products: [],
      loading: false,
      defaultOptions: {
        className: '',
        style: {},
        data: []
      }
    }
  },
  computed: {
    productFlatList() {
      return this.extractProducts(this.localOptions.data)
    },
    productIdList() {
      return this.productFlatList.map(product => product.id)
    },
    productIdListLength() {
      return this.productIdList.length
    }
  },
  watch: {
    productIdListLength(vale) {
      this.loading = true
      this.getProductsPromise()
        .then(productList => {
          this.replaceProducts(this.localOptions.data, productList.list)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  methods: {
    extractProducts(group) {
      const products = []
      for (let index = 0; index < group.length; index++) {
        const groupItem = group[index]
        if (groupItem.type === 'GroupList') {
          const productStack = this.extractProducts(groupItem.data)
          products.push(...productStack)
        } else {
          products.push(...groupItem.data)
        }
      }
      return products
    },
    replaceProducts(optionList, productList) {
      for (let groupIndex = 0; groupIndex < optionList.length; groupIndex++) {
        const group = optionList[groupIndex]
        if (group.type === 'GroupList') {
          this.replaceProducts(optionList[groupIndex].data, productList)
        } else if (group.type === 'ProductList') {
          for (let productIndex = 0; productIndex < optionList[groupIndex].data.length; productIndex++) {
            const productItem = productList.find(product => product.id === optionList[groupIndex].data[productIndex].id)
            if (productItem) {
              optionList[groupIndex].data[productIndex] = productItem
            }
          }
        }
      }
    },
    getProductsPromise() {
      // const data = {
      //   productIds: this.productIdList,
      //   params: {
      //     length: this.productIdListLength
      //   }
      // }
      return this.$axios.get(API_ADDRESS.product.bulk(this.productIdList), {
        params: {
          length: this.productIdListLength
        }
      })
      // return this.$apiGateway.product.getProductList(data)
    },
    prefetchServerDataPromise () {
      this.loading = true
      return this.getProductsPromise()
    },
    prefetchServerDataPromiseThen (response) {
      const productList = new ProductList(response.data.data)
      this.replaceProducts(this.localOptions.data, productList.list)
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
