<template>
  <div v-if="loading=== true">
    <q-skeleton type="text"
                class="q-mx-sm"
                height="100px" />
    <q-skeleton type="text"
                class="q-mx-sm"
                height="100px" />
  </div>
  <div v-if="loading=== false">
    <!--  ----------------------------  لیست پرداخت شده  ---------------------------------------------------------------        -->
    <q-expansion-item
      v-if="this.userOrdersList.map(object => object.inputData.paymentstatus.id).indexOf(3) !== -1"
      group="parentGroup"
      label="لیست پرداخت شده"
      default-opened
      class="panel-color"
    >
      <q-btn
        rounded
        unelevated
        class="action-btn"
        @click="extendAll(3)"
      >تمدید کل سفارشات</q-btn>
      <template v-for="order in userOrdersList"
                :key="order"
      >
        <q-expansion-item
          v-if="order.inputData.paymentstatus.id === 3"
          group="childGroup"
          class="panel-color"
        >
          <template v-slot:header>
            <q-item-section>
              <div class="cart-item-info-section">
                <q-icon name="isax:shopping-cart"
                        class="q-mr-sm"
                        size="24px" />
                <div class="cart-item-info">
                  {{ this.cartItemLabel(order) }}
                  <q-btn rounded
                         unelevated
                         class="action-btn"
                         :to="'/product/'+order.inputData.id+'/edit'"
                  >
                    ویرایش</q-btn>
                  <q-btn rounded
                         unelevated
                         class="action-btn q-ml-md"
                         @click="extendAllOrders(order.inputData.orderproducts)"
                  >
                    تمدید کل سفارش</q-btn>
                </div>
              </div>
            </q-item-section>
          </template>
          <!--          ------------------------------------------------------------------  header slot done!!!  ------------------------------------------------------------------ -->
          <q-card>
            <q-card-section>
              <div v-for="item in order.inputData.orderproducts"
                   :key="item"
                   class="row product">
                <div class="col-2">
                  <q-img
                    :src="item.photo"
                    width="120px"
                    height="120px" />
                </div>
                <div class="col-6">
                  <div class="title">{{item.product.title}}</div>
                  <div class="category">{{item.product.category}}</div>
                  <div>
                    <span class="base-price">
                      قیمت پایه:
                      {{toman(item.price.base)}}
                    </span>
                    <q-btn
                      unelevated
                      rounded
                      color="blue"
                      size="11px"
                      class="action-btn q-mr-xs"
                      :href="item.product.url.web"
                      target="_blank"
                    >
                      مشاهده محصول
                    </q-btn>
                    <q-btn
                      unelevated
                      rounded
                      size="11px"
                      class="action-btn"
                      @click="extendAnOrder(item.id)"
                    >
                      تمدید سفارش
                    </q-btn>
                  </div>
                </div>
                <div class="col-4 discount-final-price">
                  <div class="q-mr-xl">
                    <div v-if="item.price.discount !== 0"
                         class="price">
                      {{toman(item.price.discount)}}
                    </div>
                    <div v-else
                         class="price">
                      بدون تخفیف
                    </div>
                    <div class="price-description">
                      تخفیف
                    </div>
                  </div>
                  <div>
                    <div v-if="item.price.final !== 0"
                         class="price">
                      {{toman(item.price.final)}}
                    </div>
                    <div v-else
                         class="price">
                      رایگان
                    </div>
                    <div class="price-description">
                      قیمت نهایی
                    </div>
                  </div>
                </div>
                <q-separator v-if="order.inputData.orderproducts.length-1 !== 0"
                             class="q-my-lg full-width" />
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </template>
    </q-expansion-item>
    <!--  ----------------------------  لیست پرداخت نشده  ---------------------------------------------------------------        -->
    <q-expansion-item
      v-if="this.userOrdersList.map(object => object.inputData.paymentstatus.id).indexOf(1) !== -1"
      group="parentGroup"
      label="لیست پرداخت نشده"
      class="panel-color"
    >
      <q-btn
        rounded
        unelevated
        class="action-btn"
        @click="extendAll(1)"
      >تمدید کل سفارشات</q-btn>
      <template v-for="order in userOrdersList"
                :key="order"
      >
        <q-expansion-item
          v-if="order.inputData.paymentstatus.id === 1"
          group="childGroup"
          header-class="text-primary"
          class="panel-color"
        >
          <template v-slot:header>
            <q-item-section>
              <div class="cart-item-info-section">
                <q-icon name="isax:shopping-cart"
                        class="q-mr-sm"
                        size="24px" />
                <div class="cart-item-info">
                  {{ this.cartItemLabel(order) }}
                  <q-btn rounded
                         unelevated
                         class="action-btn"
                         :to="'/product/'+order.inputData.id+'/edit'"
                  >
                    ویرایش</q-btn>
                  <q-btn rounded
                         unelevated
                         class="action-btn q-ml-md"
                         @click="extendAllOrders(order.inputData.orderproducts)"
                  >
                    تمدید کل سفارش</q-btn>
                </div>
              </div>
            </q-item-section>
          </template>
          <!--          ------------------------------------------------------------------  header slot done!!!  ------------------------------------------------------------------ -->
          <q-card>
            <q-card-section>
              <div v-for="item in order.inputData.orderproducts"
                   :key="item"
                   class="row product">
                <div class="col-2">
                  <q-img
                    :src="item.photo"
                    width="120px"
                    height="120px" />
                </div>
                <div class="col-6">
                  <div class="title">{{item.product.title}}</div>
                  <div class="category">{{item.product.category}}</div>
                  <div>
                    <span class="base-price">
                      قیمت پایه:
                      {{toman(item.price.base)}}
                    </span>
                    <q-btn
                      unelevated
                      rounded
                      color="blue"
                      size="11px"
                      class="action-btn q-mr-xs"
                      :href="item.product.url.web"
                      target="_blank"
                    >
                      مشاهده محصول
                    </q-btn>
                    <q-btn
                      unelevated
                      rounded
                      size="11px"
                      class="action-btn"
                    >
                      تمدید سفارش
                    </q-btn>
                  </div>
                </div>
                <div class="col-4 discount-final-price">
                  <div class="q-mr-xl">
                    <div v-if="item.price.discount !== 0"
                         class="price">
                      {{toman(item.price.discount)}}
                    </div>
                    <div v-else
                         class="price">
                      بدون تخفیف
                    </div>
                    <div class="price-description">
                      تخفیف
                    </div>
                  </div>
                  <div>
                    <div v-if="item.price.final !== 0"
                         class="price">
                      {{toman(item.price.final)}}
                    </div>
                    <div v-else
                         class="price">
                      رایگان
                    </div>
                    <div class="price-description">
                      قیمت نهایی
                    </div>
                  </div>
                </div>
                <q-separator v-if="order.inputData.orderproducts.length-1 !== 0"
                             class="q-my-lg full-width" />
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </template>
    </q-expansion-item>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { mixinDateOptions } from 'src/mixin/Mixins'

