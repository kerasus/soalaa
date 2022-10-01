<template>
  <div>
    <entity-index
      v-model:value="inputs"
      title="لیست تیکت ها"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :create-route-name="'User.Ticket.Create'"
      :show-expand-button="false"
    >
      <template v-slot:table-cell="{inputData}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'status'">
            <q-chip :color="checkStatusColor(inputData.props.row.status.id)"
                    :style="{color: '#FFF', height: '26px'}">
              {{ inputData.props.row.status.title }}
            </q-chip>
          </template>
          <template v-if="inputData.props.col.name === 'score'">
            <q-img :src="rateImg(inputData.props.row.rate)"
                   class="rate-img" />
          </template>
          <template v-if="inputData.props.col.name === 'actions'">
            <q-btn round
                   flat
                   dense
                   size="md"
                   color="info"
                   icon="info"
                   :to="{name:'User.Ticket.Show', params: {id: inputData.props.row.id}}">
              <q-tooltip>
                مشاهده
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
      api: API_ADDRESS.ticket.index.base,
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'productPage'
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
            name: 'first_name',
            required: true,
            label: 'نام',
            align: 'left',
            field: row => row.user.first_name
          },
          {
            name: 'last_name',
            required: true,
            label: 'نام خانوادگی',
            align: 'left',
            field: row => row.user.last_name
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: ''
          },
          {
            name: 'created_at',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => row.created_at
          },
          // {
          //   name: 'updated_at',
          //   required: true,
          //   label: 'آخرین بروزرسانی',
          //   align: 'left',
          //   field: row => row.updated_at
          // },
          {
            name: 'department',
            required: true,
            label: 'گروه',
            align: 'left',
            field: row => row.department.title
          },
          // {
          //   name: 'answerd_by',
          //   required: true,
          //   label: 'اخرین پاسخگو',
          //   align: 'left',
          //   field: ''
          // },
          {
            name: 'priority',
            required: true,
            label: 'اولویت',
            align: 'left',
            field: row => row.priority.title
          },
          {
            name: 'score',
            required: true,
            label: 'امتیاز',
            align: 'left',
            field: ''
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
        // { type: 'select', options: ['test'], name: 'department', label: 'گروه', col: 'col-md-3' },
        // { type: 'select', options: ['test'], name: 'pirority', label: 'اولویت', col: 'col-md-3' },
        // { type: 'select', options: ['test'], name: 'status', label: 'وضعیت', col: 'col-md-3' },
        // { type: 'input', name: 'email', label: 'شماره سفارش', col: 'col-md-3' },
        // { type: 'input', name: 'address', label: 'شماره تیکت', col: 'col-md-3' },
        { type: 'date', name: 'from', calendarIcon: ' ', responseKey: 'data.from', label: 'از:', col: 'col-md-6' },
        { type: 'date', name: 'to', calendarIcon: ' ', label: 'تا:', col: 'col-md-6' },
        { type: 'hidden', name: 'department', value: 12, col: 'col-md-12' }
      ]
    }
  },
  methods: {
    rateImg (id) {
      if (id) {
        return 'https://nodes.alaatv.com/upload/ticket-rate-' + id + '-on.png'
      }
      return null
    },
    checkStatusColor (id) {
      if (id === 1) {
        return 'red'
      } else if (id === 2) {
        return 'primary'
      } else if (id === 3) {
        return 'green'
      } else {
        return 'blue'
      }
    }
  }
}
</script>

<style scoped>
.rate-img {
  width: 30px;
  height: 30px
}
</style>
