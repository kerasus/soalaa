<template>
  <div class="cart-container">
    <div class="cart-image">
      <q-img src="https://nodes.alaatv.com/aaa/landing/Soalaa/States/thankyou_page.png" />
    </div>

    <div class="title">ثبت نام شما با موفقیت انجام شد</div>

    <div class="tracking-code-container">
      <span class="tracking-code-title">کد پیگیری:</span>
      <span class="tracking-code">{{ trackingCode }}</span>
    </div>
    <router-link
      :to="{name: 'dashboard'}"
      class="go-to-exams"
    >
      مشاهده آزمون در پنل کاربری
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ThankYouPage',
  data() {
    return {}
  },
  computed: {
    trackingCode () {
      return this.$route.params.orderId
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.cart-image {
  opacity: 0.7;
  width: 245px;
  height: 245px;
  margin-top: 223px;
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

  .go-to-exams {
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

    .go-to-exams {
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

    .go-to-exams {
      font-size: 14px;
      line-height: 22px;
    }
  }
}

</style>
