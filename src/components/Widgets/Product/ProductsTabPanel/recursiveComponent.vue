<template>
  <div class="option-panel-container">
    <component :is="value.type.concat('OptionPanel')"
               :item="value" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'component',
  components: {
    GroupListOptionPanel: defineAsyncComponent(() => import('./GroupListOptionPanel/GroupListOptionPanel.vue')),
    ProductListOptionPanel: defineAsyncComponent(() => import('./ProductListOptionPanel/ProductListOptionPanel.vue'))
  },
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    value: {
      get() {
        return this.options
      },
      set(value) {
        this.$emit('update:options', value)
      }
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      }
    }
  },
  methods: {
    removeProduct (id, tabIndex, isSpecial = false) {
      const keyName = isSpecial ? 'specialProducts' : 'products'
      if (!this.value.list[tabIndex][keyName]) {
        return
      }
      const productIndex = this.value.list[tabIndex][keyName]
        .findIndex((item) => item === id)
      this.value.list[tabIndex][keyName].splice(productIndex, 1)
    },
    openProduct (id, tabIndex, isSpecial = false) {
      if (!id) {
        return
      }
      this.dialogProductId = id
      this.currentTabIndex = tabIndex
      this.productDialog = true
      this.isSpecial = isSpecial
    },
    cancelProduct () {
      this.productDialog = false
      this.currentTabIndex = ''
      this.specialProductId = ''
      this.productId = ''
    },
    addTabPanel () {
      const newTab = {
        name: 'tabNumber' + this.value.list.length,
        products: [],
        specialProducts: []
      }
      this.value.list.push(newTab)
    },
    removeTabPanel (itemIndex) {
      this.value.list.splice(itemIndex, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.q-card.custom-card) {
:not([class^=col]) {
  box-shadow: none;
}
.custom-card {
  //width: 150px;
}
}

</style>
