<template>
  <div class="cart-view-widget">
    <div
      class="cart-items"
    >
      <q-card class="cart-card">
        <q-card-section
          v-if="order.grand"
          class="card-section"
        >
          <div
            v-if="order.grand.photo"
            class="order-image-section"
          >
            <!--                          :src="order.grand.photo"-->
            <!--            :src="'https://nodes.alaatv.com/aaa/landing/Soalaa/Logo/logo.png'"-->
            <q-img
              :src="order.grand.photo"
              class="order-image"
            />
          </div>

          <div class="product-text-info">
            <div class="order-item-header">
              <div class="title ellipsis">
                {{ order.grand.title }}
                <!--                آزمـون مرحله سوم سه‌آ-->
              </div>
            </div>
            <div
              class="price-container"
            >
              <div class="discount-part">
                <div class="discount-percent">
                  {{ discountInPercent(order.price.base, order.price.final) }}%
                  <!--                  20%-->
                </div>

                <div class="base-price">
                  {{ toman(order.price.base, null) }}
                </div>
              </div>

              <div class="final-part">
                <div class="final-price">{{ toman(order.price.final, null) }}</div>
                <div class="toman">تومان</div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section
          v-else
          class="card-section"
        >
          <div
            v-if="order.product.photo"
            class="order-image-section"
          >
            <!--                          :src="order.grand.photo"-->
            <!--            :src="'https://nodes.alaatv.com/aaa/landing/Soalaa/Logo/logo.png'"-->
            <q-img
              :src="order.product.photo"
              class="order-image"
            />
          </div>

          <div class="product-text-info">
            <div class="order-item-header">
              <div class="title ellipsis">
                {{ order.product.title }}
                <!--                آزمـون مرحله سوم سه‌آ-->
              </div>
            </div>
            <div
              class="price-container"
            >
              <div class="discount-part">
                <div class="discount-percent">
                  {{ discountInPercent(order.price.base, order.price.final) }}%
                  <!--                  20%-->
                </div>

                <div class="base-price">
                  {{ toman(order.price.base, null) }}
                </div>
              </div>

              <div class="final-part">
                <div class="final-price">{{ toman(order.price.final, null) }}</div>
                <div class="toman">تومان</div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section
          v-if="order.grand"
          class="card-actions"
        >
          <div
            class="product-details"
            :class="expanded ?'on-open-expansion': ''"
          >
            <div
              class="action-buttons"
              :class="expanded ? 'expansion-opened' : 'expansion-closed'"
            >

              <q-expansion-item
                v-model="expanded"
                label="جزئیات محصول"
                class="details-expansion"
                :class="expanded ?'open-expansion-style': ''"
                :header-class=" expanded ? 'hide-expansion-header' : ''"
              >
                <q-card class="details-expansion-card">
                  <q-card-section class="details-expansion-card-section">
                    <div
                      v-for="(item, index) in order.product"
                      :key="index"
                      class="pamphlet"
                    >
                      <div class="title ellipsis">
                        {{ item.title }}
                      </div>

                      <div class="right-part">
                        <span
                          class="price"
                        >
                          {{ toman(item.price.final, null) }} تومان
                        </span>
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section class="details-expansion-actions">
                    <q-btn-dropdown
                      class="details-button"
                      label="جزئیات محصول"
                      dropdown-icon="isax:arrow-up-2"
                      flat
                      @click="expanded = !expanded"
                    >
                    </q-btn-dropdown>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
          </div>
        </q-card-section>

      </q-card>
    </div>
  </div>
</template>

<script>
import Widgets from 'components/PageBuilder/Widgets'
// import { Order } from 'src/models/Order'

export default {
  name: 'OrderedProducts',
  mixins: [Widgets],
  data() {
    return {
      dialogState: false,
      expanded: true,
      clickedItemToRemove: null
    }
  },
  props: {
    // order: {
    //   type: Order,
    //   default() {
    //     return new Order()
    //   }
    // },
    order: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    this.loading = true
  },
  computed: {
    cartItems() {
      return this.$store.getters['Cart/cart'].cartItems.list
    },
    windowSize() {
      return this.$store.getters['AppLayout/windowSize']
    },
    discountInPercent () {
      return (discount, base) => {
        return Math.round(discount * 100 / base)
      }
    },
    toman () {
      return (price, suffix) => {
        if (price) {
          let string = price.toLocaleString('fa')
          if (typeof suffix === 'undefined' || suffix) {
            string += ' تومان '
          }

          return string
        }
        return null
      }
    }
  },

  methods: {
  }
}
</script>

