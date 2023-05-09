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
        >
          <template #entity-index-table-cell="{inputData}">
            <template v-if="inputData.col.name === 'photo'">
              <q-img
                :src="inputData.col.value"
                class="content-photo"
                spinner-color="primary"
                spinner-size="82px"
              />
            </template>
          </template>
        </entity-index>
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
import { Content } from 'src/models/Content'

export default {
  name: 'ContentSelectionDialog',
  components: { EntityIndex },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    content: {
      type: Content
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
        pageKey: 'contentPage'
      },
      table: {
        columns: [
          {
            name: 'photo',
            required: true,
            label: 'تصویر',
            align: 'left',
            field: row => row.photo
          },
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
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => row.status ? row.status : 'ندارد'
          },
          {
            name: 'enable',
            required: true,
            label: 'فعال',
            align: 'left',
            field: row => row.enable ? 'فعال' : 'غیر فعال'
          },
          {
            name: 'display',
            required: true,
            label: 'قابلیت دیدن',
            align: 'left',
            field: row => row.display ? 'قابل دیدن' : 'غیر قابل دیدن'
          },
          {
            name: 'is_free',
            required: true,
            label: 'نوع',
            align: 'left',
            field: row => row.is_free ? 'رایگان' : 'پولی'
          }
        ],
        data: []
      },
      inputs: [
        { type: 'input', name: 'id', value: null, label: 'آیدی مورد نظر را وارد کنید', col: 'col-md-4' },
        { type: 'input', name: 'name', value: null, label: 'عنوان مورد نظد را وارد کنید', col: 'col-md-4' }
      ]
    }
  },
  watch: {
    selected(value) {
      this.$emit('updateValue', value)
      this.$emit('toggleDialog')
    },
    content(newContent) {
      this.selected[0] = newContent
    }
  }
}
</script>

<style lang="scss" scoped>
.content-selection-card {
  max-width: 100%;

  .content-photo {
    width: 200px;
  }
}
</style>
