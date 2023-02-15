<template>
  <div class="banner-wrapper">
    <div class="banner-title">
      {{ info.key }}
    </div>
    <div class="banner-body">
      {{ info.value }}
    </div>
  </div>
</template>
<script>
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'SubscriptionBanner',
  props: {
    getData: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios.get(API_ADDRESS.subscription.landing)
        .then(res => {
          this.info = res.data.data['bank-soala']
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .banner-wrapper {
    width: 100%;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 80px;

    .banner-title {
      margin-bottom: 30px;
      padding-top: 40px;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 31px;
      text-align: center;
      letter-spacing: -0.03em;
      color: #6D708B;

      @media screen and (max-width: 1023px) {
        padding-top: 40px;
        margin-bottom: 20px;
      }
      @media screen and (max-width: 599px) {
        padding-top: 40px;
        margin-bottom: 20px;
      }
      @media screen and (max-width: 390px) {
        font-size: 16px;
        line-height: 25px;
        padding-top: 40px;
        margin-bottom: 16px;
      }
    }

    .banner-body {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      text-align: justify;
      letter-spacing: -0.03em;
      color: #434765;
      max-width: 898px;

      @media screen and (max-width: 1023px) {
        max-width: 90%;
      }

      @media screen and (max-width: 599px) {
        max-width: 90%;
      }
      @media screen and (max-width: 390px) {
        max-width: 90%;
        font-size: 14px;
        line-height: 22px;
      }
    }

    @media screen and (max-width: 1023px) {
      padding-bottom: 60px;
    }

    @media screen and (max-width: 599px) {
      padding-bottom: 50px;
    }
    @media screen and (max-width: 390px) {
      padding-bottom: 50px;
    }
  }
</style>
