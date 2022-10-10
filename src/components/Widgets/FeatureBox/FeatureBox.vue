<template>
  <q-skeleton v-if="loading"
              class="full-width slider-loading"
              height="520px" />
  <div v-else
       class="feature-box page-width">
    <div class="content">
      <div>
        <div class="title">
          {{featureData.head }}
        </div>
        <div class="sub-title ellipsis">
          {{featureData.title}}
        </div>
        <div v-for="(item, index) in featureData.value"
             :key="index"
             class="soalaa-item">
          <q-icon size="7px"
                  class="badge"
                  name="circle" />
          <div class="ellipsis">{{item}}</div>
        </div>
      </div>
      <div v-if="featureData.button?.url"
           class="more-details text-right">
        <q-btn
          unelevated
          color="primary"
          :href="featureData.button?.url"
          style="color: #8075DC"
          class="btn q-ma-none"
          padding="7px 15px 7px 15px"
          icon-right="west"
          :label="featureData.button?.text" />
      </div>
    </div>
    <div class="img-box">
      <q-img
        class="img"
        :src="featureData.image?.link" />
    </div>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'FeatureBox',
  data: () => ({
    loading: false,
    featureData: []
  }),
  props: {
    getData: {
      type: Function,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.initPageData()
  },
  methods: {
    async initPageData() {
      this.loading = true
      try {
        const response = await this.getData(API_ADDRESS.homePage.base)
        this.featureData = response.data.data[this.data.responseKey]
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.yellow-title{
  .feature-box{
    .content{
      .title{
        color: #FFC107;
      }
    }
  }
}
.page-width{
  width: 1362px;
  margin: auto;
  @media screen and (max-width:1439px ){
    width: 954px;
  }
  @media screen and (max-width:1023px ){
    width: 600px;
  }
  @media screen and (max-width:599px ){
    width: 100%;
  }
}
.feature-box{
  padding: 40px 120px;
  background: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 24px;
  margin-bottom: 80px;
  display: flex;
  @media screen and (max-width: 1439px) {
    padding: 50px 40px;
    margin-bottom: 60px;
  }
  @media screen and (max-width: 1023px){
    flex-direction: column;
    padding: 40px 30px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 599px){
    padding: 20px 16px;
    border-radius: 16px;
  }
  .content{
    margin-right: 135px;
    width: 587px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 42px;
    padding-bottom: 20px;
    @media screen and (max-width: 1439px){
      padding-top: 0px;
      padding-bottom: 0;
    }
    @media screen and (max-width: 1023px){
      flex-direction: column;
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px ;
    }
    @media screen and (max-width: 599px){
      width: 100%;
    }
    .title{
      font-style: normal;
      font-weight: 800;
      font-size: 40px;
      line-height: 62px;
      color: #8075DC;
      margin-bottom: 10px;
      @media screen and (max-width: 1439px) {
        font-size: 32px;
        line-height: 50px;
      }
      @media screen and (max-width: 1023px) {
        font-size: 24px;
        line-height: 37px;
      }
      @media screen and (max-width: 599px) {
        font-size: 20px;
        line-height: 31px;
      }
    }
    .sub-title{
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 34px;
      letter-spacing: -0.03em;
      color: #6D708B;
      margin-bottom: 10px;
      @media screen and (max-width: 1439px) {
        font-size: 18px;
        line-height: 28px;
      }
      @media screen and (max-width: 1023px){
      font-size: 18px;
      line-height: 28px;
    }

    }
    .soalaa-item{
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      letter-spacing: -0.03em;
      color: #6D708B;
      margin-bottom: 6px;
      display: flex;
      @media screen and (max-width: 599px) {
        font-size: 14px;
        line-height: 22px;
      }
      .badge{
        margin: 10px 5px 0;
        width: 7px
      }
    }
    .more-details{
      .btn{
        width: 136px;
        height: 40px;
        &:deep(.q-btn__content){
          margin: 0 !important;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: -0.03em;
          line-height: 22px;
          .q-icon{
            font-size: 14px;
            margin-left: 5px;
          }
        }
        @media screen and  (max-width: 1023px){
          margin-top: 10px;
        }
      }
    }
  }
  .img-box{
    width: 400px;
    height: 400px;
    @media screen and (max-width: 1023px) {
      width: 349px;
      height: 349px;
      margin: auto;
    }
    @media screen and (max-width: 599px){
      width: 200px;
      height: 200px;

    }
    .img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
