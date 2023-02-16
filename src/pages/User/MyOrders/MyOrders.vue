<template>
  <div v-if="loading"
       class="flex justify-center q-mt-xl">
    <q-spinner-ball
      color="primary"
      size="2em"
    />
  </div>
  <template v-if="!loading">
    <div style="display: none"> {{windowSize}}</div>
    <div v-if="!hasUserOrdered">
      <div class="empty-order-list">
        <q-img class="image"
               :src="'https://nodes.alaatv.com/aaa/landing/Soalaa/States/empty_orders.png'"
        />
        <div class="list-text">
          لیست سفارش‌های شما خالی است!
        </div>
        <div class="back-to-shop">
          <q-btn class="back-to-shop-btn"
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
      <div class="title">
        سفارش های من</div>
      <entity-index
        ref="orderList"
        v-model:value="inputs"
        class="orders-list-entity-index"
        title="سفارش های من"
        :api="getEntityApi"
        :table="table"
        :table-keys="tableKeys"
        :default-layout="false"
        :table-grid-size="$q.screen.lt.md"
        :create-route-name="'Admin.Exam.Create'"
        @onPageChanged="onPageChange"
      >
        <template v-slot:before-index-table="">
          <div class="row items-center search-box">
            <div class="col-lg-4 col-xl-4 col-sm-6 col-xs-9 text-left">
              <q-input v-model="searchInput"
                       filled
                       placeholder="جستجو..."
                       class="search-input bg-white">
                <template v-slot:append>
                  <q-icon name="isax:search-normal-1"
                          class="search-icon"
                          @click="filterFormBuilderData" />
                </template>
              </q-input>
            </div>
            <div class="col-lg-8 col-xl-8 col-sm-6 col-xs-3 text-right">
              <q-btn unelevated
                     class="filter-toggle"
                     :class="filterExpanded? 'gray-bg': 'bg-white'"
                     icon="isax:filter"
                     @click="filterExpanded = !filterExpanded" />
            </div>
          </div>
          <q-expansion-item v-model="filterExpanded"
                            icon="perm_identity"
                            class="expand-filter"
                            label="Account settings"
                            caption="John Doe"
          >
            <div class="row filter-items">
              <div class="col-12">
                <form-builder ref="filterSlot"
                              :value="filterInputs"
                              @onClick="onClickFilterFormBuilder"
                />
              </div>
            </div>
          </q-expansion-item>
        </template>
        <template #entity-index-table-cell="{props, col}">
          <template v-if="col.name === 'details'">
            <q-btn round
                   flat
                   dense
                   size="md"
                   @click="showDetailsDialog(props.row)"
            >
              <!--              <q-tooltip anchor="top middle"-->
              <!--                         self="bottom middle">-->
              <!--                مشاهده-->
              <!--              </q-tooltip>-->
              <svg width="24"
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
            {{ col.value }}
          </template>
        </template>
        <template v-slot:table-item-cell="{inputData}">
          <q-card class="details-table-mobile">
            <div class="details-info">
              <div class="item">
                <div class="order first-col-item">
                  شماره سفارش:
                  <span class="order-id">{{inputData.props.row.id}}</span>
                </div>
                <div
                  class="details-btn toggle"
                  @click="toggleDetailsCard(inputData.props.row)"
                >
                  جزئیات
                  <q-icon color="primary"
                          :name="detailsCardToggle[inputData.props.row.id] ? 'isax:arrow-up-2' : 'isax:arrow-down-1' " />
                </div>
                <div
                  class="details-btn dialog"
                  @click="showDetailsDialog(inputData.props.row)"
                >
                  مشاهده جزییات
                </div>
              </div>
              <div class="item">
                <div class="first-col-item">وضعیت پرداخت:</div>
                <div
                  :class="{ 'payment-not-okay' : inputData.props.row.paymentstatus.id === 1 ,
                            'payment-okay' : inputData.props.row.paymentstatus.id === 3 ,
                            'payment-installment' : inputData.props.row.paymentstatus.id === 4 }"
                >
                  <!--                پرداخت نشده-->
                  {{inputData.props.row.paymentstatus.name}}
                </div>
              </div>
              <div class="item">
                <div class="first-col-item">مبلغ:</div>
                <div class="value">
                  {{inputData.props.row.price ? toman(inputData.props.row.price) : 0 }}
                </div>
              </div>
              <div class="item">
                <div class="first-col-item">تاریخ سفارش:</div>
                <div class="value">
                  {{ getCurrentOrderCompletedAt(inputData.props.row.completed_at) }}
                  <!--                {{ getCurrentOrderCompletedAt('1401/09/25') }}-->
                </div>
              </div>
              <!--              <div class="first-col">-->
              <!--                <div class="order first-col-item">-->
              <!--                  شماره سفارش:-->
              <!--                  <span class="order-id">{{inputData.props.row.id}}</span>-->
              <!--                </div>-->
              <!--                <div class="first-col-item">وضعیت پرداخت:</div>-->
              <!--                <div class="first-col-item">مبلغ:</div>-->
              <!--                <div class="first-col-item">تاریخ سفارش:</div>-->
              <!--              </div>-->
              <!--              <div class="second-col">-->
              <!--                <q-btn round-->
              <!--                       flat-->
              <!--                       dense-->
              <!--                       size="md"-->
              <!--                       class="details-btn"-->
              <!--                       @click="toggleDetailsCard(inputData.props.row)"-->
              <!--                >-->
              <!--                  جزئیات-->
              <!--                  <q-icon color="primary"-->
              <!--                          :name="detailsCardToggle[inputData.props.row.id] ? 'isax:arrow-up-2' : 'isax:arrow-down-1' " />-->
              <!--                </q-btn>-->
              <!--                <div class="min-h"-->
              <!--                     :class="{ 'payment-not-okay' : inputData.props.row.paymentstatus.id === 1 ,-->
              <!--                               'payment-okay' : inputData.props.row.paymentstatus.id === 3 ,-->
              <!--                               'payment-installment' : inputData.props.row.paymentstatus.id === 4 }"-->
              <!--                >-->
              <!--                  &lt;!&ndash;                پرداخت نشده&ndash;&gt;-->
              <!--                  {{inputData.props.row.paymentstatus.name}}-->
              <!--                </div>-->
              <!--                <div class="min-h">-->
              <!--                  {{inputData.props.row.price ? toman(inputData.props.row.price) : 0 }}-->
              <!--                </div>-->
              <!--                <div class="min-h">-->
              <!--                  {{ getCurrentOrderCompletedAt(inputData.props.row.completed_at) }}-->
              <!--                  &lt;!&ndash;                {{ getCurrentOrderCompletedAt('1401/09/25') }}&ndash;&gt;-->
              <!--                </div>-->
              <!--              </div>-->
            </div>
            <order-details-card v-if="windowSize.x < 600"
                                v-model:toggleValue="detailsCardToggle[inputData.props.row.id]"
                                :order="currentOrder"
            />
          </q-card>
        </template>
      </entity-index>
    </div>
    <order-details-dialog v-if="windowSize.x >= 600"
                          v-model:dialogValue="detailsDialog"
                          :order="currentOrder"
    />
  </template>

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
import ActionBtn from 'pages/User/MyOrders/actionBtn'
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
      loading: true,
      isFirstReq: true,
      filterExpanded: false,
      inputs: [
        { type: 'hidden', name: 'paymentStatuses', class: '', responseKey: 'paymentStatuses', col: 'col-12 col-lg-12 col-sm-6' },
        { type: 'hidden', name: 'since', responseKey: 'since', col: 'col-12 col-lg-12 col-sm-6' },
        { type: 'hidden', name: 'till', responseKey: 'till', col: 'col-12 col-lg-12 col-sm-6' },
        { type: 'hidden', name: 'search', responseKey: 'search', col: 'col-12 col-lg-12 col-sm-6' }
      ],
      filterInputs: [
        { type: 'select', name: 'paymentStatuses', dropdownIcon: 'isax:arrow-down-1', optionValue: 'id', optionLabel: 'name', responseKey: 'paymentStatuses', multiple: true, label: 'وضعیت پرداخت', placeholder: ' ', col: 'filter-option col-sm-6 col-lg-4 col-xs-12' },
        { type: 'date', name: 'since', responseKey: 'since', label: 'تاریخ سفارش', placeholder: ' از', calendarIcon: ' ', col: 'col-lg-3 col-sm-6 col-xs-12' },
        { type: 'date', name: 'till', label: ' ', placeholder: 'تا', calendarIcon: ' ', responseKey: 'till', col: 'col-lg-3 col-sm-6 col-xs-12' },
        { type: ActionBtn, name: 'ActionBtn', col: 'col-lg-2 col-sm-6 col-xs-12' }
      ],
      searchInput: '',
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
    this.getPaymentStatus()
  },
  watch: {
    till(value) {
      this.updateInputsValue('till', value)
    },
    since(value) {
      this.updateInputsValue('since', value)
    },
    paymentStatus (value) {
      this.updateInputsValue('paymentStatuses', value)
    },
    searchInput(value) {
      this.updateInputsValue('search', value)
    }
  },
  computed: {
    user() {
      if (this.$store.getters['Auth/user']) {
        return this.$store.getters['Auth/user']
      }
      return new User()
    },
    paymentStatus() {
      return this.getInput('filterInputs', 'paymentStatuses').value
    },
    since() {
      return this.getInput('filterInputs', 'since').value
    },
    till() {
      return this.getInput('filterInputs', 'till').value
    },
    getEntityApi() {
      return API_ADDRESS.user.orders.userOrders
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
    onPageChange(response) {
      if (!this.isFirstReq) {
        return
      }
      this.hasUserOrdered = response.data.data.length > 0
      this.isFirstReq = false
    },
    onClickFilterFormBuilder (data) {
      data.event === 'reload' ? this.reloadFilterData() : this.filterFormBuilderData()
    },

    reloadFilterData() {
      if (this.$refs.filterSlot) {
        this.$refs.filterSlot.clearFormBuilderInputValues()
      }
      this.searchInput = ''
      // need to $nextTick
      this.$nextTick(() => {
        if (this.$refs.orderList) {
          this.$refs.orderList.reload()
        }
      })
    },

    filterFormBuilderData() {
      if (!this.$refs.orderList) {
        return
      }
      this.$refs.orderList.search()
    },
    updateInputsValue(name, newValue) {
      const input = this.getInput('inputs', name)
      input.value = newValue
    },
    getInput(src, name) {
      return this[src].find(item => item.name === name)
    },
    async getPaymentStatus() {
      const response = await this.$axios.get(API_ADDRESS.user.orders.status)
      this.loading = false
      this.getInput('filterInputs', 'paymentStatuses').options = response.data.data
    },
    filterTable() {
      // if (!this.$refs.filterSlot) {
      //   return
      // }
      // const inputsData = this.$refs.filterSlot.getValues()
    },
    resetData() {
      if (!this.$refs.orderList) {
        return
      }

      this.$refs.orderList.clearData()
    },
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
      this.firstRowPassed = false
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
.search-box{
  margin-bottom: 20px;
  @media  screen and (max-width: 599px){
      margin-bottom: 20px;
  }
}
.expand-filter{
  &:deep(.q-item-type){
    display: none;
  }
  .filter-option{

  }
  .filter-items{
    font-weight: 400!important;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: -0.03em;
    color: #434765;
    margin-bottom: 30px;
    position: relative;
    @media screen and (max-width: 1439px){
      margin-bottom: 24px;
    }

    @media screen and (max-width: 599px){
      margin-bottom: 20px;
    }

    &:deep(.filter-option){
      .outsideLabel{
        padding-bottom: 8px;
      }
      @media screen and (max-width: 1439px) {
        order: 3;
      }
      @media screen and (max-width: 599px) {
        padding-left: 16px;
        padding-right: 0;
      }
    }
    &:deep(.till){
      padding-top: 40px;
      @media screen and (max-width: 599px) {
        padding: 1px;
      }
    }
    &:deep(.since){
      .outsideLabel{
        padding-bottom: 8px;
      }
      &:deep(.q-icon){
        &::before{
          content: '';
        }
      }
      @media screen and (max-width: 599px) {
        padding: 1px 1px 8px;
      }
      @media screen and (max-width: 1439px) {

      }
    }
    &:deep(.formBuilder-actionBtn-ActionBtn){
      @media screen and (max-width: 1439px){
        text-align: right;
        order:3
      }
    }
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
  background-color: white;
  //border-radius: 8px;
  //border: none;
  &:deep(.q-field__append){
    .q-icon{
      color: #6D708B;
      cursor: pointer;
    }
  }
  .search-icon{

  }
  &:deep(.q-field__control){
    //q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input
    background-color: white;
  }
  &:deep(.q-field__append){

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
    padding-bottom: 40px;
  }
  :deep(.q-table__bottom){
    display: none;
  }
  .quasar-crud-index-table{
    :deep(.q-table){

      tr{
        border: none;
      }
      th{
        border: none;
      }
      td{
        border: none;
      }
    }

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
      @media screen and (max-width: 599px) {
        //padding-bottom: 20px;
      }

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
            padding: 23px 40px;
            @media screen and (max-width: 1439px){
              padding: 20px 30px;
            }
          }

          tbody{
            tr{
              &:nth-child(2n + 1) {
                background: #F6F9FF;
                border-radius: 16px;
              }
            }
          }

          tr {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: #434765;
            td{
              padding: 10px 40px;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              letter-spacing: -0.03em;
              @media screen and (max-width: 1439px){
                padding: 2px 30px;
              }
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
    &:last-child{
      border-radius: 16px;
      border-bottom: none;
    }
    &:first-child{
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    .details-info {
      padding: 15px 20px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
      @media screen and (max-width: 599px){
        padding: 15px 18px;
      }
      .item{
        color: var(--Text-2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        @media screen and (max-width: 599px){
          margin-bottom: 10px;
          font-size: 14px;
          line-height: 22px;
        }
        .value{
          color: var(--Text-1);
        }
        .order {
          .order-id {
            padding-left: 8px;
            color: var(--Text-1);
          }
        }
        .details-btn {
          color:#8075DC ;
          cursor: pointer;
          :deep(.q-icon ){
            font-size: 14px;
            font-weight: 600;
            margin-left: 6px;
          }
          &.dialog{
            @media screen and (max-width: 599px) {
              display: none;
            }
          }
          &.toggle{
            display: none;
            @media screen and (max-width: 599px) {
              display: block;
            }
          }
        }
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
<style>
.q-table thead, .q-table tr, .q-table th, .q-table td {
  border-color: transparent;
}
</style>
