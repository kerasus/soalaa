<template>
  <div>
    <entity-index
      v-model:value="inputs"
      title="لیست تیکت ها"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :create-route-name="'Admin.Ticket.Create'"
    >
      <template v-slot:table-cell="{inputData, showConfirmRemoveDialog}">
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
                   :to="{name:'Admin.Ticket.Show', params: {id: inputData.props.row.id}}">
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
                   @click="showConfirmRemoveDialog(inputData.props.row, 'id', 'آیا از حذف تیکت اطمینان دارید ؟')">
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
          {
            name: 'updated_at',
            required: true,
            label: 'آخرین بروزرسانی',
            align: 'left',
            field: row => row.updated_at
          },
          {
            name: 'department',
            required: true,
            label: 'گروه',
            align: 'left',
            field: row => row.department.title
          },
          {
            name: 'answerd_by',
            required: true,
            label: 'اخرین پاسخگو',
            align: 'left',
            field: ''
          },
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
        { type: 'input', name: 'mobile', label: 'شماره همراه', col: 'col-md-3' },
        { type: 'input', name: 'national_code', label: 'کد ملی', col: 'col-md-3' },
        { type: 'input', name: 'first_name', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'last_name', label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'select', options: ['test'], name: 'department', label: 'گروه', col: 'col-md-3' },
        { type: 'select', options: ['test'], name: 'pirority', label: 'اولویت', col: 'col-md-3' },
        { type: 'select', options: ['test'], name: 'status', label: 'وضعیت', col: 'col-md-3' },
        { type: 'input', name: 'email', label: 'شماره سفارش', col: 'col-md-3' },
        { type: 'input', name: 'address', label: 'شماره تیکت', col: 'col-md-3' },
        { type: 'input', name: 'postal_code', label: 'عنوان', col: 'col-md-3' },
        { type: 'date', name: 'from', responseKey: 'data.from', label: 'از:', col: 'col-md-3' },
        { type: 'date', name: 'to', label: 'تا:', col: 'col-md-3' },
        {
          type: 'entity',
          name: 'management',
          selectionMode: 'single',
          label: 'مسؤل',
          buttonColor: 'primary',
          buttonTextColor: 'white',
          buttonBadgeColor: 'secondary',
          indexConfig: {
            apiAddress: 'https://reqres.in/api/users',
            tableTitle: 'لیست مسؤلین',
            showTableItemsRouteName: 'Admin.BlockManagement.Show',
            tableKeys: {
              data: 'data',
              total: 'total',
              currentPage: 'page',
              perPage: 'per_page',
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
                  name: 'first_name',
                  required: true,
                  label: 'نام',
                  align: 'left',
                  field: row => row.first_name
                },
                {
                  name: 'last_name',
                  required: true,
                  label: 'نام خانوادگی',
                  align: 'left',
                  field: row => row.last_name
                },
                {
                  name: 'role',
                  required: true,
                  label: 'نقش',
                  align: 'left',
                  field: row => row.email
                }
              ],
              data: []
            },
            inputs: [
              { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
              { type: 'input', name: 'first_name', value: null, label: 'نام', col: 'col-md-3' },
              { type: 'input', name: 'last_name', value: null, label: 'نام خانوادگی', col: 'col-md-3' },
              { type: 'hidden', name: 'role', value: 123, label: 'نقش', col: 'col-md-3' }
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'first_name'
          },
          value: [],
          responseKey: '',
          selected: [],
          col: 'col-md-6'
        },
        {
          type: 'entity',
          name: 'product',
          selectionMode: 'multiple',
          label: 'انتخاب محصول',
          buttonColor: 'primary',
          buttonTextColor: 'white',
          buttonBadgeColor: 'secondary',
          indexConfig: {
            apiAddress: API_ADDRESS.product.index.base,
            tableTitle: 'لیست محصولات',
            showTableItemsRouteName: 'Admin.Product.Show',
            tableKeys: {
              data: 'data',
              total: 'total',
              currentPage: 'page',
              perPage: 'per_page',
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
                  name: 'photo',
                  required: true,
                  label: 'تصویر',
                  align: 'left',
                  field: row => row.photo
                },
                {
                  name: 'title',
                  required: true,
                  label: 'عنوان',
                  align: 'left',
                  field: row => row.title
                },
                {
                  name: 'product_type',
                  required: true,
                  label: 'نوع',
                  align: 'left',
                  field: row => row.product_type.display_name
                },
                {
                  name: 'attribute_set',
                  required: true,
                  label: 'دسته',
                  align: 'left',
                  field: row => row.attribute_set.name
                },
                {
                  name: 'enable',
                  required: true,
                  label: 'فعال',
                  align: 'left',
                  field: row => (row.enable) ? 'فعال' : 'غیرفعال'
                },
                {
                  name: 'is_free',
                  required: true,
                  label: 'رایگان/ غیر رایگان',
                  align: 'left',
                  field: row => (row.is_free) ? 'رایگان' : 'پولی'
                }
              ],
              data: []
            },
            inputs: [
              { type: 'input', name: 'id', value: null, label: 'شناسه', col: 'col-md-3' },
              { type: 'input', name: 'name', value: null, label: 'نام', col: 'col-md-3' },
              { type: 'input', name: 'short_description', value: null, label: 'توضیحات کوتاه', col: 'col-md-3' },
              { type: 'input', name: 'long_description', value: null, label: 'توضیحات اجمالی', col: 'col-md-3' },
              { type: 'select', name: 'product_type_id', value: null, options: [{ label: 'ساده', value: 1 }, { label: 'قابل پیکربندی', value: 2 }, { label: 'قابل انتخاب', value: 3 }, { label: 'اشتراک', value: 4 }], label: 'نوع محصول', col: 'col-md-3' },
              { type: 'select', name: 'is_free', value: null, options: [{ label: 'رایگان', value: 1 }, { label: 'غیر رایگان', value: 0 }], label: 'وضعیت رایگان / غیر رایگان', col: 'col-md-3' },
              { type: 'select', name: 'enable', value: null, options: [{ label: 'فعال', value: 1 }, { label: 'غیرفعال', value: 0 }], label: 'وضعیت فعال / غیرفعال', col: 'col-md-3' },
              { type: 'select', name: 'display', value: null, options: [{ label: 'نمایش', value: 1 }, { label: 'عدم نمایش', value: 0 }], label: 'وضعیت نمایش / عدم نمایش', col: 'col-md-3' },
              { type: 'input', name: 'name', value: null, label: 'نام', col: 'col-md-4' },
              { type: 'input', name: 'attribute_set_id', value: null, label: 'کد دسته', col: 'col-md-4' },
              { type: 'dateRange', name: 'created_at_range', value: [], label: 'بازه تاریخ ایجاد', col: 'col-md-4' }
            ],
            itemIdentifyKey: 'id',
            itemIndicatorKey: 'name'
          },
          value: [],
          responseKey: '',
          selected: [],
          col: 'col-md-6'
        },
        // { type: 'select', options: ['test'], name: 'operator', label: 'پاسخگو', col: 'col-md-3' },
        // { type: 'date', name: 'operatorFrom', label: 'تاریخ پاسخ اپراتور از:', col: 'col-md-3' },
        // { type: 'date', name: 'operatorTo', label: 'تاریخ پاسخ اپراتور تا:', col: 'col-md-3' },
        { type: 'Checkbox', name: 'showReported', value: false, label: 'مشاهده موارد گزارش شده', col: 'col-md-6' }
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
