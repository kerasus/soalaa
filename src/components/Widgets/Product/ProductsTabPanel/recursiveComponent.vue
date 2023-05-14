<template>
  <div class="option-panel-container">
    <component :is="localOptions.type.concat('OptionPanel')"
               :options="localOptions" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins'

export default {
  name: 'component',
  components: {
    GroupListOptionPanel: defineAsyncComponent(() => import('./GroupListOptionPanel/GroupListOptionPanel.vue')),
    ProductListOptionPanel: defineAsyncComponent(() => import('./ProductListOptionPanel/ProductListOptionPanel.vue'))
  },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      defaultOptions: {
        type: '',
        options: {},
        data: []
      }
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