<style scoped lang="scss">
.cart-view-widget {
  background: #FFFFFF;
  border: 3px solid #E4E8EF;
  border-radius: 16px;
  margin-top: 12px;

  &:deep(.q-btn .q-btn__content) {
    margin: 0;
  }
  .cart-items {
    .cart-card {
      background: #ffffff;
      box-shadow: none;
      border-radius: 16px;
      padding: 16px;
      @media screen and (max-width: 1439px) {
        border-radius: 12px;
      }

      @media screen and (max-width: 1023px) {
        border-radius: 12px;
      }

      //@media screen and (max-width: 599px) {
      //  padding: 12px;
      //  border-radius: 8px;
      //  margin-bottom: 19px;
      //}

      .card-section {
        padding: 0;
        display: flex;
        @media screen and (max-width: 450px) {
          flex-direction: column;
        }
        .order-image-section {
          padding: 0;
          margin-right: 20px;

          @media screen and (max-width: 1439px) {
            margin-right: 16px;
          }

          .order-image {
            height: 96px;
            width: 96px;
            border-radius: 10px;

            //@media screen and (max-width: 1023px) {
            //  width: 110px;
            //  height: 110px;
            //}

            //@media screen and (max-width: 599px) {
            //  width: 72px;
            //  height: 72px;
            //  margin-top: 34px;
            //}
          }
        }

        .product-text-info {
          flex-direction: column;
          width: 100%;
          display: grid;
          padding-top: 12px;
          padding-bottom: 12px;
          .order-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 24px;

            @media screen and (max-width: 1023px) {
            }

            //@media screen and (max-width: 599px) {
            //  justify-content: flex-end;
            //  align-items: normal;
            //}

            .title {
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              line-height: 25px;
              letter-spacing: -0.03em;
              color: #434765;
              width: 100%;

              //@media screen and (max-width: 599px) {
              //  position: absolute;
              //  padding-right: 36px;
              //  font-size: 14px;
              //}
            }

            .trash-button {
              &:deep(.q-btn__content) {
                //@media screen and (max-width: 599px) {
                //  align-items: normal;
                //}
              }

              &:deep(.q-icon) {
                font-size: 18px;
                color: #434765;
              }
            }
          }

          .product-information {
            margin-bottom: 3px;

            @media screen and (max-width: 1439px) {
              margin-bottom: 0;
            }

            //@media screen and (max-width: 599px) {
            //  margin-bottom: 5px;
            //}

            .product-info {
              display: flex;
              align-items: center;
              margin-bottom: 8px;

              @media screen and (max-width: 1439px) {
                margin-bottom: 9px;
              }

              @media screen and (max-width: 1023px) {
                margin-bottom: 7px;
              }

              //@media screen and (max-width: 599px) {
              //  margin-bottom: 6px;
              //}

              .info-icon {
                font-size: 12px;
                margin-right: 6px;
                color: #65677f;
              }

              .info-value {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 19px;
                color: #65677f;
              }
            }
          }
          .price-container {
            display: flex;
            align-items: center;
            height: 25px;
            margin-top: 20px;
            .discount-part {
              display: flex;
              align-items: center;

              //@media screen and (max-width: 599px) {
              //  margin-right: 6px;
              //}

              .discount-percent {
                text-align: center;
                //padding: 3px 0;
                background: #e86562;
                font-size: 12px;
                width: 30px;
                height: 20px;
                border-radius: 6px 6px 0 6px;
                margin-right: 6px;
                color: white;

                @media screen and (max-width: 1439px) {
                  margin-right: 4px;

                }
              }

              .base-price {
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 22px;
                text-decoration-line: line-through;
                color: #E86562;
                margin-right: 19px;

                @media screen and (max-width: 1023px) {
                  margin-right: 8px;
                }

                //@media screen and (max-width: 599px) {
                //  text-align: left;
                //}
              }
            }

            .final-part {
              display: flex;
              align-items: center;

              .final-price {
                font-style: normal;
                font-weight: 600;
                font-size: 18px;
                line-height: 28px;
                color: #434765;
                margin-right: 4px;

                @media screen and (max-width: 1439px) {
                  margin-right: 2px;
                }

              }

              .toman {
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 22px;
                color: #434765;
              }
            }
          }
        }
      }

      .card-actions {
        padding: 0;
        display: flex;
        justify-content: left;

        .product-details {
          display: flex;
          justify-content: space-between;
          width: 100%;
          //margin-top: -32px;
          //margin-left: 164px;

          @media screen and (max-width: 1439px) {
            //margin-left: 160px;
          }

          @media screen and (max-width: 1023px) {
            flex-direction: column;
            align-items: flex-end;
            margin-left: 0;

          }

          //@media screen and (max-width: 599px) {
          //  margin-top: 0;
          //}

          &.on-open-expansion {
            flex-direction: column;
          }

          .action-buttons {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: left;

            &.expansion-closed {
              margin-top: -50px;
              @media screen and (max-width: 1023px) {
                margin-top: -42px !important;
              }
              @media screen and (max-width: 599px) {
                margin-top: 0px !important;
              }
            }
            .link {
              font-weight: 600;
              font-size: 12px;
              line-height: 19px;
              color: #9690E4;
              margin-right: 24px;
              cursor: pointer;
              text-decoration: none;

              @media screen and (max-width: 1439px) {
                margin-right: 12px;
              }

              @media screen and (max-width: 1023px) {
                margin-right: 24px;
              }
            }

            .details-expansion {

              .details-button {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 19px;
                color: #65677F;

                //@media screen and (max-width: 599px) {}

                &:deep(.q-icon) {
                  font-size: 14px;
                  margin-left: 2px;
                }
              }

              &.open-expansion-style {
                width: 100%;
              }

              .details-expansion-card {
                .details-expansion-card-section {
                  padding: 0;
                  margin: 20px 0 20px 0;

                  //@media screen and (max-width: 599px) {
                  //  margin: 16px 0 16px 0;
                  //}

                  .pamphlet {
                    padding: 10px 16px;
                    background: #F2F5F9;
                    border-radius: 8px;
                    height: 40px;
                    margin-bottom: 10px;
                    display: grid;
                    grid-template-columns: auto auto;
                    align-items: center;

                    //@media screen and (max-width: 599px) {
                    //  flex-direction: column;
                    //  padding: 10px 12px;
                    //  height: 68px;
                    //}

                    .title {
                      font-style: normal;
                      font-weight: 400;
                      font-size: 12px;
                      line-height: 19px;
                      letter-spacing: -0.03em;
                      color: #6D708B;
                      width: 100%;
                    }

                    .right-part {
                      display: flex;
                      align-items: center;
                      width: 100%;
                      justify-content: flex-end;

                      .price {
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 19px;
                        color: #6D708B;
                        //@media screen and (max-width: 599px) {
                          //margin-right: 10px;
                        //}
                      }

                      .hidden-trash-button {
                        display: none
                      }

                      .trash-button {
                        &:deep(.q-icon) {
                          font-size: 14px;
                          color: #6D708B;;
                        }
                      }
                    }
                  }
                }

                .details-expansion-actions {
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  padding: 0;

                  .expansion-link {
                    margin-right: 24px;
                  }
                }
              }

              &:deep(.hide-expansion-header) {
                display: none;
              }

              &:deep(.q-item__label) {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 19px !important;
                color: #65677F;
              }

              &:deep(.q-item__section--main ~ .q-item__section--side) {
                padding-left: 0;
              }

              &:deep(.q-item) {
                border-radius: 15px;
                min-height: 30px;
                padding: 0 5px;
              }

              &:deep(.q-icon) {
                font-size: 24px;
                margin-left: 2px;
              }
            }

            &:deep(.q-btn) {
              min-height: 24px !important;
            }

          }
        }
      }

    }
  }

}

