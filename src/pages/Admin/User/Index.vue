<template>
  <div>
    <entity-index
      v-model:value="inputs"
      title="لیست کاربران"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :create-route-name="'Admin.User.Create'"
    >
      <template #table-cell="{inputData, showConfirmRemoveDialog}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'avatar'">
            <q-avatar>
              <q-img
                :src="inputData.props.value"
                placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
                spinner-color="white"
                style="height: 50px; max-width: 50px"
              />
            </q-avatar>
          </template>
          <template v-if="inputData.props.col.name === 'actions'">
            <q-btn round flat dense size="md" color="info" icon="info" :to="{name:'Admin.User.Show', params: {id: inputData.props.row.id}}">
              <q-tooltip>
                مشاهده
              </q-tooltip>
            </q-btn>
            <q-btn v-if="false" round flat dense size="md" color="negative" icon="delete" class="q-ml-md"
                   @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
              <q-tooltip>
                حذف
              </q-tooltip>
            </q-btn>
          </template>
          <template v-if="inputData.props.col.name !== 'avatar' && inputData.props.col.name !== 'actions'">
            {{ inputData.props.value }}
          </template>
        </q-td>
      </template>
    </entity-index>
  </div>
</template>

<script>
import EntityIndex from 'components/Entity/Index/EntityIndex'
// import API_ADDRESS from "src/api/Addresses";

export default {
  name: 'Index',
  components: { EntityIndex },
  data () {
    return {
      expanded: true,
      // api: API_ADDRESS.user.base,
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      },
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'id',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'nickname',
            required: true,
            label: 'نام',
            align: 'left',
            field: row => row.nickname
          },
          {
            name: 'mobile_number',
            required: true,
            label: 'موبایل',
            align: 'left',
            field: row => row.mobile_number
          },
          {
            name: 'is_active',
            required: true,
            label: 'نقش',
            align: 'left',
            field: row => row.roles.map(item => item.name).join(',').replace('superuser', 'ادمین کل').replace('sokhanran', 'سخنران').replace('madah', 'مداح').replace('bani', 'بانی')
          },
          {
            name: 'actions',
            required: true,
            label: '',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      inputs: [
        { type: 'input', name: 'nickname', value: null, label: 'نام و نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'national_code', value: null, label: 'کد ملی', col: 'col-md-3' },
        { type: 'input', name: 'mobile_number', value: null, label: 'شماره همراه', col: 'col-md-3' },
        { type: 'input', name: 'email', value: null, label: 'ایمیل', col: 'col-md-3' }
      ]
    }
  },
  methods: {
    getRemoveMessage (row) {
      const firstName = row.first_name
      const lastName = row.last_name
      return 'آیا از حذف ' + firstName + ' ' + lastName + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped>

</style>
