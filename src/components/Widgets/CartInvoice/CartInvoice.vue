<template>
  <div class="invoice-container">
    <q-card class="invoice-cart">
      <q-card-section class="invoice-total-price-section invoice-cart-section">
        <div class="total-shopping-cart price-section">
          <div class="title">جمع سبد خرید {{ `(${test})` }}</div>
          <div class="price">{{ total }}
            <span class="iran-money-unit">تومان</span>
          </div>
        </div>

        <div class="wallet-credit price-section">
          <div class="title">اعتبار کیف پول</div>
          <div class="price">{{ total }}
            <span class="iran-money-unit">تومان</span>
          </div>
        </div>

        <div class="purchase-profit price-section">
          <div class="title">سود شما از خرید</div>
          <div class="price">{{ `(${test}٪) ` + total }}
            <span class="iran-money-unit">تومان</span>
          </div>
        </div>

        <q-separator class="invoice-separator"/>
      </q-card-section>

      <q-card-section class="invoice-coupon-section invoice-cart-section">
        <div class="enter-coupon-code">
          <div class="title">کد تخفیف:</div>

          <q-input
            v-model="couponValue"
            type="text"
            label="کد تخفیف خود را وارد کنید"
            class="coupon-input"
            outlined
          >
            <template v-slot:append>
              <q-btn label="ثبت" flat/>
            </template>
          </q-input>
        </div>

        <q-separator class="invoice-separator"/>
      </q-card-section>

      <q-card-section class="payment-section invoice-cart-section">
        <div class="final-price price-section">
          <div class="title">مبلغ نهایی</div>
          <div class="price">{{ total }}
            <span class="iran-money-unit">تومان</span>
          </div>
        </div>

        <div
          v-if="isUserLogin"
          class="payment-gateway"
        >
          <p class="payment-title">درگاه پرداخت</p>

          <div class="banks-gateway-list row">
            <div class="bank-gateway-container col-lg-6 col-12">
            <div class="bank-gateway">
              <div class="bank-icon-container">
                <q-image class="bank-icon"/>
              </div>

              <q-radio
                v-model="selectedBank"
                val="1"
                dir="ltr"
                label="بانک سامان"
                class="select-bank-radio-button"
              />
            </div>
            </div>

          <div class="bank-gateway-container col-lg-6 col-12">
              <div class="bank-gateway">
                <div class="bank-icon-container">
                  <q-image class="bank-icon"/>
                </div>
                <div>
                  <q-radio
                    v-model="selectedBank"
                    val="1"
                    dir="ltr"
                    label="بانک سامان"
                    class="select-bank-radio-button"
                  />
                </div>
              </div>
          </div>
            </div>
          <div class="payment-description">
            <p class="title">توضیحات</p>

            <q-input
              v-model="couponValue"
              type="text"
              label="اگر توضیحی درباره ی محصول دارید اینجا بنویسید"
              class="payment-description-input"
              outlined
            />
          </div>

          <div
            class="payment-button"
            @click="payment"
          >
            پرداخت و ثبت نهایی
          </div>
        </div>

        <q-separator
          v-if="isUserLogin"
          class="invoice-separator"
        />
      </q-card-section>

      <q-card-section
        v-if="!isUserLogin"
        class="login-section invoice-cart-section"
      >
        <p class="title">برای ادامه ثبت سفارش، به حساب کاربری خود وارد شوید </p>

        <q-input
          v-model="couponValue"
          type="text"
          label="شماره موبایل خود را وارد کنید"
          class="login-input"
          outlined
        />

        <q-input
          v-model="couponValue"
          type="text"
          label="رمز عبور خود را وارد کنید"
          class="login-input"
          outlined
        />

        <p class="no-account">
          حساب کاربری ندارید؟
          <router-link to="/" class="sign-in">ثبت نام کنید</router-link>
        </p>

        <div
          class="sign-in-button"
          @click="signIn"
        >
          ورود به حساب کاربری
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'CartInvoice',
  data() {
    return {
      test: 4,
      total: '1000000',
      couponValue: null,
      selectedBank: null
    }
  },
  computed: {
    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    }
  },
  methods: {
    payment() {
      console.log('hi')
    },

    signIn() {
      console.log('hi')
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-container {
  .invoice-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 16px;
    width: 100%;

    @media screen and (max-width: 1439px) {
      padding: 24px;
    }

    @media screen and (max-width: 1023px) {
      padding: 20px;
    }

    &:deep(.q-separator--horizontal) {
      height: 1.3px;
      border: none;
      background: #EFF4FC;
      margin-bottom: 20px;

      @media screen and (max-width: 1439px) {
        margin-bottom: 14px;
      }

      @media screen and (max-width: 1023px) {
        margin-bottom: 16px;
      }

      @media screen and (max-width: 599px) {
        margin-bottom: 12px;
      }
    }

    .invoice-cart-section {
      padding: 0;
      width: 100%;

      .iran-money-unit {
        font-size: 14px;
        line-height: 22px;
        margin-left: 6px;
      }

      &.invoice-total-price-section {
        .price-section {
          display: flex;
          justify-content: space-between;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 25px;
          color: #23263B;
          margin-bottom: 20px;

          @media screen and (max-width: 1439px) {
            margin-bottom: 14px;
          }

          @media screen and (max-width: 1023px) {
            margin-bottom: 16px;
          }

          &.purchase-profit {
            color: #E86562;
          }

          .title {
            letter-spacing: -0.03em;

            @media screen and (max-width: 599px) {
              font-size: 14px;
            }
          }

          .price {
            letter-spacing: -0.05em;
          }
        }
      }

      &.invoice-coupon-section {

        .enter-coupon-code {
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          .title {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            letter-spacing: -0.03em;
            color: #23263B;
            margin-right: 16px;

            @media screen and (max-width: 1439px) {
              margin-right: 14px;
            }

            @media screen and (max-width: 1023px) {
              margin-right: 36px;
            }

            @media screen and (max-width: 599px) {
              margin-right: 14px;
            }
          }

          .coupon-input {
            &:deep(.q-field__control) {
              height: 40px;
              border: 1.3px solid #E7ECF4;
              border-radius: 8px;
              padding: 0 16px;
              max-width: 286px;
              width: 100%;

              @media screen and (max-width: 1439px) {
                padding: 0 12px;
              }

              @media screen and (max-width: 1024px) {
                padding: 0 16px;
              }

              @media screen and (max-width: 599px) {
                padding: 0 12px;
              }
            }

            &:deep(.q-field__append) {
              height: 40px;
            }

            &:deep(.q-field__label) {
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 19px;
              letter-spacing: -0.05em;
              color: #9092A7;
              margin: -8px 0;
            }

            &:deep(.q-btn .q-btn__content) {
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              color: #23263B;
            }

            &:deep(.q-field__inner .q-field__control:before) {
              border: none;
            }

          }
        }
      }

      &.payment-section {
        .final-price {
          color: #4CAF50;
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;

          @media screen and (max-width: 1439px) {
            margin-bottom: 18px;
          }

          @media screen and (max-width: 1023px) {
            margin-bottom: 20px;
          }

          @media screen and (max-width: 599px) {
            margin-bottom: 16px;
          }

          .title {
            font-weight: 600;
            font-size: 18px;
            line-height: 28px;
            letter-spacing: -0.03em;

            @media screen and (max-width: 599px) {
              font-size: 16px;
            }
          }

          .price {
            font-weight: 600;
            font-size: 24px;
            line-height: 37px;
            letter-spacing: -0.05em;

            @media screen and (max-width: 599px) {
              font-size: 20px;
            }
          }
        }

        .payment-gateway {

          .payment-title {
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            letter-spacing: -0.03em;
            color: #23263B;
            margin-bottom: 8px;
          }

          .banks-gateway-list {
            margin-bottom: 20px;

            .bank-gateway-container {
              .bank-gateway {
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                height: 74px;
                border: 1.3px solid #E7ECF4;
                border-radius: 8px;
                padding: 8px;

                .bank-icon-container {
                  width: 58px;
                  height: 58px;
                  background: #F4F3FF;
                  border-radius: 5px;
                  margin-right: 8px;
                }

                .select-bank-radio-button {
                  &:deep(.q-radio__bg) {
                    color: #E7ECF4;
                  }

                  &:deep(.q-radio__label) {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 19px;
                    letter-spacing: -0.05em;
                    color: #23263B;
                  }
                }
              }
            }
          }

          .payment-description {
            .title {
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 25px;
              letter-spacing: -0.03em;
              color: #23263B;
            }

            .payment-description-input {
              margin-bottom: 24px;

              &:deep(.q-field__control) {
                height: 65px;
                border: 1.3px solid #E7ECF4;
                border-radius: 8px;
              }

              &:deep(.q-field__label ) {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 19px;
                letter-spacing: -0.05em;
                color: #9092A7;
                margin: -8px 0;
              }

              &:deep(.q-field__label .q-field__native) {
                padding: 12px 16px;
              }

              &:deep(.q-field__inner .q-field__control:before) {
                border: none;
              }
            }
          }

          .payment-button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 56px;
            background: #4CAF50;
            border-radius: 8px;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 25px;
            letter-spacing: -0.03em;
            color: #FFFFFF;
            cursor: pointer;
          }
        }
      }

      &.login-section {
        .title {
          font-weight: 400;
          font-size: 16px;
          line-height: 25px;
          letter-spacing: -0.003em;
          color: #23263B;
          margin-bottom: 14px;
        }

        .login-input {
          margin-bottom: 14px;

          &:deep(.q-field__control) {
            width: 374px;
            height: 40px;
            background: #F6F9FF;
            border-radius: 8px;
            padding: 0 16px;
          }

          &:deep(.q-field__label) {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 19px;
            text-align: right;
            letter-spacing: -0.003em;
            color: #ADAFC1;
            margin: -8px 0;
          }

          &:deep(.q-field__inner .q-field__control:before) {
            border: none;
          }
        }

        .no-account {
          text-align: right;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 19px;
          letter-spacing: -0.003em;
          color: #23263B;

          .sign-in {
            color: #8075DC;
            margin-bottom: 20px;
            text-decoration: none;
            cursor: pointer;
          }
        }

        .sign-in-button {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 56px;
          background: #9690E4;
          border-radius: 8px;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 25px;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          cursor: pointer;
        }
      }
    }

  }
}
</style>
