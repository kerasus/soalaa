<template>
  <div class="page-width">
    <div class="why-soalaa">
      چرا سوالا؟
    </div>
    <div class="tab-title">
      متفاوت‌ترین پلتفرم آزمون آنلاین و بانک سوال ایران
    </div>
    <div class="tab-panel-container">
      <q-tabs
        v-model="activeTab"
        inline-label
        outside-arrows
        mobile-arrows
        indicator-color="transparent"
        active-class="active-tab"
        class="tab-box"
      >
        <q-tab v-for="(tab, index) in tabs"
               :key="index"
               :name="index"
               :icon="tabIcon(index, tab.icon, tab.icon2)"
               class="tab-style"
               :label="tab.key"
        />
      </q-tabs>
      <q-tab-panels v-model="activeTab"
                    animated
                    class="tab-content">
        <q-tab-panel v-for="(tabData, index) in tabs"
                     :key="index"
                     class="q-pa-none tab-panel-box"
                     :name="index">
          <div class="content">
            <div class="title"> {{tabData.key}}</div>
            <div class="description">{{tabData.value}}</div>
            <div v-if="tabData.link"
                 class="more-detail text-right">
              <q-btn
                flat
                :href="tabData.link"
                style="color: #8075DC"
                class="btn"
                padding="9px 17px"
                icon-right="west"
                label="اطلاعات بیشتر" />
            </div>
          </div>
          <div class="img-box">
            <q-img class="img"
                   :src="tabData.image" />
          </div>
        </q-tab-panel>
      </q-tab-panels>

    </div>
  </div>

</template>

<script>
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'TabPanel',
  data: () => ({
    tabs: [],
    activeTab: 0
  }),
  props: {
    getData: {
      type: Function,
      default: () => {}
    }
  },
  created() {
    this.initPageData()
  },
  methods: {
    tabIcon(index, icon, icon2) {
      const iconImg = index === this.activeTab ? icon : icon2
      return 'img:' + iconImg
    },
    async initPageData() {
      this.loading = true
      try {
        const response = await this.getData(API_ADDRESS.homePage.base)
        this.tabs = response.data.data.tabs
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
  .why-soalaa{
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 31px;
    letter-spacing: -0.03em;
    color: #6D708B;
    padding:20px 0 16px 0;
    @media screen and (max-width: 1439px){

    }
    @media screen and (max-width: 1023px){
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      padding:10px 0 16px 0;
    }
    @media screen and (max-width: 599px){
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      padding:4px 0 8px 0;
    }
  }
  .tab-title{
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 56px;
    text-align: center;
    letter-spacing: -0.03em;
    color: #434765;
    margin-bottom: 40px;
    @media screen and (max-width: 1439px){
      font-size: 36px;
      line-height: 56px;
      margin-bottom: 24px;
    }
    @media screen and (max-width: 1023px){
      font-size: 24px;
      line-height: 37px;
      margin-bottom: 16px;
    }
    @media screen and (max-width: 599px){
      font-size: 20px;
      line-height: 31px;
      margin-bottom: 20px;
      padding: 0 34px;
    }
  }

  .tab-panel-container{
    margin-bottom: 80px;
    @media screen and (max-width: 1439px) {
      margin-bottom: 40px;
    }
    .active-tab{
      :deep(.q-tab__label){
        color: #9690E4 !important;
      }
    }
    .active-container{
      color: #9690E4;
    }
    .tab-box{
      @media screen and (max-width: 1023px){
        width: 265px;
        margin: auto auto 16px;
      }
      .tab-style{
        width: 202px;
        margin: 0 15px 24px 15px;
        height: 60px;
        &:deep(.q-tab__label){
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          line-height: 28px;
          letter-spacing: -0.03em;
          color: #8A8CA6;
          @media screen and (max-width: 1439px){
            font-size: 16px;
            line-height: 25px;
          }
          @media screen and (max-width: 1023px){
            font-size: 18px;
            line-height: 28px;
          }
        }
        &:deep(.q-tab__content){
          .q-icon{
            width: 28px;
            height: 28px;
          }
        }
        @media screen and (max-width: 1023px){
          margin: 0;
        }
      }
    }

    .tab-content{
      background: rgba(228, 232, 239, .6);
      border-radius: 20px;
      padding: 40px 80px;
      @media screen and (max-width: 1439px){
        flex-direction: column;
        padding: 36px;
      }
      @media screen and (max-width: 1023px){
        padding: 24px;
      }
      @media screen and (max-width: 599px){
        padding: 20px;
      }
      .tab-panel-box{
        display: flex;
        @media screen and (max-width: 1439px){
          flex-direction: column;
        }
        .content{
          margin-right: 40px;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: min-content;
          padding-top: 20px;
          @media screen and (max-width: 1439px){
            margin-right: 0;
            margin-bottom: 20px;
            padding-top: 0px;
          }
          .title{
            font-weight: 700;
            font-size: 24px;
            line-height: 37px;
            letter-spacing: -0.03em;
            color: #434765;
            margin-bottom: 24px;
            @media screen and (max-width: 1439px){
              margin-bottom: 16px;
            }
            @media screen and (max-width: 1023px){
              margin-bottom: 10px;
              font-size: 20px;
              line-height: 31px;
            }
            @media screen and (max-width: 599px){
              font-size: 18px;
              line-height: 28px;
            }
          }
          .description{
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 28px;
            text-align: justify;
            letter-spacing: -0.03em;
            color: #434765;
            margin-bottom: 31px;
            width: 586px;
            @media screen and (max-width: 1439px){
              margin-bottom: 6px;
              font-size: 18px;
              line-height: 28px;
              width: 100%;
            }
            @media screen and (max-width: 1023px){
              margin-bottom: 10px;
              font-size: 16px;
              line-height: 25px;
            }
            @media screen and (max-width: 599px){
              font-size: 14px;
              line-height: 22px;
              margin-bottom: 16px;
            }
          }
          .more-detail{
            align-self: flex-end;
            .btn{
              color: #8075DC;
              font-style: normal;
              font-weight: 600;
              font-size: 18px;
              line-height: 28px;
              letter-spacing: -0.03em;
              @media screen and (max-width: 1439px) {
                font-size: 16px;
                line-height: 25px;
                padding: 0!important;
              }
              &:deep(.q-btn__content){
                margin: 0;
              }
              &:deep(.q-icon){
                font-size: 22px;
                @media screen and (max-width: 1023px) {
                  font-size: 16px;
                  line-height: 25px;
                }
              }
            }
          }
        }
        .img-box{
          width:576px;
          height: 360px;
          border-radius: 20px;
          @media screen and (max-width: 1439px){
            width: 100%;
            height: 314px;
            border-radius: 16px;
          }
          @media screen and (max-width: 1023px){
            height: 308px;

          }
          @media screen and (max-width: 599px){
            height: 169px;
            border-radius: 12px;
          }
          .img{
            width: 100%;
            height: 100%;
            border-radius: inherit;
          }
        }
      }
    }
  }
}

</style>
