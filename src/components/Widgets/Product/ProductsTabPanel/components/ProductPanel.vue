<template>
  <div v-for="(item, index) in data"
       :key="index"
       :style="options.style"
       :class="options.className"
       class="product-panel-wrapper">
    <component :is="item.type"
               :loading="loading"
               :data="item.data"
               :options="item.options" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'ProductsPanel',
  components: {
    GroupList: defineAsyncComponent(() =>
      import('./GroupList/GroupList.vue')
    ),
    ProductList: defineAsyncComponent(() =>
      import('./ProductList/ProductList.vue')
    )
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    isProduct(item) {
      return item.type === 'ProductList'
    }
  }
}
</script>

<style lang="scss" scoped>
.product-panel-wrapper {
  width: 100%;
}
</style>
