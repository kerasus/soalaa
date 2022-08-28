<template>
  <div class="cart-view-widget">
    <div
      v-for="order in orderList"
      :key="order.id"
      class="cart-items"
    >
      <q-card class="cart-card">
        <q-card-section class="card-section">
          <div class="order-image-section">
            <q-img
              :src="order.grand.photo"
              class="order-image"
            />
          </div>

          <div class="product-text-info">
            <div class="order-item-header">
              <div class="title ellipsis">
                {{ order.grand.title }}
              </div>

              <q-btn
                unelevated
                class="trash-button"
                icon="isax:trash"
                @click="removeItem(order)"
              />
            </div>

            <div
              v-if="order.grand && order.grand.attributes && order.grand.attributes.info"
              class="product-information"
            >
              <div class="product-info">
                <q-icon
                  name="isax:teacher"
                  class="info-icon"
                />
                <div class="info-value">
                  {{ order.grand.attributes.info.teacher.join('، ') }}
                </div>
              </div>

              <div class="product-info">
                <q-icon
                  name="isax:book-1"
                  class="info-icon"
                />
                <div class="info-value">
                  رشته تحصیلی: {{ order.grand.attributes.info.major.join(' - ') }}
                </div>
              </div>

              <div class="product-info">
                <q-icon
                  name="isax:menu-board4"
                  class="info-icon"
                />
                <div class="info-value">
                  {{ order.grand.attributes.info.production_year.join('، ') }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="card-actions">
          <div
            class="product-details"
            :class="expanded ?'on-open-expansion': ''"
          >
            <div
              v-if="order.price"
              class="price-container"
            >
              <div class="discount-part">
                <div class="discount-percent">
                  {{ order.price.discountInPercent() }}%
                </div>

                <div class="base-price">
                  {{ order.price.toman('base', null) }}
                </div>
              </div>

              <div class="final-part">
                <div class="final-price">{{ order.price.toman('final', null) }}</div>
                <div class="toman">تومان</div>
              </div>
            </div>

            <div
              class="action-buttons"
              :class="expanded ? '' : 'open-expansion'"
            >
              <a
                v-if="!expanded"
                class="link"
                :href="order.grand?.url?.web"
              >
                {{ descLinkLabel }}
              </a>

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
                      v-for="i in 3"
                      :key="i"
                      class="pamphlet"
                    >
                      <div class="title ellipsis">
                        جزوات آمار و احتمال یازدهم با تدریس علی صدری
                      </div>

                      <div class="right-part">
                        <span
                          class="price"
                          :class="i !== 1 ? 'without-trash': ''"
                        >
                          123456 تومان
                        </span>
                        <q-btn
                          unelevated
                          :class="i === 1 ? 'trash-button': 'hidden-trash-button'"
                          icon="isax:trash"
                          @click="removeorder(item)"
                        />
                      </div>
                    </div>
                  </q-card-section>

                  <q-card-section class="details-expansion-actions">
                    <a
                      class="link expansion-link"
                      :href="order.grand?.url?.web"
                    >
                      {{ descLinkLabel }}
                    </a>
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

export default {
  name: 'cartView',
  mixins: [Widgets],
  data() {
    return {
      test: null,
      expanded: false
    }
  },
  props: {
    getData: {
      type: Function
    }
  },
  created() {
    this.loading = true
  },
  computed: {
    cart() {
      return this.$store.getters['Cart/cart']
    },
    orderList () {
      return this.$store.getters['Cart/cart'].items.list
    },
    windowSize() {
      return this.$store.getters['AppLayout/windowSize']
    },
    descLinkLabel() {
      if (this.windowSize.x > 1439) {
        return 'رفتن به صفحه محصول'
      } else {
        return 'صفحه محصول'
      }
    }
  },

  methods: {
    cartReview() {
      this.$store.commit('loading/loading', true)
      this.$store.dispatch('Cart/reviewCart')
        .then(() => {
          this.$store.dispatch('loading/overlayLoading', false)
        })
    },
    goToDescPage(ci) {
      // TODO:
      // do something with: ci.product.url.web
      window.location.href = ci.product.url.web
    },
    descShow(ci) {
      // TODO:
      // do something with: ci.product.url.api
      window.location.href = ci.product.url.api
    },
    removeItem(ci) {
      this.$store.dispatch('loading/overlayLoading', true)
      this.$store.dispatch('Cart/removeItemFromCart', ci.id).then(() => {
        this.cartReview()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.cart-view-widget {
  &:deep(.q-btn .q-btn__content) {
    margin: 0;
  }
  .cart-items {
      .cart-card {
        background: #ffffff;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6),
        2px 4px 10px rgba(112, 108, 162, 0.05);
        border-radius: 16px;
        padding: 20px 20px 4px 20px;
        margin-bottom: 16px;

        @media screen and (max-width: 1439px) {
          padding: 16px 16px 0 16px;
          border-radius: 12px;
        }

        @media screen and (max-width: 1023px) {
          border-radius: 12px;
        }

        @media screen and (max-width: 599px) {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 19px;
        }

        .card-section {
          padding: 0;
          display: flex;

          .order-image-section {
            padding: 0;
            margin-right: 20px;

            @media screen and (max-width: 1439px) {
              margin-right: 16px;
            }

            @media screen and (max-width: 599px) {
              margin-right: 8px;
            }

            .order-image {
              height: 144px;
              width: 144px;
              border-radius: 10px;

              @media screen and (max-width: 1023px) {
                width: 110px;
                height: 110px;
              }

              @media screen and (max-width: 599px) {
                width: 72px;
                height: 72px;
                margin-top: 34px;
              }
            }
          }

          .product-text-info {
            flex-direction: column;
            width: 100%;
            .order-item-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 24px;
              margin-bottom: 10px;

              @media screen and (max-width: 1023px) {
                margin-bottom: 12px;
              }

              @media screen and (max-width: 599px) {
                justify-content: end;
                align-items: normal;
                margin-bottom: 8px;
              }

              .title {
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 25px;
                letter-spacing: -0.03em;
                color: #434765;
                width: 100%;

                @media screen and (max-width: 599px) {
                  position: absolute;
                  padding-right: 36px;
                  font-size: 14px;
                }
              }

              .trash-button {
                &:deep(.q-btn__content) {
                  @media screen and (max-width: 599px) {
                    align-items: normal;
                  }
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

              @media screen and (max-width: 599px) {
                margin-bottom: 5px;
              }

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

                @media screen and (max-width: 599px) {
                  margin-bottom: 6px;
                }

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
            margin-top: -32px;
            margin-left: 164px;

            @media screen and (max-width: 1439px) {
              margin-left: 160px;
            }

            @media screen and (max-width: 1023px) {
              flex-direction: column;
              align-items: end;
              margin-left: 0;

            }

            @media screen and (max-width: 599px) {
              margin-top: 0;
            }

            &.on-open-expansion {
              flex-direction: column;
            }

            .price-container {
              display: flex;
              align-items: center;

              .discount-part {
                display: flex;
                align-items: center;

                @media screen and (max-width: 599px) {
                  margin-right: 6px;
                }

                .discount-percent {
                  text-align: center;
                  padding: 3px 0;
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

                  @media screen and (max-width: 599px) {
                    text-align: left;
                  }
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

            .action-buttons {
              display: flex;
              align-items: center;
              width: 100%;
              justify-content: left;

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

                  @media screen and (max-width: 599px) {}

                  &:deep(.q-icon) {
                    font-size: 14px;
                    margin-left: 2px;
                  }
                }

                &.open-expansion-style {
                  width: 100%;
                }

                .details-expansion-card {
                  margin-bottom: 20px;

                  @media screen and (max-width: 1439px) {
                    margin-bottom: 16px;
                  }

                  @media screen and (max-width: 599px) {
                    margin-bottom: 12px;
                  }

                  .details-expansion-card-section {
                    padding: 0;
                    margin: 20px 0 20px 0;

                    @media screen and (max-width: 599px) {
                      margin: 16px 0 16px 0;
                    }

                    .pamphlet {
                      padding: 10px 16px;
                      background: #FFFFFF;
                      border: 1.5px solid #E4E8EF;
                      border-radius: 8px;
                      height: 40px;
                      margin-bottom: 10px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;

                      @media screen and (max-width: 599px) {
                        flex-direction: column;
                        padding: 10px 12px;
                        height: 68px;
                      }

                      .title {
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 19px;
                        letter-spacing: -0.03em;
                        color: #6D708B;padding-right: 30px;
                        width: 100%;
                      }

                      .right-part {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        justify-content: end;

                        .price {
                          font-style: normal;
                          font-weight: 400;
                          font-size: 12px;
                          line-height: 19px;
                          color: #6D708B;
                          margin-right: 16px;

                          &.without-trash {
                            margin-right: 36px;

                            @media screen and (max-width: 599px) {
                              margin-right: 28px;
                            }
                          }

                          @media screen and (max-width: 599px) {
                            margin-right: 10px;
                          }
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
                    justify-content: end;
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
                  padding: 0;
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
</style>
