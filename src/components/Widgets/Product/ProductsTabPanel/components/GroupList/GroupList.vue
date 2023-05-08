<template>
  <div :style="options.style"
       :class="options.className">
    <component :is="options.layout"
               :loading="loading"
               :data="data"
               :options="options" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'GroupList',
  components: {
    ProductTab: defineAsyncComponent(() =>
      import('./ProductTab.vue')
    ),
    ProductShelf: defineAsyncComponent(() =>
      import('./ProductShelf.vue')
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
  }
}
</script>
