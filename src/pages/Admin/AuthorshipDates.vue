<template>
  <!--  v-model:index-inputs="indexInputs"-->
  <entity-crud
    v-model:default-inputs="defaultInputs"
    v-model:index-inputs="indexInputs"
    v-model:create-inputs="createInputs"
    v-bind="allProps"
  >
    <!--    {inputData, showConfirmRemoveDialog}-->
    <template v-slot:entity-crud-table-cell="{inputData}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.AuthorshipDates.Show', params: {id: inputData.props.row.id}}">
            <q-tooltip>
              مشاهده
            </q-tooltip>
          </q-btn>
          <!--          <q-btn round flat dense size="md" color="negative" icon="delete" class="q-ml-md"-->
          <!--                 @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">-->
          <!--            <q-tooltip>-->
          <!--              حذف-->
          <!--            </q-tooltip>-->
          <!--          </q-btn>-->
        </template>
        <template v-else-if="inputData.props.col.name === 'description'">
          <div v-html="inputData.props.value" />
        </template>
        <template v-else>
          {{ inputData.props.value }}
        </template>
      </q-td>
    </template>
  </entity-crud>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityCrud } from 'quasar-crud'

export default {
  name: 'AuthorshipDates',
  components: {
    EntityCrud
  },
  data () {
    return {
      model: null,
      tags: [],
      expanded: true,
      allProps: {
        config: {
          api: {
            show: API_ADDRESS.entityCrud.authorshipDates.show,
            edit: API_ADDRESS.entityCrud.authorshipDates.edit,
            create: API_ADDRESS.entityCrud.authorshipDates.create,
            index: API_ADDRESS.entityCrud.authorshipDates.index
          },
          title: {
            show: 'اطلاعات تاریخ تالیف',
            edit: 'ویرایش  تاریخ تالیف',
            create: 'افزودن تاریخ تالیف',
            index: 'لیست  تاریخ های تالیف'
          },
          showRouteName: 'Admin.AuthorshipDates.Show',
          editRouteName: 'Admin.AuthorshipDates.Edit',
          indexRouteName: 'Admin.AuthorshipDates.Index',
          createRouteName: 'Admin.AuthorshipDates.Create',
          entityIdKeyInResponse: 'data.id',
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
                name: 'value',
                required: true,
                label: 'عنوان',
                align: 'left',
                field: row => row.value
              },
              {
                name: 'updated_at',
                required: true,
                label: 'تاریخ ایجاد',
                align: 'left',
                field: row => row.updated_at
              },
              {
                name: 'created_at',
                required: true,
                label: 'تاریخ ویرایش',
                align: 'left',
                field: row => row.created_at
              },
              {
                name: 'actions',
                required: true,
                label: 'عملیات',
                align: 'left',
                field: ''
              }
            ],
            data: []
          }
        }
      },
      defaultInputs: [
        { type: 'hidden', name: 'id', label: 'شناسه', responseKey: 'data.id', col: 'col-md-1', placeholder: ' ', filled: true },
        { type: 'hidden', name: 'type', label: 'نوع', responseKey: 'data.type', col: 'col-md-1', placeholder: ' ', filled: true },
        { type: 'input', name: 'value', label: 'تاریخ تالیف', responseKey: 'data.value', col: 'col-md-3', placeholder: ' ', filled: true }
      ],
      createInputs: [
        { type: 'hidden', name: 'type', value: 'year_type', label: '', col: 'col-12' },
        { type: 'input', name: 'value', label: 'تاریخ تالیف', col: 'col-md-3', placeholder: ' ', filled: true }
      ],
      editInputs: [],
      showInputs: [],
      indexInputs: [
        { type: 'hidden' }
      ]
    }
  },
  methods: {
    // for index.vue
    getRemoveMessage (row) {
      const firstName = row.first_name
      const lastName = row.last_name
      return 'آیا از حذف ' + firstName + ' ' + lastName + ' اطمینان دارید؟'
    },
    createValue (val, done) {
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      if (val.length > 0) {
        if (!this.tags.includes(val)) {
          this.tags.push(val)
        }
        done(val, 'toggle')
      }
    }
  },
  watch: {
    // editInputs: {
    //   handler (newValue, oldValue) {
    //     console.log('inputs', newValue)
    //   },
    //   deep: true
    // }
  },
  created () {}
}
</script>

<style scoped>

</style>