.delete-dialog {
  .delete-dialog-card {
    width: 348px;
    background: #FFFFFF;
    border-radius: 10px;

    .close-button-section {
      padding: 12px 12px 0 12px;
      text-align: right;
      .close-dialog-button {
        font-size: 24px;
        color: #6D708B;
        cursor: pointer;
      }
    }

    .delete-dialog-card-section {
      padding: 0 24px 24px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .info-icon {
        font-size: 58px;
        color: #E86562;
      }

      .are-u-sure-statement {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        text-align: center;
        color: #23263B;
      }
    }

    .delete-dialog-card-actions {
      padding: 24px;
      display: flex;
      justify-content: space-between;

      .surely-delete-button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.03em;
        color: #FFFFFF;
        width: 144px;
        height: 40px;
        background: #8075DC;
        box-shadow: 0 4px 12px rgba(62, 61, 67, 0.15);
        border-radius: 8px;
        cursor: pointer;

        //@media screen and (max-width: 599px) {
        //  width: 122px;
        //}
      }

      .dont-delete-button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        width: 144px;
        height: 40px;
        color: #6D708B;
        background: #F6F9FF;
        border-radius: 8px;
        padding: 9px;
        cursor: pointer;

        //@media screen and (max-width: 599px) {
        //  width: 122px;
        //}
      }
    }
  }
}
</style>
