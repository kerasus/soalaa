<template>
  <div style="display: none"> {{windowSize}}</div>
  <div
    v-if="!hasUserOrdered"
  >
    <div class="empty-order-list">
      <q-img
        class="image"
        :src="'https://nodes.alaatv.com/aaa/landing/Soalaa/States/empty_orders.png'"
      />
      <div class="list-text">
        لیست سفارش‌های شما خالی است!
      </div>
      <div class="back-to-shop">
        <q-btn
          class="back-to-shop-btn"
          flat
          :color="'primary'"
          label="رفتن به فروشگاه"
          :to="{name:'Landing.3aExams'}"
        />
      </div>
    </div>
  </div>
  <div
    v-else
    class="my-orders-list"
  >
    <div class="title">سفارش های من</div>
    <entity-index
      v-model:value="inputs"
      class="orders-list-entity-index"
      title="سفارش های من"
      :api="getEntityApi"
      :table="table"
      :table-keys="tableKeys"
      :default-layout="false"
      :table-grid-size="$q.screen.lt.sm"
      :create-route-name="'Admin.Exam.Create'"

    >
      <template v-slot:before-index-table="">
        <div class="row items-center">
          <div class="col-lg-4 col-xl-4 col-md-6 col-xs-9 text-left">
            <form-builder class="search-input"
                          :value="searchInputs" />
          </div>
          <div class="col-lg-8 col-xl-8 col-md-6 col-xs-3 text-right">
            <q-btn
              unelevated
              class="filter-toggle"
              :class="filterExpanded? 'gray-bg': 'bg-white'"
              icon="isax:filter"
              @click="filterExpanded = !filterExpanded" />
          </div>
        </div>
        <q-expansion-item
          v-model="filterExpanded"
          icon="perm_identity"
          class="expand-filter"
          label="Account settings"
          caption="John Doe"
        >
          <div class="row filter-items">
            <div class="col-lg-10 col-xs-12">
              <div class="row">
                <div class="col-lg-4 col-xs-12 select-input">
                  <form-builder
                    :value="filterInputs[0].selectInput" />
                </div>
                <div class="col-lg-8 col-xs-12 filter-inputs">
                  <form-builder :value="filterInputs[0].dateInputs" />
                </div>
              </div>
            </div>
            <div class="action-btn col-lg-2 flex col-xs-12 items-end q-pb-md justify-end">
              <q-btn icon="isax:rotate-left"
                     class="reload-icon bg-white"
                     unelevated  />
              <q-btn unelevated
                     class="filter-btn"
                     color="primary"
                     padding="1px 23px"
                     label="اعمال" />
            </div>
          </div>
        </q-expansion-item>
      </template>
      <template #table-cell="{inputData}">
        <q-td :props="inputData.props">
          {{setHasUserOrderedValue(inputData.props.row)}}

          <template v-if="inputData.props.col.name === 'details'">
            <q-btn
              round
              flat
              dense
              size="md"
              @click="showDetailsDialog(inputData.props.row)"
            >
              <!--              <q-tooltip anchor="top middle"-->
              <!--                         self="bottom middle">-->
              <!--                مشاهده-->
              <!--              </q-tooltip>-->
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="6"
                  r="2"
                  fill="#6D708B"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="2"
                  fill="#6D708B"
                />
                <circle
                  cx="12"
                  cy="18"
                  r="2"
                  fill="#6D708B"
                />
              </svg>

            </q-btn>

          </template>
          <template v-else>
            {{ inputData.props.value }}
          </template>
        </q-td>
      </template>
      <template v-slot:table-item-cell="{inputData}">
        <q-card class="details-table-mobile">
          <div class="details-info">
            <div class="first-col">
              <div class="order first-col-item">
                شماره سفارش:
                <span class="order-id">{{inputData.props.row.id}}</span>
              </div>
              <div class="first-col-item">وضعیت پرداخت:</div>
              <div class="first-col-item">مبلغ:</div>
              <div class="first-col-item">تاریخ سفارش:</div>
            </div>
            <div class="second-col">
              <q-btn
                round
                flat
                dense
                size="md"
                class="details-btn"
                @click="toggleDetailsCard(inputData.props.row)"
              >
                جزییات
              </q-btn>
              <div
                :class="
                  { 'payment-not-okay' : inputData.props.row.paymentstatus.id === 1 ,
                    'payment-okay' : inputData.props.row.paymentstatus.id === 3 ,
                    'payment-installment' : inputData.props.row.paymentstatus.id
                  }"
              >
                <!--                پرداخت نشده-->
                {{inputData.props.row.paymentstatus.name}}
              </div>
              <div>
                {{ toman(inputData.props.row.price) }}
              </div>
              <div>
                {{ getCurrentOrderCompletedAt(inputData.props.row.completed_at) }}
                <!--                {{ getCurrentOrderCompletedAt('1401/09/25') }}-->
              </div>
            </div>
          </div>
          <order-details-card
            v-if="windowSize.x < 600"
            v-model:toggleValue="detailsCardToggle[inputData.props.row.id]"
            :order="currentOrder"
          />
        </q-card>
      </template>
    </entity-index>
    <order-details-dialog
      v-if="windowSize.x >= 600"
      v-model:dialogValue="detailsDialog"
      :order="currentOrder"
    />
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
import { User } from 'src/models/User'
import moment from 'moment-jalaali'
import { Order } from 'src/models/Order'
import OrderDetailsDialog from 'components/MyOrders/OrderDetailsDialog'
import OrderDetailsCard from 'components/MyOrders/OrderDetailsCard'
import { FormBuilder } from 'quasar-form-builder'
export default {
  name: 'MyOrders',
  components: {
    OrderDetailsCard,
    FormBuilder,
    OrderDetailsDialog,
    EntityIndex
  },

  data() {
    return {
      filterExpanded: true,
      inputs: [
        { type: 'hidden', name: 'paymentStatuses', responseKey: 'paymentStatuses', col: 'col-12 col-lg-12 col-sm-6' },
        { type: 'hidden', name: 'since', responseKey: 'since', col: 'col-12 col-lg-12 col-sm-6' },
        { type: 'hidden', name: 'till', responseKey: 'till', col: 'col-12 col-lg-12 col-sm-6' },
        { type: 'hidden', name: 'search', responseKey: 'search', col: 'col-12 col-lg-12 col-sm-6' }
      ],
      filterInputs: [
        {
          selectInput: [
            { type: 'separator', label: 'وضعیت پرداخت', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'paymentStatuses', responseKey: 'paymentStatuses', col: 'col-12 col-lg-12 col-sm-6' }
          ],
          dateInputs: [
            { type: 'separator', label: 'تاریخ سفارش', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'date', name: 'since', responseKey: 'since', col: 'col-sm-6 col-xs-12' },
            { type: 'date', name: 'till', responseKey: 'till', col: 'col-sm-6 col-xs-12' }
          ]
        }
      ],
      searchInputs: [
        { type: 'input', name: 'title', icon: 'search', responseKey: 'data.title', label: '', col: 'col-12', placeholder: ' جستجو...' }
      ],
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره سفارش',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'paymentstatus',
            // name: 'payment_status',
            required: true,
            label: 'وضعیت ‌پرداخت',
            align: 'left',
            field: row => row.paymentstatus.name,
            classes: row => row.paymentstatus.id === 1 ? 'payment-not-okay' : row.paymentstatus.id === 3 ? 'payment-okay' : row.paymentstatus.id === 4 ? 'payment-installment' : ''
          },
          {
            name: 'price',
            required: true,
            label: 'مبلغ',
            align: 'left',
            field: row => row.price
          },
          {
            name: 'completed_at',
            required: true,
            label: 'تاریخ سفارش',
            align: 'left',
            field: row => moment(row.completed_at, 'YYYY-M-D').format('jYYYY/jMM/jDD')
          },
          {
            name: 'details',
            required: true,
            label: 'جزئیات',
            align: 'left',
            field: row => row.actions
          }
        ],
        data: []
      },
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'page'
      },
      currentOrder: new Order(),
      detailsDialog: false,
      detailsCardToggle: {},
      hasUserOrdered: true,
      firstRowPassed: false
    }
  },
  created() {
  },
  computed: {
    user() {
      if (this.$store.getters['Auth/user']) {
        return this.$store.getters['Auth/user']
      }
      return new User()
    },
    getEntityApi() {
      return API_ADDRESS.user.getOrderList(this.user.id)
      // return API_ADDRESS.exam.base(1)
    },
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    },
    getCurrentOrderCompletedAt() {
      return (CompletedAt) => {
        return moment(CompletedAt, 'YYYY-M-D').format('jYYYY/jMM/jDD')
      }
    }
  },
  methods: {
    showDetailsDialog(rowData) {
      this.currentOrder = new Order(rowData)
      this.detailsDialog = true
    },
    toggleDetailsCard(rowData) {
      if (!this.detailsCardToggle[rowData.id]) {
        this.currentOrder = new Order(rowData)
      }
      this.detailsCardToggle[rowData.id] = !this.detailsCardToggle[rowData.id]
    },
    setHasUserOrderedValue(rowData) {
      if (this.firstRowPassed) {
        return
      }
      if (rowData.id) {
        this.hasUserOrdered = true
      }
      this.firstRowPassed = true
    },
    getRemoveMessage(row) {
      const title = row.title
      return 'آیا از حذف ' + title + ' اطمینان دارید؟'
    },
    toman (key = 500000, suffix) {
      if (key) {
        let string = key.toLocaleString('fa')
        if (typeof suffix === 'undefined' || suffix) {
          string += ' تومان '
        }
        return string
      }
    }
  }
}
</script>

