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
    <!--          :api="getEntityApi"-->
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
        <q-card>
          <q-btn round
                 flat
                 dense
                 size="md"
                 @click="showDetailsDialog(inputData.props.row)">
            <!--              <q-tooltip anchor="top middle"-->
            <!--                         self="bottom middle">-->
            <!--                مشاهده-->
            <!--              </q-tooltip>-->
            <svg width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <circle cx="12"
                      cy="6"
                      r="2"
                      fill="#6D708B" />
              <circle cx="12"
                      cy="12"
                      r="2"
                      fill="#6D708B" />
              <circle cx="12"
                      cy="18"
                      r="2"
                      fill="#6D708B" />
            </svg>

          </q-btn>
        </q-card>
      </template>
    </entity-index>
    <order-details-dialog
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
// import { Order } from 'src/models/Order'
// import { Question } from 'src/models/Question'
export default {
  name: 'MyOrders',
  components: {
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
      // currentOrder: null,
      // currentOrder: {
      //   id: 1801136,
      //   discount: 0,
      //   customer_description: null,
      //   price: 0,
      //   paid_price: 0,
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
      //       id: 2268936,
      //       quantity: 1,
      //       type: 2,
      //       product: [
      //         {
      //           price: {
      //             discountDetail: {
      //               productDiscount: 100,
      //               bonDiscount: 0,
      //               productDiscountAmount: 0
      //             },
      //             extraCost: 0,
      //             base: 0,
      //             discount: 0,
      //             final: 0
      //           },
      //           id: 772,
      //           redirect_url: null,
      //           type: 1,
      //           category: 'آزمون/سه آ',
      //           title: 'آزمون المپیاد زیست سنجاب دهم',
      //           is_free: 0,
      //           url: {
      //             web: 'http://office.alaa.tv:8080/product/772',
      //             api: 'http://office.alaa.tv:8080/api/v2/product/772'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/photo_2022-07-24_14-03-45_20220724093523.jpg',
      //           attributes: {
      //             info: {
      //               teacher: [
      //                 'گروه مؤلفین'
      //               ],
      //               shipping_method: [
      //                 'آنلاین_مجازی'
      //               ],
      //               major: [
      //                 'تجربی'
      //               ],
      //               services: [
      //                 'آزمون آنلاین/پاسخنامه تصویری/ابر کارنامه/پاسخنامه تشریحی'
      //               ],
      //               download_date: null,
      //               educational_system: [
      //                 'نظام جدید'
      //               ],
      //               duration: null,
      //               production_year: [
      //                 '99-00'
      //               ]
      //             },
      //             extra: null
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           price: {
      //             discountDetail: {
      //               productDiscount: 100,
      //               bonDiscount: 0,
      //               productDiscountAmount: 0
      //             },
      //             extraCost: 0,
      //             base: 0,
      //             discount: 0,
      //             final: 0
      //           },
      //           id: 772,
      //           redirect_url: null,
      //           type: 1,
      //           category: 'آزمون/سه آ',
      //           title: 'آزمون المپیاد زیست سنجاب دهم',
      //           is_free: 0,
      //           url: {
      //             web: 'http://office.alaa.tv:8080/product/772',
      //             api: 'http://office.alaa.tv:8080/api/v2/product/772'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/photo_2022-07-24_14-03-45_20220724093523.jpg',
      //           attributes: {
      //             info: {
      //               teacher: [
      //                 'گروه مؤلفین'
      //               ],
      //               shipping_method: [
      //                 'آنلاین_مجازی'
      //               ],
      //               major: [
      //                 'تجربی'
      //               ],
      //               services: [
      //                 'آزمون آنلاین/پاسخنامه تصویری/ابر کارنامه/پاسخنامه تشریحی'
      //               ],
      //               download_date: null,
      //               educational_system: [
      //                 'نظام جدید'
      //               ],
      //               duration: null,
      //               production_year: [
      //                 '99-00'
      //               ]
      //             },
      //             extra: null
      //           },
      //           redirect_code: null
      //         },
      //         {
      //           price: {
      //             discountDetail: {
      //               productDiscount: 100,
      //               bonDiscount: 0,
      //               productDiscountAmount: 0
      //             },
      //             extraCost: 0,
      //             base: 0,
      //             discount: 0,
      //             final: 0
      //           },
      //           id: 772,
      //           redirect_url: null,
      //           type: 1,
      //           category: 'آزمون/سه آ',
      //           title: 'آزمون المپیاد زیست سنجاب دهم',
      //           is_free: 0,
      //           url: {
      //             web: 'http://office.alaa.tv:8080/product/772',
      //             api: 'http://office.alaa.tv:8080/api/v2/product/772'
      //           },
      //           photo: 'https://nodes.alaatv.com/upload/images/product/photo_2022-07-24_14-03-45_20220724093523.jpg',
      //           attributes: {
      //             info: {
      //               teacher: [
      //                 'گروه مؤلفین'
      //               ],
      //               shipping_method: [
      //                 'آنلاین_مجازی'
      //               ],
      //               major: [
      //                 'تجربی'
      //               ],
      //               services: [
      //                 'آزمون آنلاین/پاسخنامه تصویری/ابر کارنامه/پاسخنامه تشریحی'
      //               ],
      //               download_date: null,
      //               educational_system: [
      //                 'نظام جدید'
      //               ],
      //               duration: null,
      //               production_year: [
      //                 '99-00'
      //               ]
      //             },
      //             extra: null
      //           },
      //           redirect_code: null
      //         }],
      //       grand: {
      //         id: 772,
      //         redirect_url: null,
      //         type: 1,
      //         category: 'آزمون/سه آ',
      //         title: 'آزمون المپیاد زیست سنجاب دهم',
      //         is_free: 0,
      //         url: {
      //           web: 'http://office.alaa.tv:8080/product/772',
      //           api: 'http://office.alaa.tv:8080/api/v2/product/772'
      //         },
      //         photo: 'https://nodes.alaatv.com/upload/images/product/photo_2022-07-24_14-03-45_20220724093523.jpg',
      //         attributes: {
      //           info: {
      //             teacher: [
      //               'گروه مؤلفین'
      //             ],
      //             shipping_method: [
      //               'آنلاین_مجازی'
      //             ],
      //             major: [
      //               'تجربی'
      //             ],
      //             services: [
      //               'آزمون آنلاین/پاسخنامه تصویری/ابر کارنامه/پاسخنامه تشریحی'
      //             ],
      //             download_date: null,
      //             educational_system: [
      //               'نظام جدید'
      //             ],
      //             duration: null,
      //             production_year: [
      //               '99-00'
      //             ]
      //           },
      //           extra: null
      //         },
      //         redirect_code: null
      //       },
      //       price: {
      //         discountDetail: {
      //           productDiscount: 100,
      //           bonDiscount: 0,
      //           productDiscountAmount: 0
      //         },
      //         extraCost: 0,
      //         base: 0,
      //         discount: 0,
      //         final: 0
      //       },
      //       photo: 'https://nodes.alaatv.com/upload/images/product/photo_2022-07-24_14-03-45_20220724093523.jpg',
      //       extra_attributes: null
      //     }
      //   ],
      //   coupon_info: null,
      //   successful_transactions: null,
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
      //   created_at: '2022-07-25 04:26:11',
      //   completed_at: '2022-07-25 08:56:11'
      // },
      currentOrder: new Order(),
      detailsDialog: false,
      hasUserOrdered: true,
      firstRowPassed: false,
      test: new Order()
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
    getCurrentOrderCompletedAt() {
      return (CompletedAt) => {
        return moment(this.currentOrder.completed_at, 'YYYY-M-D').format('jYYYY/jMM/jDD')
      }
    },
    windowSize () {
      if (this.$store.getters['AppLayout/windowSize'].x < 600) {
        // console.log('q-table__grid-item-row')
        return
      }
      return this.$store.getters['AppLayout/windowSize']
    }
  },
  methods: {
    showDetailsDialog(rowData) {
      // console.log('rowData', rowData)
      this.currentOrder = new Order({
        id: 1801136,
        discount: 0,
        customer_description: null,
        price: 0,
        paid_price: 0,
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
            id: 2268936,
            quantity: 1,
            type: 2,
            product: {
              id: 772,
              redirect_url: null,
              type: 1,
              category: 'آزمون/سه آ',
              title: 'آزمون المپیاد زیست سنجاب دهم',
              is_free: 0,
              url: {
                web: 'http://office.alaa.tv:8080/product/772',
                api: 'http://office.alaa.tv:8080/api/v2/product/772'
              },
              photo: 'https://nodes.alaatv.com/upload/images/product/photo_2022-07-24_14-03-45_20220724093523.jpg',
              attributes: {
                info: {
                  teacher: [
                    'گروه مؤلفین'
                  ],
                  shipping_method: [
                    'آنلاین_مجازی'
                  ],
                  major: [
                    'تجربی'
                  ],
                  services: [
                    'آزمون آنلاین/پاسخنامه تصویری/ابر کارنامه/پاسخنامه تشریحی'
                  ],
                  download_date: null,
                  educational_system: [
                    'نظام جدید'
                  ],
                  duration: null,
                  production_year: [
                    '99-00'
                  ]
                },
                extra: null
              },
              redirect_code: null
            },
            grand: null,
            price: {
              discountDetail: {
                productDiscount: 100,
                bonDiscount: 0,
                productDiscountAmount: 0
              },
              extraCost: 0,
              base: 0,
              discount: 0,
              final: 0
            },
            photo: 'https://nodes.alaatv.com/upload/images/product/photo_2022-07-24_14-03-45_20220724093523.jpg',
            extra_attributes: null
          }
        ],
        coupon_info: null,
        successful_transactions: null,
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
        created_at: '2022-07-25 04:26:11',
        completed_at: '2022-07-25 08:56:11'
      })
      // this.currentOrder = rowData
      this.detailsDialog = true
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
