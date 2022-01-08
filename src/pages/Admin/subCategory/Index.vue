<template>
  <div>
    <entity-index
      v-model:value="inputs"
      title="لیست دروس"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :create-route-name="'Admin.lesson.Create'"
    >
      <template #table-cell="{inputData, showConfirmRemoveDialog}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'thumbnail'">
            <q-avatar>
              <q-img
                :src="inputData.props.value"
                placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
                spinner-color="white"
                style="height: 50px; max-width: 50px"
              />
            </q-avatar>
          </template>
          <template v-else-if="inputData.props.col.name === 'actions'">
            <q-btn round flat dense size="md" color="info" icon="info" :to="{name:'Admin.subCategory.Show', params: {id: inputData.props.row.id}}">
              <q-tooltip>
                مشاهده
              </q-tooltip>
            </q-btn>
            <q-btn round flat dense size="md" color="purple" icon="edit" :to="{name:'Admin.subCategory.Edit', params: {id: inputData.props.row.id}}">
              <q-tooltip>
                ویرایش
              </q-tooltip>
            </q-btn>
            <q-btn v-if="false" round flat dense size="md" color="negative" icon="delete" class="q-ml-md"
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
