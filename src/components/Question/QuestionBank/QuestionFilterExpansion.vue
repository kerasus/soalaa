<template>
  <div class="filter-options-section">
    <q-card class="custom-card q-pa-none">
      <q-card-section class="q-pa-none">
        <q-expansion-item
          expand-icon="isax:arrow-down-1"
        >
          <template v-slot:header>
            <div class="filter-option-container" >
              <div class="filter-option-title">
                {{ headerTitle }}
              </div>
            </div>
          </template>
          <slot/>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
// import API_ADDRESS from 'src/api/Addresses'

import { mixinTree } from 'src/mixin/Mixins'

export default {
  name: 'QuestionFilterExpansion',
  data () {
    return {
    }
  },
  props: {
    headerTitle: {
      type: String,
      default: ''
    }
  },
  mixins: [mixinTree],
  created () {
  },
  updated () {
  },
  computed: {
  },
  methods: {
    tickedData (value) {
      this.filters = value
      console.log('ticked', value)
      this.testArr = []
      value.forEach(val => {
        this.testArr.push(val.id)
      })
    }
  }
}
</script>
<style scoped lang="scss">
.filter-options-section {
  margin-bottom: 16px;
  &:deep(.q-item--clickable){
    justify-content: space-between;
  }
  &:deep(.q-focus-helper){
    background: none !important;
  }

  .filter-option-container {
    width: 500px;
    display: flex;
    padding: 20px 24px 20px 24px;
    justify-content: space-between;

    .filter-option-title {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #23263B;
    }

  }
}
</style>
