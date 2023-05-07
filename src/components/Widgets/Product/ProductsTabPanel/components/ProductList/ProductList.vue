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
    GridRow: defineAsyncComponent(() =>
      import('./GridRow.vue')
    ),
    ScrollRow: defineAsyncComponent(() =>
      import('./ScrollRow.vue')
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
