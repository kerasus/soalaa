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
          :to="{name:'landing1'}"
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
      class="orders-list-entity-index"
      title="سفارش های من"
      :api="getEntityApi"
      :table="table"
      :table-keys="tableKeys"
      :default-layout="false"
      :table-grid-size="$q.screen.lt.sm"
      :create-route-name="'Admin.Exam.Create'"
    >
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
                <!--              <q-tooltip anchor="top middle"-->
                <!--                         self="bottom middle">-->
                <!--                مشاهده-->
                <!--              </q-tooltip>-->
                <!--                dksjfhksd-->
                <!--                <div v-if="!detailsCardToggle">-->
                <!--                  جزییات-->
                <!--                  <svg width="16"-->
                <!--                       height="16"-->
                <!--                       viewBox="0 0 16 16"-->
                <!--                       fill="none"-->
                <!--                       xmlns="http://www.w3.org/2000/svg">-->
                <!--                    <path d="M8.00001 11.2C7.53335 11.2 7.06668 11.02 6.71335 10.6667L2.36668 6.31999C2.17335 6.12666 2.17335 5.80666 2.36668 5.61332C2.56001 5.41999 2.88001 5.41999 3.07335 5.61332L7.42001 9.95999C7.74001 10.28 8.26001 10.28 8.58001 9.95999L12.9267 5.61332C13.12 5.41999 13.44 5.41999 13.6333 5.61332C13.8267 5.80666 13.8267 6.12666 13.6333 6.31999L9.28668 10.6667C8.93335 11.02 8.46668 11.2 8.00001 11.2Z"-->
                <!--                          fill="#8075DC" />-->
                <!--                  </svg>-->
                <!--                </div>-->
                <!--                <div v-if="detailsCardToggle">-->
                <!--                  جزییات-->
                <!--                  <svg width="16"-->
                <!--                       height="16"-->
                <!--                       viewBox="0 0 16 16"-->
                <!--                       fill="none"-->
                <!--                       xmlns="http://www.w3.org/2000/svg">-->
                <!--                    <path d="M8.00001 11.2C7.53335 11.2 7.06668 11.02 6.71335 10.6667L2.36668 6.31999C2.17335 6.12666 2.17335 5.80666 2.36668 5.61332C2.56001 5.41999 2.88001 5.41999 3.07335 5.61332L7.42001 9.95999C7.74001 10.28 8.26001 10.28 8.58001 9.95999L12.9267 5.61332C13.12 5.41999 13.44 5.41999 13.6333 5.61332C13.8267 5.80666 13.8267 6.12666 13.6333 6.31999L9.28668 10.6667C8.93335 11.02 8.46668 11.2 8.00001 11.2Z"-->
                <!--                          fill="#8075DC" />-->
                <!--                  </svg>-->
                <!--                </div>-->
              </q-btn>
              <!--               :class="
                  { 'payment-not-okay' : inputData.props.row.paymentstatus.id === 1 ,
                    'payment-okay' : inputData.props.row.paymentstatus.id === 3 ,
                    'payment-installment' : inputData.props.row.paymentstatus.id
                  }"-->
              <div

              >
                پرداخت نشده
                <!--                {{inputData.props.row.paymentstatus.name}}-->
              </div>
              <div>
                <!--                {{ toman(inputData.props.row.price) }}-->
                {{ toman(inputData.props.row.price) }}
              </div>
              <div>
                <!--                {{ getCurrentOrderCompletedAt(inputData.props.row.completed_at) }}-->
                {{ getCurrentOrderCompletedAt('1401/09/25') }}
              </div>
            </div>
          </div>
          <order-details-card
            v-if="windowSize.x < 599"
            v-model:toggleValue="detailsCardToggle[inputData.props.row.id]"
            :order="currentOrder"
          />
        </q-card>
      </template>
    </entity-index>
    <order-details-dialog
      v-if="windowSize.x > 600"
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
export default {
  name: 'MyOrders',
  components: {
    OrderDetailsCard,
    OrderDetailsDialog,
    EntityIndex
  },
  data() {
    return {
      expanded: false,
      table: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره سفارش',
            align: 'left',
            field: row => row.id
          },
          // {
          //   name: 'paymentstatus',
          //   // name: 'payment_status',
          //   required: true,
          //   label: 'وضعیت ‌پرداخت',
          //   align: 'left',
          //   field: row => row.paymentstatus.name,
          //   classes: row => row.paymentstatus.id === 1 ? 'payment-not-okay' : row.paymentstatus.id === 3 ? 'payment-okay' : row.paymentstatus.id === 4 ? 'payment-installment' : ''
          // },
          // {
          //   name: 'price',
          //   required: true,
          //   label: 'مبلغ',
          //   align: 'left',
          //   field: row => row.price
          // },
          // {
          //   name: 'completed_at',
          //   required: true,
          //   label: 'تاریخ سفارش',
          //   align: 'left',
          //   field: row => moment(row.completed_at, 'YYYY-M-D').format('jYYYY/jMM/jDD')
          // },
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
      // currentOrder: new Order(),
      // currentOrder: new Order({
      //   id: 1722713,
      //   discount: 0,
      //   customer_description: null,
      //   price: 24360,
      //   paid_price: 24360,
      //   refund_price: 0,
      //   debt: 0,
      //   orderstatus: {
      //     id: 2,
      //     name: 'ثبت نهایی'
      //   },
      //   paymentstatus: {
      //     id: 3,
      //     name: 'پرداخت شده'
      //   },
      //   orderproducts: [
      //     {
      //       id: 2303303,
      //       quantity: 1,
      //       type: 1,
      //       product: {
      //         id: 361,
      //         redirect_url: null,
      //         type: 1,
      //         category: 'جزوه',
      //         title: 'جزوات حسابان یازدهم با تدریس محمد صادق ثابتی',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/361',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/361'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/pr9_20191010073218.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'محمد صادق ثابتی'
      //             ],
      //             shipping_method: [
      //               'دانلودی'
      //             ],
      //             major: [
      //               'ریاضی'
      //             ],
      //             services: [
      //               'جزوه'
      //             ],
      //             download_date: [
      //               'از لحظه خرید'
      //             ],
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: [
      //               'تاکنون 50 صفحه'
      //             ],
      //             production_year: [
      //               '98-99'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       grand: {
      //         id: 349,
      //         redirect_url: null,
      //         type: 3,
      //         category: null,
      //         title: 'جزوه سوالات مرتبط با دوره های درسی سال 99-98',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/349',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/349'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/j98_99_20200915075432.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'گروه آموزشی'
      //             ],
      //             shipping_method: [
      //               'دانلودی'
      //             ],
      //             major: [
      //               'ریاضی',
      //               'تجربی',
      //               'انسانی'
      //             ],
      //             services: [
      //               'جزوه'
      //             ],
      //             download_date: [
      //               'از لحظه خرید'
      //             ],
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: [
      //               'تاکنون 1110 صفحه'
      //             ],
      //             production_year: [
      //               '98-99'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       price: {
      //         discountDetail: {
      //           productDiscount: 0,
      //           bonDiscount: 0,
      //           productDiscountAmount: 0
      //         },
      //         extraCost: 0,
      //         base: 4872,
      //         discount: 0,
      //         final: 4872
      //       },
      //       photo: 'https://nodes.alaatv.com/upload/images/product/j98_99_20200915075432.jpg',
      //       extra_attributes: null
      //     },
      //     {
      //       id: 2303304,
      //       quantity: 1,
      //       type: 1,
      //       product: {
      //         id: 363,
      //         redirect_url: null,
      //         type: 1,
      //         category: 'جزوه',
      //         title: 'جزوات نکته و تست حسابان کنکور با تدریس محمد صادق ثابتی',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/363',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/363'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/pr16_20191010073252.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'محمد صادق ثابتی'
      //             ],
      //             shipping_method: [
      //               'دانلودی'
      //             ],
      //             major: [
      //               'ریاضی'
      //             ],
      //             services: [
      //               'جزوه'
      //             ],
      //             download_date: [
      //               'از لحظه خرید'
      //             ],
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: [
      //               'تاکنون 126 صفحه'
      //             ],
      //             production_year: [
      //               '98-99'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       grand: {
      //         id: 349,
      //         redirect_url: null,
      //         type: 3,
      //         category: null,
      //         title: 'جزوه سوالات مرتبط با دوره های درسی سال 99-98',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/349',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/349'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/j98_99_20200915075432.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'گروه آموزشی'
      //             ],
      //             shipping_method: [
      //               'دانلودی'
      //             ],
      //             major: [
      //               'ریاضی',
      //               'تجربی',
      //               'انسانی'
      //             ],
      //             services: [
      //               'جزوه'
      //             ],
      //             download_date: [
      //               'از لحظه خرید'
      //             ],
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: [
      //               'تاکنون 1110 صفحه'
      //             ],
      //             production_year: [
      //               '98-99'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       price: {
      //         discountDetail: {
      //           productDiscount: 0,
      //           bonDiscount: 0,
      //           productDiscountAmount: 0
      //         },
      //         extraCost: 0,
      //         base: 4872,
      //         discount: 0,
      //         final: 4872
      //       },
      //       photo: 'https://nodes.alaatv.com/upload/images/product/j98_99_20200915075432.jpg',
      //       extra_attributes: null
      //     },
      //     {
      //       id: 2303305,
      //       quantity: 1,
      //       type: 1,
      //       product: {
      //         id: 365,
      //         redirect_url: null,
      //         type: 1,
      //         category: 'جزوه',
      //         title: 'جزوات هندسه کامل کنکور با تدریس محمد صادق ثابتی',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/365',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/365'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/pr10_20191010073340.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'محمد صادق ثابتی'
      //             ],
      //             shipping_method: [
      //               'دانلودی'
      //             ],
      //             major: [
      //               'ریاضی'
      //             ],
      //             services: [
      //               'جزوه'
      //             ],
      //             download_date: [
      //               'از لحظه خرید'
      //             ],
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: [
      //               'تاکنون 45 صفحه'
      //             ],
      //             production_year: [
      //               '98-99'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       grand: {
      //         id: 349,
      //         redirect_url: null,
      //         type: 3,
      //         category: null,
      //         title: 'جزوه سوالات مرتبط با دوره های درسی سال 99-98',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/349',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/349'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/j98_99_20200915075432.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'گروه آموزشی'
      //             ],
      //             shipping_method: [
      //               'دانلودی'
      //             ],
      //             major: [
      //               'ریاضی',
      //               'تجربی',
      //               'انسانی'
      //             ],
      //             services: [
      //               'جزوه'
      //             ],
      //             download_date: [
      //               'از لحظه خرید'
      //             ],
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: [
      //               'تاکنون 1110 صفحه'
      //             ],
      //             production_year: [
      //               '98-99'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       price: {
      //         discountDetail: {
      //           productDiscount: 0,
      //           bonDiscount: 0,
      //           productDiscountAmount: 0
      //         },
      //         extraCost: 0,
      //         base: 4872,
      //         discount: 0,
      //         final: 4872
      //       },
      //       photo: 'https://nodes.alaatv.com/upload/images/product/j98_99_20200915075432.jpg',
      //       extra_attributes: null
      //     },
      //     {
      //       id: 2303306,
      //       quantity: 1,
      //       type: 1,
      //       product: {
      //         id: 367,
      //         redirect_url: null,
      //         type: 1,
      //         category: 'جزوه',
      //         title: 'جزوات گسسته با تدریس محمد صادق ثابتی',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/367',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/367'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/pr11_20191010073417.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'محمد صادق ثابتی'
      //             ],
      //             shipping_method: [
      //               'دانلودی'
      //             ],
      //             major: [
      //               'ریاضی'
      //             ],
      //             services: [
      //               'جزوه'
      //             ],
      //             download_date: [
      //               'از لحظه خرید'
      //             ],
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: [
      //               'تاکنون 29 صفحه'
      //             ],
      //             production_year: [
      //               '98-99'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       grand: {
      //         id: 349,
      //         redirect_url: null,
      //         type: 3,
      //         category: null,
      //         title: 'جزوه سوالات مرتبط با دوره های درسی سال 99-98',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/349',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/349'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/j98_99_20200915075432.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'گروه آموزشی'
      //             ],
      //             shipping_method: [
      //               'دانلودی'
      //             ],
      //             major: [
      //               'ریاضی',
      //               'تجربی',
      //               'انسانی'
      //             ],
      //             services: [
      //               'جزوه'
      //             ],
      //             download_date: [
      //               'از لحظه خرید'
      //             ],
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: [
      //               'تاکنون 1110 صفحه'
      //             ],
      //             production_year: [
      //               '98-99'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       price: {
      //         discountDetail: {
      //           productDiscount: 0,
      //           bonDiscount: 0,
      //           productDiscountAmount: 0
      //         },
      //         extraCost: 0,
      //         base: 4872,
      //         discount: 0,
      //         final: 4872
      //       },
      //       photo: 'https://nodes.alaatv.com/upload/images/product/j98_99_20200915075432.jpg',
      //       extra_attributes: null
      //     },
      //     {
      //       id: 2303307,
      //       quantity: 1,
      //       type: 1,
      //       product: {
      //         id: 369,
      //         redirect_url: null,
      //         type: 1,
      //         category: 'جزوه',
      //         title: 'جزوات زبان دهم با تدریس علی اکبر عزتی',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/369',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/369'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/pr12_20191010073500.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'عزتی'
      //             ],
      //             shipping_method: [
      //               'دانلودی'
      //             ],
      //             major: [
      //               'ریاضی',
      //               'تجربی',
      //               'انسانی'
      //             ],
      //             services: [
      //               'جزوه'
      //             ],
      //             download_date: [
      //               'از لحظه خرید'
      //             ],
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: [
      //               '57 صفحه'
      //             ],
      //             production_year: [
      //               '98-99'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       grand: {
      //         id: 349,
      //         redirect_url: null,
      //         type: 3,
      //         category: null,
      //         title: 'جزوه سوالات مرتبط با دوره های درسی سال 99-98',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/349',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/349'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/j98_99_20200915075432.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'گروه آموزشی'
      //             ],
      //             shipping_method: [
      //               'دانلودی'
      //             ],
      //             major: [
      //               'ریاضی',
      //               'تجربی',
      //               'انسانی'
      //             ],
      //             services: [
      //               'جزوه'
      //             ],
      //             download_date: [
      //               'از لحظه خرید'
      //             ],
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: [
      //               'تاکنون 1110 صفحه'
      //             ],
      //             production_year: [
      //               '98-99'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       price: {
      //         discountDetail: {
      //           productDiscount: 0,
      //           bonDiscount: 0,
      //           productDiscountAmount: 0
      //         },
      //         extraCost: 0,
      //         base: 4872,
      //         discount: 0,
      //         final: 4872
      //       },
      //       photo: 'https://nodes.alaatv.com/upload/images/product/j98_99_20200915075432.jpg',
      //       extra_attributes: null
      //     }
      //   ],
      //   coupon_info: null,
      //   successful_transactions: [
      //     {
      //       wallet_id: 218041,
      //       order_id: 1722713,
      //       cost: 24360,
      //       transactionID: null,
      //       trace_number: null,
      //       refrence_number: null,
      //       paycheck_number: null,
      //       paymentmethod: {
      //         name: 'wallet',
      //         display_name: 'کیف پول',
      //         id: 5
      //       },
      //       transactiongateway: null,
      //       transactionstatus: {
      //         name: 'موفق',
      //         id: 3
      //       },
      //       created_at: '2022-09-03 13:33:55',
      //       completed_at: '2022-09-03 18:03:55',
      //       deadline_at: null
      //     }
      //   ],
      //   pending_transactions: null,
      //   unpaid_transaction: null,
      //   posting_info: null,
      //   user: {
      //     id: 219548,
      //     first_name: 'علی',
      //     last_name: 'اسماعیلی',
      //     mobile: '09358745928',
      //     national_code: '0014258269',
      //     profile_completion: 77
      //   },
      //   created_at: '2022-05-15 13:26:58',
      //   completed_at: '2022-09-03 18:03:55'
      // }),
      currentOrder: new Order({
        id: 416466,
        discount: 0,
        customer_description: null,
        price: 7000,
        paid_price: 7000,
        refund_price: 0,
        debt: 0,
        orderstatus: {
          id: 2,
          name: 'ثبت نهایی'
        },
        paymentstatus: {
          id: 3,
          name: 'پرداخت شده'
        },
        orderproducts: [
          {
            id: 353571,
            quantity: 1,
            type: 1,
            product: {
              id: 294,
              redirect_url: null,
              type: 1,
              category: 'VIP',
              title: 'ال...ماس عربی دوازدهم کنکور',
              is_free: 0,
              url: {
                web: 'http://office.alaa.tv:8080/product/294',
                api: 'http://office.alaa.tv:8080/api/v2/product/294'
              },
              photo: 'https://nodes.alaatv.com/upload/images/product/A58_20190513140213.jpg',
              attributes: {
                info: {
                  teacher: [
                    'واحد تخته نگار آلاء'
                  ],
                  shipping_method: [
                    'دانلودی'
                  ],
                  major: [
                    'ریاضی',
                    'تجربی',
                    'انسانی'
                  ],
                  services: [
                    'فیلم',
                    'جزوه'
                  ],
                  download_date: [
                    'از لحظه خرید'
                  ],
                  educational_system: [
                    'نظام جدید'
                  ],
                  duration: [
                    '2 ساعت'
                  ],
                  production_year: [
                    '97-98'
                  ]
                },
                extra: null
              },
              redirect_code: null
            },
            grand: null,
            price: {
              discountDetail: {
                productDiscount: 0,
                bonDiscount: 0,
                productDiscountAmount: 0
              },
              extraCost: 0,
              base: 14000,
              discount: 0,
              final: 14000
            },
            photo: 'https://nodes.alaatv.com/upload/images/product/A58_20190513140213.jpg',
            extra_attributes: null
          }
        ],
        coupon_info: {
          name: 'طلایی',
          code: 'talaee',
          discount: 50,
          coupontype: {
            name: 'overall',
            display_name: 'کلی'
          },
          discounttype: {
            name: 'percentage',
            display_name: 'درصد'
          }
        },
        successful_transactions: [
          {
            wallet_id: 218041,
            order_id: 416466,
            cost: 7000,
            transactionID: null,
            trace_number: null,
            refrence_number: null,
            paycheck_number: null,
            paymentmethod: {
              name: 'wallet',
              display_name: 'کیف پول',
              id: 5
            },
            transactiongateway: null,
            transactionstatus: {
              name: 'موفق',
              id: 3
            },
            created_at: '2019-06-24 14:27:38',
            completed_at: '2019-06-24 18:57:38',
            deadline_at: null
          }
        ],
        pending_transactions: null,
        unpaid_transaction: null,
        posting_info: null,
        user: {
          id: 219548,
          first_name: 'علی',
          last_name: 'اسماعیلی',
          mobile: '09358745928',
          national_code: '0014258269',
          profile_completion: 77
        },
        created_at: '2019-06-23 11:01:02',
        completed_at: '2019-06-24 14:27:38'
      }),
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
      // return API_ADDRESS.user.getOrderList(this.user.id)
      return API_ADDRESS.exam.base(1)
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
      // this.currentOrder = new Order(rowData)
      this.currentOrder = new Order({
        id: 416466,
        discount: 0,
        customer_description: null,
        price: 7000,
        paid_price: 7000,
        refund_price: 0,
        debt: 0,
        orderstatus: {
          id: 2,
          name: 'ثبت نهایی'
        },
        paymentstatus: {
          id: 3,
          name: 'پرداخت شده'
        },
        orderproducts: [
          {
            id: 353571,
            quantity: 1,
            type: 1,
            product: {
              id: 294,
              redirect_url: null,
              type: 1,
              category: 'VIP',
              title: 'ال...ماس عربی دوازدهم کنکور',
              is_free: 0,
              url: {
                web: 'http://office.alaa.tv:8080/product/294',
                api: 'http://office.alaa.tv:8080/api/v2/product/294'
              },
              photo: 'https://nodes.alaatv.com/upload/images/product/A58_20190513140213.jpg',
              attributes: {
                info: {
                  teacher: [
                    'واحد تخته نگار آلاء'
                  ],
                  shipping_method: [
                    'دانلودی'
                  ],
                  major: [
                    'ریاضی',
                    'تجربی',
                    'انسانی'
                  ],
                  services: [
                    'فیلم',
                    'جزوه'
                  ],
                  download_date: [
                    'از لحظه خرید'
                  ],
                  educational_system: [
                    'نظام جدید'
                  ],
                  duration: [
                    '2 ساعت'
                  ],
                  production_year: [
                    '97-98'
                  ]
                },
                extra: null
              },
              redirect_code: null
            },
            grand: null,
            price: {
              discountDetail: {
                productDiscount: 0,
                bonDiscount: 0,
                productDiscountAmount: 0
              },
              extraCost: 0,
              base: 14000,
              discount: 0,
              final: 14000
            },
            photo: 'https://nodes.alaatv.com/upload/images/product/A58_20190513140213.jpg',
            extra_attributes: null
          }
        ],
        coupon_info: {
          name: 'طلایی',
          code: 'talaee',
          discount: 50,
          coupontype: {
            name: 'overall',
            display_name: 'کلی'
          },
          discounttype: {
            name: 'percentage',
            display_name: 'درصد'
          }
        },
        successful_transactions: [
          {
            wallet_id: 218041,
            order_id: 416466,
            cost: 7000,
            transactionID: null,
            trace_number: null,
            refrence_number: null,
            paycheck_number: null,
            paymentmethod: {
              name: 'wallet',
              display_name: 'کیف پول',
              id: 5
            },
            transactiongateway: null,
            transactionstatus: {
              name: 'موفق',
              id: 3
            },
            created_at: '2019-06-24 14:27:38',
            completed_at: '2019-06-24 18:57:38',
            deadline_at: null
          }
        ],
        pending_transactions: null,
        unpaid_transaction: null,
        posting_info: null,
        user: {
          id: 219548,
          first_name: 'علی',
          last_name: 'اسماعیلی',
          mobile: '09358745928',
          national_code: '0014258269',
          profile_completion: 77
        },
        created_at: '2019-06-23 11:01:02',
        completed_at: '2019-06-24 14:27:38'
      })
      this.detailsDialog = true
    },
    toggleDetailsCard(rowData) {
      // this.currentOrder = new Order(rowData)
      if (!this.detailsCardToggle[rowData.id]) {
        this.currentOrder = new Order({
          id: 416466,
          discount: 0,
          customer_description: null,
          price: 7000,
          paid_price: 7000,
          refund_price: 0,
          debt: 0,
          orderstatus: {
            id: 2,
            name: 'ثبت نهایی'
          },
          paymentstatus: {
            id: 3,
            name: 'پرداخت شده'
          },
          orderproducts: [
            {
              id: 353571,
              quantity: 1,
              type: 1,
              product: {
                id: 294,
                redirect_url: null,
                type: 1,
                category: 'VIP',
                title: 'ال...ماس عربی دوازدهم کنکور',
                is_free: 0,
                url: {
                  web: 'http://office.alaa.tv:8080/product/294',
                  api: 'http://office.alaa.tv:8080/api/v2/product/294'
                },
                photo: 'https://nodes.alaatv.com/upload/images/product/A58_20190513140213.jpg',
                attributes: {
                  info: {
                    teacher: [
                      'واحد تخته نگار آلاء'
                    ],
                    shipping_method: [
                      'دانلودی'
                    ],
                    major: [
                      'ریاضی',
                      'تجربی',
                      'انسانی'
                    ],
                    services: [
                      'فیلم',
                      'جزوه'
                    ],
                    download_date: [
                      'از لحظه خرید'
                    ],
                    educational_system: [
                      'نظام جدید'
                    ],
                    duration: [
                      '2 ساعت'
                    ],
                    production_year: [
                      '97-98'
                    ]
                  },
                  extra: null
                },
                redirect_code: null
              },
              grand: null,
              price: {
                discountDetail: {
                  productDiscount: 0,
                  bonDiscount: 0,
                  productDiscountAmount: 0
                },
                extraCost: 0,
                base: 14000,
                discount: 0,
                final: 14000
              },
              photo: 'https://nodes.alaatv.com/upload/images/product/A58_20190513140213.jpg',
              extra_attributes: null
            }
          ],
          coupon_info: {
            name: 'طلایی',
            code: 'talaee',
            discount: 50,
            coupontype: {
              name: 'overall',
              display_name: 'کلی'
            },
            discounttype: {
              name: 'percentage',
              display_name: 'درصد'
            }
          },
          successful_transactions: [
            {
              wallet_id: 218041,
              order_id: 416466,
              cost: 7000,
              transactionID: null,
              trace_number: null,
              refrence_number: null,
              paycheck_number: null,
              paymentmethod: {
                name: 'wallet',
                display_name: 'کیف پول',
                id: 5
              },
              transactiongateway: null,
              transactionstatus: {
                name: 'موفق',
                id: 3
              },
              created_at: '2019-06-24 14:27:38',
              completed_at: '2019-06-24 18:57:38',
              deadline_at: null
            }
          ],
          pending_transactions: null,
          unpaid_transaction: null,
          posting_info: null,
          user: {
            id: 219548,
            first_name: 'علی',
            last_name: 'اسماعیلی',
            mobile: '09358745928',
            national_code: '0014258269',
            profile_completion: 77
          },
          created_at: '2019-06-23 11:01:02',
          completed_at: '2019-06-24 14:27:38'
        })
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
