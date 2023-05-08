<template>
  <div v-for="(item, index) in data"
       :key="index"
       class="product-panel">
    <div v-if="item.options.label "
         class="col-12 product-label"
         :style="item.options.labelStyle">
      {{ item.options.label }}
    </div>
    <div class="product-content row"
         :style="item.options.style">
      <product-panel :loading="loading"
                     :data="[item]"
                     :options="item.options" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'ProductShelf',
  components: {
    ProductPanel: defineAsyncComponent(() =>
      import('../ProductPanel.vue')
    )
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'scroll'
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    isProduct(item) {
      return item.type === 'product'
    }
  }
}
</script>

<style lang="scss" scoped>
.product-panel {
  .product-label {
    font-size: 18px;
    line-height: 31px;
    font-weight: 700;
    padding: 15px;
  }
  .product-content {
    justify-content: space-between;
    padding: 40px 0;
    width: 100%;

    @media screen and (max-width: 600px){
      padding: 0;
    }
  }
}
</style>
