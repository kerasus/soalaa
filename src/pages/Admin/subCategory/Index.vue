<template>
  <div>
    <!--    v-model:value="inputs"-->
    <entity-index
      title="لیست دروس"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :create-route-name="'Admin.subCategory.Create'"
    >
      <template #table-cell="{inputData, showConfirmRemoveDialog}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'icon'">
            <q-avatar
              size="40px"
              round
              text-color="white"
              :color="iconPicker(inputData.props.row.title).color"
              :icon="iconPicker(inputData.props.row.title).icon"
            />
          </template>
          <template v-if="inputData.props.col.name === 'actions'">
            <q-btn round
                   flat
                   dense
                   size="md"
                   color="info"
                   icon="info"
                   :to="{name:'Admin.subCategory.Show', params: {id: inputData.props.row.id}}">
              <q-tooltip>
                مشاهده
              </q-tooltip>
            </q-btn>
            <q-btn round
                   flat
                   dense
                   size="md"
                   color="purple"
                   icon="edit"
                   :to="{name:'Admin.subCategory.Edit', params: {id: inputData.props.row.id}}">
              <q-tooltip>
                ویرایش
              </q-tooltip>
            </q-btn>
            <q-btn v-if="false"
                   round
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
          <template v-else>
            {{ inputData.props.value }}
          </template>
        </q-td>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Index',
  components: { EntityIndex },
  data () {
    return {
      expanded: true,
      categoryResponse: null,
      api: API_ADDRESS.questionSubcategory.base,
      tableKeys: {
        data: 'data',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      table: {
        columns: [
          {
            name: 'icon',
            required: true,
            label: '',
            align: 'left',
            field: ''
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'category_id',
            required: true,
            label: 'نوع دفترچه',
            align: 'left',
            field: row => this.setCategoryTitle(row.category_id)
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
      },
      inputs: [
        // { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
        // { type: 'input', name: 'name', value: null, label: 'نام', col: 'col-md-3' },
        // { type: 'select', name: 'gender', value: null, options: ['Male', 'Female'], label: 'جنسیت', col: 'col-md-3' },
        // { type: 'select', name: 'status', value: null, options: [{label: 'بررسی اطلاعات', value: 'CHECKING'}, {label: 'هماهنگ شده', value: 'PLANNING'}, {label: 'درحال هماهنگی', value: 'SETTING_UP'}, {label: 'برگزار شده', value: 'HELD'}, {label: 'لغو شده', value: 'CANCELED'}], label: 'وضعیت', col: 'col-md-3' },
        // { type: 'dateRange', name: 'created_at_range', value: [], label: 'بازه تاریخ عضویت', col: 'col-md-6' }
      ]
    }
  },
  created () {
    this.loadCategories()
  },
  computed: {
    iconPicker () {
      return (title) => {
        if (title.includes('ریاضی') || title.includes('ریاضیات')) {
          return {
            icon: 'mdi-sigma',
            color: 'deep-orange darken-3'
          }
        } else if (title.includes('هندسه')) {
          return {
            icon: 'mdi-math-compass',
            color: 'red'
          }
        } else if (title.includes('زمین')) {
          return {
            icon: 'mdi-earth',
            color: 'green'
          }
        } else if (title.includes('زبان') || title.includes('عربی') || title.includes('انگلیسی') || title.includes('فارسی') || title.includes('فارسی') || title.includes('ادبیات')) {
          return {
            icon: 'mdi-translate',
            color: 'purple lighten-2'
          }
        } else if (title.includes('فیزیک')) {
          return {
            icon: 'mdi-atom',
            color: 'blue-grey darken-1'
          }
        } else if (title.includes('شیمی')) {
          return {
            icon: 'mdi-bottle-tonic-skull',
            color: 'red darken-2'
          }
        } else if (title.includes('حساب') || title.includes('گسسته')) {
          return {
            icon: 'mdi-math-integral',
            color: 'orange accent-4'
          }
        } else if (title.includes('تاریخ')) {
          return {
            icon: 'mdi-history',
            color: 'light-blue accent-3'
          }
        } else if (title.includes('جغرافی')) {
          return {
            icon: 'mdi-map-marker',
            color: 'cyan lighten-1'
          }
        } else if (title.includes('نظرسنجی')) {
          return {
            icon: 'mdi-poll',
            color: 'black'
          }
        } else if (title.includes('زیست')) {
          return {
            icon: 'mdi-human',
            color: 'brown'
          }
        } else if (title.includes('روان')) {
          return {
            icon: 'mdi-head-snowflake',
            color: 'amber accent-4'
          }
        } else if (title.includes('اقتصاد')) {
          return {
            icon: 'mdi-finance',
            color: 'green accent-4'
          }
        } else if (title.includes('دین') || title.includes('آسمانی') || title.includes('عقاید') || title.includes('قرآن')) {
          return {
            icon: 'mdi-book-open-variant',
            color: 'indigo darken-3'
          }
        } else {
          return {
            icon: 'mdi-card-text',
            color: 'grey'
          }
        }
      }
    }
  },
  methods: {
    getRemoveMessage (row) {
      const title = row.title
      const categoryTitle = row.category_info.title
      return 'آیا از حذف ' + title + ' در درسته ' + categoryTitle + ' اطمینان دارید؟'
    },
    loadCategories () {
      const that = this
      that.$axios.get(API_ADDRESS.questionCategory.base)
        .then(function (response) {
          that.categoryResponse = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    setCategoryTitle (id) {
      let title = ''
      this.categoryResponse.forEach(category => {
        if (category.id === id) {
          title = category.title
        }
      })
      return title
    }
  }
}
</script>

<style scoped>
</style>
