<template>
  <div v-if="localItem.options.layout === 'ProductShelf'">
    <product-shelf-option-panel :data="localItem.data"
                                :options="localItem.options" />
  </div>
  <div v-else>
    <product-tab-option-panel :data="localItem.data"
                              :options="localItem.options" />
  </div>
</template>

<script>
import productShelfOptionPanel from 'components/Widgets/Product/ProductsTabPanel/GroupListOptionPanel/ProductShelfOptionPanel.vue'
import ProductTabOptionPanel from 'components/Widgets/Product/ProductsTabPanel/GroupListOptionPanel/ProductTabOptionPanel.vue'

export default {
  name: 'groupList',
  components: {
    productShelfOptionPanel,
    ProductTabOptionPanel
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    localItem: {
      get() {
        return this.item
      },
      set(newVal) {
        this.$emit('update:item', newVal)
      }
    }
  }
}
</script>

<style scoped>

</style>
