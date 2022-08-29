<template>
  <div
    class="my-orders-list"
  >
    <!--    <div>سفارش های من</div>-->
    <!--          :api="getEntityApi"-->
    <entity-index
      class="orders-list-entity-index"
      title="سفارش های من"
      :api="getEntityApi"
      :table="table"
      :table-keys="tableKeys"
      :default-layout="false"
      :create-route-name="'Admin.Exam.Create'"
    >
      <template #table-cell="{inputData}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'details'">
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

          </template>
          <template v-else>
            {{ inputData.props.value }}
          </template>
        </q-td>
      </template>
    </entity-index>
    <q-dialog v-model="detailsDialog">
      <q-card class="order-details-dialog">
        <q-card-section class="dialog-header">
          <div>
            <q-btn
              round
              flat
              dense
              size="md"
              @click="detailsDialog = false"
            >
              <svg width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16L16 8"
                      stroke="#65677F"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                <path d="M16 16L8 8"
                      stroke="#65677F"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
              </svg>

            </q-btn>
          </div>
          <div class="title">جزییات سفارش</div>
          <div></div>
        </q-card-section>
        <q-card-section class="info">
          <div class="info-box part1">
            <div class="default-info paid">اطلاعات کلی</div>
            <div>
              شماره سفارش:
              <span class="default-info">{{ currentOrder.id }}</span>
            </div>
            <div>
              وضعیت پرداخت:
              <span class="default-info">{{ currentOrder.paymentstatus.name }}</span>
            </div>
            <div>
              تاریخ سفارش:
              <span class="default-info">{{ getCurrentOrderCompletedAt(currentOrder.completed_at) }}</span>
            </div>
          </div>
          <div class="info-box part2">
            <div>
              جمع مبلغ سفارش:
              <span class="default-info">{{ currentOrder.price }} تومان</span>
            </div>
            <div>
              میزان تخفیف:
              <span class="info-discount">({{ discountInPercent(currentOrder.discount, currentOrder.price) }}%)</span>
              <!--              <span class="default-info paid">پرداخت شده</span>-->
              <span class="default-info">{{ currentOrder.discount }} تومان</span>
            </div>
            <div>
              مبلغ نهایی:
              <span class="default-info">{{ currentOrder.paid_price }}</span>
            </div>
          </div>
        </q-card-section>
        <q-card-section
          v-if="currentOrder.orderproducts && currentOrder.orderproducts.length > 0 "
          class="products"
        >
          <div class="default-info paid">محصولات سفارش</div>
          <div
            v-for="(product) in currentOrder.orderproducts"
            :key="product.id"
          >
            <ordered-products :order="product" />
          </div>
          <!--          -->
          <!--          <ordered-products />-->
          <!--          <ordered-products />-->
          <!--          <ordered-products />-->
          <!--          <ordered-products />-->
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
import OrderedProducts from 'components/MyOrders/OrderedProducts'
import { User } from 'src/models/User'
import moment from 'moment-jalaali'
// import { Order } from 'src/models/Order'
// import { Question } from 'src/models/Question'
export default {
  name: 'MyOrders',
  components: {
    OrderedProducts,
    EntityIndex
  },
  data () {
    return {
      expanded: true,
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
          //   name: 'start_at',
          //   // name: 'payment_status',
          //   required: true,
          //   label: 'وضعیت ‌پرداخت',
          //   align: 'left',
          //   field: row => moment(row.start_at, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
          // },
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
      // currentOrder: new Order(),
      // currentOrder: null,
      currentOrder: {
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
            product: [
              {
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
              {
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
              {
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
              }],
            grand: {
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
      },
      detailsDialog: true
    }
  },
  created () {
  },
  computed: {
    user () {
      if (this.$store.getters['Auth/user']) {
        return this.$store.getters['Auth/user']
      }
      return new User()
    },
    getEntityApi () {
      return API_ADDRESS.user.getOrderList(this.user.id)
    },
    getCurrentOrderCompletedAt() {
      return (CompletedAt) => {
        return moment(this.currentOrder.completed_at, 'YYYY-M-D').format('jYYYY/jMM/jDD')
      }
    },
    discountInPercent () {
      return (discount, base) => {
        return Math.round(discount * 100 / base)
      }
    }
  },
  methods: {
    showDetailsDialog (rowData) {
      // console.log('rowData', rowData)
      // this.currentOrder = new Order(rowData)
      // this.currentOrder = rowData
      this.currentOrder = {
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
      }
      this.detailsDialog = true
    },
    getRemoveMessage (row) {
      const title = row.title
      return 'آیا از حذف ' + title + ' اطمینان دارید؟'
    }
  }
}
</script>

<style scoped lang="scss">
.my-orders-list {
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
    }
    .q-pagination {
      //background: red;
      //.q-btn--flat {
      //  background: #FFFFFF;
      //  border-radius: 12px;
      //}
      :not(.justify-center) {
        button {
          &:last-child {
            background: #FFFFFF;
            border-radius: 12px;
          }
          &:first-child {
            background: #FFFFFF;
            border-radius: 12px;
          }
        }
      }

      .q-btn--actionable {
        //background: none;
      }
      //button &:last-child {
      //  background: #FFFFFF;
      //  border-radius: 12px;
      //}
      :nth-child(1):nth-last-child(1) {
        background: #FFFFFF;
        border-radius: 12px;
      }
      //:not(.q-btn--actionable)
      :first-child &button {
        background: #FFFFFF;
        border-radius: 12px;
      }
      :last-child &button {
        background: #FFFFFF;
        border-radius: 12px;
      }
      .q-btn {
        color: #6D708B !important;
        width: 40px;
        height: 40px;
        padding: 0 !important;
        :first-child {
          background: none;
          //border-radius: n;
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
</style>
<style lang="scss">
//.my-orders-list {
  .order-details-dialog {
    background: #FFFFFF;
    box-shadow: none !important;
    border-radius: 16px !important;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 25px;
    text-align: left;
    letter-spacing: -0.03em;
    color: #434765;
    width: 830px;
    height: 640px;
    overflow-x: scroll;
    @media screen and (max-width: 1439px) {
      width: 664px;
      height: 480px;
    }
    @media screen and (max-width: 1023px) {
      width: 540px;
      height: 640px;
    }
    .dialog-header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      .title {
        justify-self: center;
      }
    }
    .info {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      padding: 16px 30px;
      .info-box {
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        text-align: left;
        letter-spacing: -0.03em;
        color: #6D708B;
      }
      .part2 {
        padding-top: 20px;
      }
    }
    .info-discount {
      color: #DA5F5C;
      padding: 0 8px;
    }
    .default-info {
      color: #434765;
      padding: 0 8px;
      &.paid {
        padding-left: 0;
      }
    }
    .products {
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      text-align: left;
      letter-spacing: -0.03em;
      color: #434765;
    }
  }
//}
</style>
