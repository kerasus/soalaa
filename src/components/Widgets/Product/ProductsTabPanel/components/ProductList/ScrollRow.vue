<template>
  <div class="product-content-wrapper">
    <div v-if="loading"
         class="product-content row"
         :class="options.className"
         :style="options.style">
      <product-row-skeleton :skeletons="4" />
    </div>
    <div v-else
         class="product-content row"
         :class="options.className"
         :style="options.style">
      <div v-for="(product, index) in data"
           :key="index"
           class="product-item col-xl-2 col-lg-2 col-md-3 col-sm-5 col-xs-9">
        <product-item :options="{product: product}" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '../../../ProductItem/ProductItem.vue'
import ProductRowSkeleton from '../ProductRowSkeleton.vue'

export default {
  name: 'ScrollRow',
  components: {
    ProductItem,
    ProductRowSkeleton
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
    options: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.product-content-wrapper {
  width: 100%;

  .product-content {
    justify-content: flex-start;
    padding: 40px 0;
    width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap !important;
    max-width: 100%;

    @media screen and (max-width: 600px){
      padding: 0;
    }

    .product-item {
      padding: 5px;
    }
  }
}
</style>
