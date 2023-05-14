<template>
  <div class="option-panel-container">
    <div class="row q-px-md">
      <div class="col-6">
        <div class="outsideLabel">type</div>
        <q-select v-model="localOptions.options.layout"
                  :options="layoutOptions" />
      </div>
    </div>

    <div v-for="(item, index) in localOptions.data"
         :key="item">
      <q-card class="custom-card">
        <q-card-section>
          <q-expansion-item expand-separator>
            <template v-slot:header>
              <q-btn color="negative"
                     icon="close"
                     class="q-mr-sm"
                     @click="removeTabPanel(index)" />
              <div class="expansion-label q-mt-sm full-width">
                {{item.type}}
              </div>
            </template>
            <recursive-component :options="item" />
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins'

export default {
  name: 'groupListShelfOptionPanel',
  components: { recursiveComponent: defineAsyncComponent(() => import('../recursiveComponent.vue')) },
  mixins: [PageBuilderOptionPanel],
  data() {
    return {
      layoutOptions: ['ProductTab', 'ProductShelf']
    }
  },
  methods: {
    removeTabPanel (itemIndex) {
      this.localOptions.data.splice(itemIndex, 1)
    }
  }
}
</script>

<style scoped>

</style>
