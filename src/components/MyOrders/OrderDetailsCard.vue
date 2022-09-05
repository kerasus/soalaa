<template>
  <q-expansion-item
    v-model="modal"
  >
    <div
      class="order-details-container-card"
    >
      <q-card class="order-details-card">
        <div>
          <q-card-section
            v-if="order.orderItems.list && order.orderItems.list.length > 0 "
            class="products"
          >
            <div
              v-for="(orderItem, index) in order.orderItems.list"
              :key="index"
            >
              <ordered-products :ordered-item="orderItem" />
              <ordered-products :ordered-item="orderItem" />
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </q-expansion-item>
</template>

<script>
import OrderedProducts from 'components/MyOrders/OrderedProducts'
import { Order } from 'src/models/Order'
import moment from 'moment-jalaali'

export default {
  name: 'OrderDetailsCard',
  components: { OrderedProducts },
  props: {
    toggleValue: {
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
    'update:toggleValue'
  ],
  data() {
    return {}
  },
  computed: {
    modal: {
      get () {
        return this.toggleValue
      },
      set (value) {
        this.$emit('update:toggleValue', value)
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
.order-details-container-card {
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
      padding-top: 0px;
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
