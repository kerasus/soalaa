<template>
  <div class="cart-view-widget">
    <div class="cart-count">سبدخرید شما ({{count}} محصول)</div>
    <div
      v-for="item in cartItems"
      :key="item.id"
      class="cart-items"
    >
      <q-card class="cart-card">
        <q-card-section class="order-image-section">
          <q-img
            :src="item.product.photo"
            class="order-image"
          />
        </q-card-section>

        <q-card-section class="card-content-section ">
          <div class="order-item-header">
            <div class="title ellipsis">
              {{ item.product.title }}
            </div>

            <q-btn
              unelevated
              class="trash-button"
              icon="isax:trash"
              @click="removeItem(item)"
            />
          </div>

          <div
            v-if="item.product && item.product.attributes && item.product.attributes.info"
            class="product-information"
          >
            <div class="product-info">
              <q-icon
                name="isax:teacher"
                class="info-icon"
              />
              <div class="info-value">
                {{ item.product.attributes.info.teacher.join('، ') }}
              </div>
            </div>

            <div class="product-info">
              <q-icon
                name="isax:book-1"
                class="info-icon"
              />
              <div class="info-value">
                رشته تحصیلی: {{ item.product.attributes.info.major.join(' - ') }}
              </div>
            </div>

            <div class="product-info">
              <q-icon
                name="isax:menu-board4"
                class="info-icon"
              />
              <div class="info-value">
                {{ item.product.attributes.info.production_year.join('، ') }}
              </div>
            </div>
          </div>

          <div class="product-details">
            <div
              v-if="item.price"
              class="price-container"
            >
              <div class="discount-part">
                <div class="discount-percent">
                  {{ item.price.discountInPercent() }}%
                </div>

                <div class="base-price">
                  {{ item.price.toman('base', null) }}
                </div>
              </div>

              <div class="final-part">
                <div class="final-price">{{ item.price.toman('final', null) }}</div>
                <div class="toman">تومان</div>
              </div>
            </div>

            <div class="action-buttons">
              <a
                class="link"
                :href="item.product?.url?.web"
              >
                {{ descLinkLabel }}
              </a>

              <q-btn-dropdown
                class="details-button"
                label="جزئیات محصول"
                dropdown-icon="isax:arrow-down-1"
                flat
                @click="descShow(item)"
              >
              </q-btn-dropdown>
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
    cartItems () {
      return this.$store.getters['Cart/cart'].cartItems.list
    },
    count () {
      return this.$store.getters['Cart/cart'].count
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

  .cart-count {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #6D708B;
    margin: 24px 0 22px 0;

    @media screen and (max-width: 1439px) {
      letter-spacing: -0.03em;
      margin: 20px 0;
    }
  }

  .cart-items {
      .cart-card {
        background: #ffffff;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6),
        2px 4px 10px rgba(112, 108, 162, 0.05);
        border-radius: 16px;
        display: flex;
        padding: 20px;
        margin-bottom: 16px;

        @media screen and (max-width: 1439px) {
          padding: 16px;
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

        .card-content-section {
          padding: 0;
          display: flex;
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
              min-width: 260px;
              width: 100%;

              @media screen and (max-width: 599px) {
                position: absolute;
                font-size: 14px;
                left: -78px;
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

          .product-details {
            display: flex;
            justify-content: space-between;

            @media screen and (max-width: 599px) {
              flex-direction: column;
            }

            .price-container {
              display: flex;
              align-items: center;

              @media screen and (max-width: 599px) {
                justify-content: space-between;
              }

              .discount-part {
                display: flex;
                align-items: center;

                @media screen and (max-width: 599px) {
                  margin-bottom: 6px;
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

              @media screen and (max-width: 599px) {
                justify-content: space-between;
              }

              .link {
                font-weight: 600;
                font-size: 12px;
                line-height: 19px;
                color: #9690E4;
                margin-right: 24px;

                @media screen and (max-width: 1439px) {
                  margin-right: 12px;
                }

                @media screen and (max-width: 1023px) {
                  margin-right: 6px;
                }
              }

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
