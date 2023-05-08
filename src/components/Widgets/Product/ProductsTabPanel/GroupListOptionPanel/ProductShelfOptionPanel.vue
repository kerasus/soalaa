<template>
  <div class="option-panel-container">
    <div class="row q-px-md">
      <div class="col-6">
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
              <q-input v-if="item.type === 'GroupList'"
                       v-model="item.options.label"
                       autogrow
                       class="full-width"
                       label="label" />
              <q-input v-else
                       v-model="item.type"
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
  name: 'groupListShelfOptionPanel',
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
    removeTabPanel (itemIndex) {
      this.localData.splice(itemIndex, 1)
    }
  }
}
</script>

<style scoped>

</style>