<style scoped lang="scss">
.filter-toggle{
  color:#6D708B;
}
.gray-bg{
  background: #E4E8EF;
}
.expand-filter{
  &:deep(.q-item-type){
    display: none;
  }
  .filter-items{
    font-weight: 400!important;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: -0.03em;
    color: #434765;
    margin-bottom: 15px;
    position: relative;
    .action-btn{
      @media screen and (max-width: 1439px) {
        position: absolute;
        bottom: 0;
        margin-top:10px;
      }
      @media screen and (max-width: 599px){
        position: relative;
      }
    }
    .select-input{
      @media screen and (max-width: 1439px) {
          order: 2;
      }
    }
    .filter-inputs{
      @media screen and (max-width: 1439px) {
        order: 1;
      }
    }
    .filter-btn{
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
      color: #FFFFFF;
    }
    .reload-icon{
      color: #6D708B;
      margin-right: 16px;
    }
  }
}
.search-input{
  width: 330px;
  height: 40px;
  border-radius: 8px;
  border: none;
  &:deep(.q-field__control){
    border-radius: 8px;
    border: none;
  }
  &:deep(.q-field__append){
    color: #6D708B;
  }
}
.my-orders-list {
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    text-align: left;
    color: #434765;
    padding-bottom: 24px;
  }

  .payment-okay {
    color: #4CAF50;
  }

  .payment-not-okay {
    color: #E86562;
  }

  .payment-installment {
    color: #8ED6FF;
  }

  :deep(.quasar-crud-index-table) {
    padding: 0 !important;

    .q-table__container {
      background: #FFFFFF;
      box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
      border-radius: 16px;

      .q-table__middle {
        //.q-table {
        table {
          font-weight: 400;
          font-size: 16px;
          line-height: 25px;
          letter-spacing: -0.03em;
          color: #6D708B;

          th {
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            color: #6D708B;
          }

          tr {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: #434765;

            &:nth-child(2n) {
              background: #F6F9FF;
            }

            :not(:last-child) > td {
              border-bottom-width: 0 !important;
            }
          }
        }

        //}
      }
      .q-table__grid-content {
        flex-direction: column;
      }
    }

    .q-table__top {
      display: none !important;
    }

    @media screen and (max-width: 600px) {
      .q-table__card {
        box-shadow: none;
        border-bottom: 1px solid #E4E8EF;
        padding: 16px 20px;
      }

      .q-table__grid-item {
        padding: 0;
        .q-table__grid-item-row {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  .details-dialog {
    background: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};
    border-radius: 16px;
  }

  .details-table-mobile {
      box-shadow: none;
      border-radius: 0;
    border-bottom: 1px solid #E4E8EF;

    .details-info {
      padding: 15px 20px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      text-align: left;
      letter-spacing: -0.03em;
      display: flex;
      justify-content: space-between;
      .first-col {
        color: #6D708B;
        div {
          padding-top: 5px;
          padding-bottom: 5px;
        }
        .order {
          .order-id {
            padding-left: 8px;
          }
        }
      }
      .second-col {
        text-align: right;
        div {
          padding-top: 5px;
          padding-bottom: 5px;
        }
        .details-btn {
          color:#8075DC ;
        }
        //:deep(.q-btn) {
        //  .q-btn__content {
        //    margin: 0;
        //  }
        //}
      }
    }
  }
}
.empty-order-list {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 37px;
  text-align: center;
  color: #6D708B;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  //.q-img
  .list-text {
    @media screen and (max-width: 1439px) {
      font-size: 22px;
      line-height: 34px;
      text-align: center;
      color: #6D708B;
    }
  }
  .image {
    width: 290px;
    height: 290px;
    margin-bottom: 60px;
    @media screen and (max-width: 1439px) {
      width: 230px;
      height: 230px;
      margin-bottom: 48px;
    }
    @media screen and (max-width: 1023px) {
      width: 290px;
      height: 290px;
    }
    @media screen and (max-width: 599px) {
      width: 200px;
      height: 200px;
      margin-bottom: 40px;
    }
  }
  .back-to-shop-btn {
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #8075DC;
    @media screen and (max-width: 599px) {
      font-size: 14px;
      line-height: 22px;
      color: #8075DC;
    }
  }
}
</style>
