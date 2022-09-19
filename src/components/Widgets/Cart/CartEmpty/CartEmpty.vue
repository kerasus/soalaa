<template>
  <div class="cart-container">
    <div class="cart-image">
      <q-img src="https://nodes.alaatv.com/aaa/landing/Soalaa/States/empty_cart.png" />
    </div>
    <div class="title">سبد خرید شما خالی است!</div>
    <router-link
      :to="{name: 'HomePage'}"
      class="back"
    >
      بازگشت به فروشگاه
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CartEmpty',
  created() {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.cart-image {
  opacity: 0.7;
  width: 290px;
  height: 290px;
  margin-top: 142px;
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
    margin-top: 60px;
  }

  .back {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #8075DC;
    margin-top: 12px;
    text-decoration: none;
  }
}

@media screen and (max-width: 1439px) {
  .cart-image {
    width: 230px;
    height: 230px;
    margin-top: 46px;
  }
  .cart-container {
    .title {
      font-size: 22px;
      line-height: 34px;
      margin-top: 48px;
    }
    .back {
      margin-top: 24px;
      font-size: 18px;
    }
  }
}
@media screen and(max-width: 1023px) {
  .cart-image {
    width: 290px;
    height: 290px;
    margin-top: 201px;
  }
}

@media screen and (max-width: 599px) {
  .cart-image {
    width: 200px;
    height: 200px;
    margin-top: 76px;
  }
  .cart-container {
    .title {
      font-size: 18px;
      line-height: 28px;
      margin-top: 40px;
    }
    .back {
      font-size: 14px;
      line-height: 22px;
      margin-top: 10px;
    }
  }
}

</style>
