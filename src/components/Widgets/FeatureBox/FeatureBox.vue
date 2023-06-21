<template>
  <q-skeleton v-if="loading"
              class="full-width slider-loading"
              height="520px" />
  <div v-else
       :style="options.style"
       class="feature-box">
    <div class="content full-width">
      <div>
        <div class="title"
             :style="options.style">
          {{ options.data.head }}
        </div>
        <!--          <div class="sub-title ellipsis">-->
        <!--            {{options.data.title}}-->
        <!--          </div>-->
        <div>
          <span v-html="options.data.editor"></span>
        </div>
        <!--          <div v-for="(item, index) in options.data.value"-->
        <!--               :key="index"-->
        <!--               class="soalaa-item">-->
        <!--            <q-icon size="7px"-->
        <!--                    class="badge"-->
        <!--                    name="circle" />-->
        <!--            <div class="ellipsis">{{item}}</div>-->
        <!--          </div>-->
      </div>
      <div v-if="options.data.button?.url"
           class="more-details text-right">
        <q-btn
          unelevated
          :href="options.data.button?.url"
          :style="{background: options.data.button.bgColor, color: options.data.button.textColor}"
          class="btn q-ma-none"
          padding="7px 15px 7px 15px"
          icon-right="west"
          :label="options.data.button?.text" />
      </div>
    </div>
    <div class="img-box">
      <a :href="options.data.image?.url">
        <q-img
          class="img"
          :src="options.data.image?.link" />
      </a>
    </div>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'FeatureBox',
  data: () => ({
    editor: '',
    titleColor: null,
    loading: false,
    featureData: []
  }),
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    options: {
      handler() {
        this.titleColor = this.options.titleColor
      },
      deep: true
    }
  },
  created() {
    // this.initPageData()
    this.titleColor = this.options.titleColor
  },
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  },
  methods: {
    async initPageData() {
      this.loading = true
      try {
        const response = await this.$axios(API_ADDRESS.homePage.base)
        this.featureData = response.data.data[this.options.responseKey]
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.feature-box {
  padding: 40px 120px;
  background: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 24px;
  margin-bottom: 80px;
  display: flex;
  justify-content: space-between;
  width: inherit;
  @media screen and (max-width: 1439px) {
    grid-template-columns:533px 280px;
    padding: 50px 40px;
    margin-bottom: 60px;
    column-gap: 61px;
  }
  @media screen and (max-width: 1023px){
    grid-template-columns: 480px;
    padding: 40px 30px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 599px){
    display: flex;
    flex-wrap: wrap;
    //grid-template-columns: 100%;
    padding: 20px 16px;
    border-radius: 16px;
    //column-gap: 0;
  }
  .content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 42px;
    padding-bottom: 20px;
    @media screen and (max-width: 1439px){
      padding-top: 0;
      padding-bottom: 0;
    }
    @media screen and (max-width: 1023px){
      flex-direction: column;
      margin-right: 0;
      margin-bottom: 20px ;
    }
    @media screen and (max-width: 599px){
    }
    .title{
      font-style: normal;
      font-weight: 800;
      font-size: 40px;
      line-height: 62px;
      color: v-bind(titleColor);
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
      color: var(--Text-2);
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
      color: var(--Text-2);
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
        margin-top: 26px;
        @media screen and  (max-width: 1439px){
          margin-top: 23px;
        }
        @media screen and  (max-width: 1023px){
          margin-top: 30px;
        }
        @media screen and  (max-width: 599px){
          margin-top: 14px;
        }
      }
    }
  }
  .img-box{
    width: 400px;
    height: auto;
    @media screen and (max-width: 1439px) {
      width: 280px;
    }
    @media screen and (max-width: 1023px) {
      width: 349px;
      justify-self: center;
    }
    @media screen and (max-width: 599px){
      //width: 200px;
    }
    .img{
      width: 100%;
    }
  }
}
</style>
