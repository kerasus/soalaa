<template>
  <!--  v-model:index-inputs="indexInputs"-->
  <entity-crud
    v-model:default-inputs="defaultInputs"
    v-model:index-inputs="indexInputs"
    v-model:create-inputs="createInputs"
    v-model:edit-inputs="editInputs"
    v-bind="allProps"
  >
    <!--    {inputData, showConfirmRemoveDialog}-->
    <template v-slot:entity-crud-table-cell="{inputData,showConfirmRemoveDialog}">
      <template v-if="inputData.col.name === 'actions'">
        <q-btn round
               flat
               dense
               size="md"
               color="info"
               icon="info"
               :to="{name:'Admin.QuestionTarget.Show', params: {id: inputData.props.row.id}}">
          <q-tooltip>
            مشاهده
          </q-tooltip>
        </q-btn>
        <q-btn round
               flat
               dense
               size="md"
               color="negative"
               icon="delete"
               class="q-ml-md"
               @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
          <q-tooltip>
            حذف
          </q-tooltip>
        </q-btn>
      </template>
      <template v-else-if="inputData.col.name === 'description'">
        <div v-html="inputData.col.value" />
      </template>
      <template v-else>
        {{ inputData.col.value }}
      </template>
    </template>
  </entity-crud>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityCrud } from 'quasar-crud'

export default {
  name: 'QuestionTarget',
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
            show: API_ADDRESS.entityCrud.questionTarget.show,
            edit: API_ADDRESS.entityCrud.questionTarget.edit,
            create: API_ADDRESS.entityCrud.questionTarget.create,
            index: API_ADDRESS.entityCrud.questionTarget.index
          },
          title: {
            show: 'اطلاعات هدف',
            edit: 'ویرایش هدف',
            create: 'افزودن هدف',
            index: 'لیست اهدف سوالات'
          },
          showRouteName: 'Admin.QuestionTarget.Show',
          editRouteName: 'Admin.QuestionTarget.Edit',
          indexRouteName: 'Admin.QuestionTarget.Index',
          createRouteName: 'Admin.QuestionTarget.Create',
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
                name: 'order',
                required: true,
                label: 'ترتیب نمایش',
                align: 'left',
                field: row => row.order
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
        // { type: 'photo', name: 'photo', label: 'تصویر', col: 'col-md-3', placeholder: ' ', filled: true },
        { type: 'input', name: 'value', label: 'عنوان', responseKey: 'data.value', col: 'col-md-3', placeholder: ' ', filled: true },
        { type: 'input', name: 'order', label: 'ترتیب نمایش', responseKey: 'data.order', col: 'col-md-2', placeholder: ' ', filled: true }
      ],
      createInputs: [
        // { type: 'photo', name: 'photo', label: 'تصویر', col: 'col-md-3', placeholder: ' ', filled: true },
        { type: 'hidden', name: 'type', value: 'targets_type', label: '', col: 'col-12' },
        { type: 'input', name: 'value', label: 'عنوان', col: 'col-md-3', placeholder: ' ', filled: true },
        { type: 'input', name: 'order', label: 'ترتیب نمایش', col: 'col-md-2', placeholder: ' ', filled: true }
      ],
      editInputs: [
        { type: 'hidden', name: 'id', label: 'شناسه', responseKey: 'data.id', col: 'col-md-1', placeholder: ' ' },
        { type: 'input', name: 'value', label: 'عنوان', responseKey: 'data.value', col: 'col-md-3', placeholder: ' ', filled: true },
        { type: 'input', name: 'order', label: 'ترتیب نمایش', responseKey: 'data.order', col: 'col-md-2', placeholder: ' ', filled: true }
      ],
      showInputs: [],
      indexInputs: [
        { type: 'input', name: 'value', label: 'عنوان', responseKey: 'data.value', col: 'col-md-3', placeholder: ' ', filled: true }
      ]
    }
  },
  methods: {
    // for index.vue
    getRemoveMessage (row) {
      return 'آیا از حذف ' + '(' + row.value + ')' + ' اطمینان دارید؟'
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
