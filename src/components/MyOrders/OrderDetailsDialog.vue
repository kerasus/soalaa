<template>
  <q-dialog
    v-model="modal"
    class="order-details-dialog"
  >
    <q-card class="order-details-card">
      <q-card-section class="dialog-header">
        <div>
          <q-btn
            round
            flat
            dense
            size="md"
            @click="modal = false"
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
      <div>
        <q-card-section class="info">
          <div class="info-box part1">
            <div class="default-info paid">اطلاعات کلی</div>
            <div>
              شماره سفارش:
              <span class="default-info">{{ order.id }}</span>
            </div>
            <div>
              وضعیت پرداخت:
              <span class="default-info">{{ order.paymentstatus.name }}</span>
            </div>
            <div>
              تاریخ سفارش:
              <span class="default-info">{{ getCurrentOrderCompletedAt(order.completed_at) }}</span>
            </div>
          </div>
          <div class="info-box part2">
            <div>
              جمع مبلغ سفارش:
              <span class="default-info">{{ toman(order.price, null) }} تومان</span>
            </div>
            <div>
              میزان تخفیف:
              <span class="info-discount">({{ order.getOrderDiscount() }}%)</span>
              <!--            <span class="info-discount">({{ order.discount }}%)</span>-->
              <!--              <span class="default-info paid">پرداخت شده</span>-->
              <span class="default-info">{{ order.getOrderDiscount('toman') }}</span>
            </div>
            <div>
              مبلغ نهایی:
              <span class="default-info">{{ toman(order.paid_price, null) }} تومان</span>
            </div>
          </div>
        </q-card-section>
        <q-card-section
          v-if="order.orderItems.list && order.orderItems.list.length > 0 "
          class="products"
        >
          <div class="default-info paid">محصولات سفارش</div>
          <div
            v-for="(orderItem, index) in order.orderItems.list"
            :key="index"
          >
            <ordered-products :ordered-item="orderItem" />
          </div>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { Order } from 'src/models/Order'
import moment from 'moment-jalaali'
import OrderedProducts from 'components/MyOrders/OrderedProducts'

export default {
  name: 'OrderDetailsDialog',
  components: { OrderedProducts },
  props: {
    dialogValue: {
      type: Boolean
    },
    order: {
      type: Order,
      default () {
        return new Order()
      }
    }
  },
  emits: [
    'update:dialogValue'
  ],
  data() {
    return {}
  },
  computed: {
    modal: {
      get () {
        return this.dialogValue
      },
      set (value) {
        this.$emit('update:dialogValue', value)
      }
    },
    getCurrentOrderCompletedAt() {
      return (CompletedAt) => {
        return moment(CompletedAt, 'YYYY-M-D').format('jYYYY/jMM/jDD')
      }
    },
    discountInPercent() {
      return (discount, base) => {
        return Math.round(discount * 100 / base)
      }
    },
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    }
  },
  methods: {
    toman (key, suffix) {
      let string = key.toLocaleString('fa')
      if (typeof suffix === 'undefined' || suffix) {
        string += ' تومان '
      }
      return string
    }
  }
}
</script>

<style scoped lang="scss">
.order-details-dialog {
  .order-details-card {
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
    //height: 640px;
    overflow-x: scroll;
    @media screen and (max-width: 1439px) {
      width: 664px;
      //height: 480px;
    }
    @media screen and (max-width: 1023px) {
      width: 540px;
      //height: 640px;
    }
    @media screen and (max-width: 599px) {
      width: 100%;
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
  .q-dialog__inner--minimized > div {
    max-width: 830px;
    max-height: 640px;
  }
  @media screen and (max-width: 1439px) {
    .q-dialog__inner--minimized > div {
      max-width: 664px;
      max-height: 480px;
    }
  }
  @media screen and (max-width: 1023px) {
    .q-dialog__inner--minimized > div {
      max-width: 540px;
      max-height: 640px;
    }
  }
}

</style>
