<template>
  <div class="cart-container">
    <div class="cart-image">
      <q-img
        v-if="hasPaid"
        src="https://nodes.alaatv.com/aaa/landing/Soalaa/States/thankyou_page.png"
      />
      <q-icon
        v-else
        name="error"
        color="red"
      />
    </div>

    <div
      v-if="hasPaid"
      class="title"
    >
      ثبت نام شما با موفقیت انجام شد
    </div>
    <div
      v-else
      class="title"
    >
      متاسفانه پرداخت انجام نشد :(
    </div>
    <!--    <div class="tracking-code-container">-->
    <!--      <span class="tracking-code-title">کد پیگیری:</span>-->
    <!--      <span class="tracking-code">{{ trackingCode }}</span>-->
    <!--    </div>-->
    <router-link
      v-if="hasPaid"
      :to="{name: 'dashboard'}"
      class="redirect-element"
    >
      مشاهده آزمون در پنل کاربری
    </router-link>
    <router-link
      v-else
      :to="{name: 'HomePage'}"
      class="redirect-element"
    >
      بازگشت به فروشگاه
    </router-link>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ThankYouPage',
  data() {
    return {
      hasPaid: false
    }
  },
  created () {
    this.onLoadPage()
  },
  computed: {
    orderId () {
      return this.$route.params.orderId
    }
  },
  methods: {
    onLoadPage () {
      this.$axios.get(API_ADDRESS.cart.orderWithTransaction(this.orderId))
        .then((response) => {
          const paymentStatus = response.data.data.paymentstatus

          if (paymentStatus.id === 3) {
            this.hasPaid = true
          } else if (paymentStatus.id === 1) {
            this.hasPaid = false
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.cart-image {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  width: 245px;
  height: 245px;
  margin-top: 223px;
  font-size: 200px;
}
.cart-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 37px;
    text-align: center;
    color: #6D708B;
    margin-top: 62px;
    letter-spacing: -0.03em;
  }

  .tracking-code-container {
    font-style: normal;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.03em;
    color: #6D708B;
    .tracking-code-title {
      font-weight: 400;
      margin-right: 109px;
    }
    .tracking-code {
      font-weight: 600;
    }
  }

  .redirect-element {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #8075DC;
    margin-top: 20px;
    text-decoration: none;
  }
}

@media screen and (max-width: 1439px) {
  .cart-image {
    width: 194px;
    height: 194px;
    margin-top: 106px;
  }
  .cart-container {
    .title {
      font-size: 22px;
      line-height: 34px;
      margin-top: 53px;
    }
    .tracking-code-container {
      .tracking-code-title {
        margin-right: 83px;
      }
    }

    .redirect-element {
      margin-top: 16px;
    }
  }
}
@media screen and(max-width: 1023px) {
  .cart-image {
    width: 245px;
    height: 245px;
    margin-top: 236px;
  }
  .title {
    margin-top: 58px;
  }

}

@media screen and (max-width: 599px) {
  .cart-image {
    width: 168px;
    height: 168px;
    margin-top: 101px;
    font-size: 150px;
  }
  .cart-container {
    .title {
      font-size: 18px;
      line-height: 28px;
      margin-top: 40px;
    }
    .tracking-code-container {
      font-size: 14px;
      .tracking-code-title {
        margin-right: 77px;
      }
    }

    .redirect-element {
      font-size: 14px;
      line-height: 22px;
    }
  }
}

</style>