export default {
  name: 'userOrderList',
  mixins: [mixinDateOptions],
  props: {
    userOrdersList: {
      type: Array,
      default() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      productItems: [],
      i: 1,
      extendProductArray: []
    }
  },
  methods: {
    toman (key, suffix) {
      let string = key.toLocaleString('fa')
      if (typeof suffix === 'undefined' || suffix) {
        string += ' تومان '
      }
      return string
    },
    cartItemLabel (order) {
      return '#' + order.id + ' - ' + this.convertToShamsi(order.inputData.created_at) + ' - (تعداد محصولات: ' + order.inputData.orderproducts.length + ' ) - ( پرداخت شده: ' + order.inputData.paid_price + ' تومان - مبلغ کل سفارش: ' + order.inputData.price + ' تومان ) - ( ' + order.inputData.paymentstatus.name + ' )'
    },
    extendAnOrder (id) {
      this.extendProductArray = [id]
      this.batchExtendPostRequest()
    },
    extendAllOrders (orderProducts) {
      orderProducts.forEach((item) => {
        this.extendProductArray.push(item.id)
      })
      this.batchExtendPostRequest()
    },
    extendAll (statusId) {
      this.userOrdersList.forEach((item) => {
        if (item.inputData.paymentstatus.id === statusId) {
          item.inputData.orderproducts.forEach((order) => {
            this.extendProductArray.push(order.id)
          })
        }
      })
      this.batchExtendPostRequest()
    },
    batchExtendPostRequest () {
      this.$axios.post(API_ADDRESS.ticket.show.batchExtend, {
        orderproducts: this.extendProductArray
      })
        .then((res) => {
          this.extendProductArray = []
          // console.log(res)
        })
        .catch((e) => {
          this.extendProductArray = []
          // console.log(e)
        })
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.action-btn {
  background: #ffb822; color: #111111; font-size: 12px;
  &:deep(.q-btn__content) {
    margin: 4px 20px;
  }
}
.panel-color {
  color: #837dd1;
  background: #f1f5f5;
  .cart-item-info-section {
    display: flex;
    color: #837dd1;
    .cart-item-info {
      font-size: 12px;
    }
  }
}
.product {
  .title {
    font-size: 1.1em;
    color: #111111;
    margin-bottom: 25px;
  }
  .category {
    font-size: .85em;
    color: #111111;
    font-weight: 300;
    margin-bottom: 20px;
  }
  .base-price {
    color: #6f727d;
    font-size: .85em;
    margin-right: 10px;
  }
  .discount-final-price {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    margin-top: 15px;
    .price {
      color: #6f727d;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 30px;
    }
    .price-description {
      font-size: 12px;
      color: #6f727d;
    }
  }
  .action-btn {
    &:deep(.q-btn__content) {
      margin: 2px 15px;
    }
  }
}
</style>
