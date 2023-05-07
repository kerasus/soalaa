<template>
  <div class="option-panel-container">
    <div class="row q-px-md q-col-gutter-md">
      <div class="col-3">
        <div class="outsideLabel">activeColor</div>
        <q-input v-model="localOptions.activeColor" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">activeBgColor</div>
        <q-input v-model="localOptions.activeBgColor" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">indicatorColor</div>
        <q-input v-model="localOptions.indicatorColor" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">type</div>
        <q-select v-model="localOptions.layout"
                  :options="layoutOptions" />
      </div>
    </div>
    <div v-for="(item, index) in localData"
         :key="item">
      <q-card class="custom-card">
        <q-card-section>
          <q-expansion-item expand-separator>
            <template v-slot:header>
              <q-btn color="negative"
                     icon="close"
                     class="q-mr-sm"
                     @click="removeTabPanel(index)" />
              <q-input v-model="item.options.label"
                       autogrow
                       class="full-width"
                       label="label" />
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

export default {
  name: 'groupListTabOptionPanel',
  components: { recursiveComponent: defineAsyncComponent(() => import('../recursiveComponent.vue')) },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      layoutOptions: ['ProductTab', 'ProductShelf']
    }
  },
  computed: {
    localData: {
      get() {
        return this.data
      },
      set(newVal) {
        this.$emit('update:data', newVal)
      }
    },
    localOptions: {
      get() {
        return this.options
      },
      set(newVal) {
        this.$emit('update:options', newVal)
      }
    }
  },
  methods: {
    removeTabPanel(itemIndex) {
      this.localData.splice(itemIndex, 1)
    }
  }
}
</script>

<style scoped>

</style>
