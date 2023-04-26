<template>
  <q-dialog :model-value="dialog">
    <q-card class="content-selection-card">
      <q-card-section class="row items-center justify-center">
        <entity-index
          v-model:value="inputs"
          v-model:table-selected-values="selected"
          title="لیست محتوا"
          show-no-entity-slot
          :api="api"
          :table="table"
          :table-keys="tableKeys"
          :table-selection-mode="'single'"
          :item-indicator-key="'id'"
          :default-layout="true"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-close-popup
               flat
               label="خروج"
               color="primary"
               @click="$emit('toggleDialog')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ContentSelectionDialog',
  components: { EntityIndex },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  emits: ['updateValue', 'toggleDialog'],
  data () {
    return {
      api: API_ADDRESS.content.admin,
      selected: [],
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'page'
      },
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: '#',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'name',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.name
          }
        ],
        data: []
      },
      inputs: [
        { type: 'input', name: 'id', value: null, label: 'آیدی مورد نظر را وارد کنید', col: 'col-md-4' },
        { type: 'input', name: 'title', value: null, label: 'عنوان مورد نظد را وارد کنید', col: 'col-md-4' }
      ]
    }
  },
  watch: {
    selected(value) {
      this.$emit('updateValue', value)
      this.$emit('toggleDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.content-selection-card {
  width: 800px;
}
</style>
