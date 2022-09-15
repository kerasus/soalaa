<template>
  <div class="bg-pink-1 text-bold"> hi home page </div>
  <q-skeleton v-if="loading"
              class="full-width slider-loading"
              height="520px" />
  <q-carousel
    v-else
    v-model="slide"
    animated
    navigation
    infinite
    prev-icon=""
    :autoplay="autoplay"
    arrows
    transition-prev="slide-right"
    transition-next="slide-left"
    class="slider"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = false"
  >
    <q-carousel-slide v-for="(pic, index) in pageData.slider "
                      :key="index"
                      :name="index"
                      :img-src="pic" />
  </q-carousel>
  <div class="why-soalaa">
    چرا سوالا؟
  </div>
  <div class="tab-title">
    متفاوت‌ترین پلتفرم آزمون آنلاین و بانک سوال ایران
  </div>
  <div class="tab-container">
    <q-tabs
      v-model="activeTab"
      inline-label
      outside-arrows
      mobile-arrows
      indicator-color="transparent"
      active-class=""
      class=""
    >
      <q-tab v-for="(tab, index) in pageData.tabs"
             :key="index"
             :name="index"
             class="tab-style"
             :label="tab.key"
      />
    </q-tabs>
    <q-tab-panels v-model="activeTab"
                  animated
                  class="tab-content">
      <q-tab-panel v-for="(tabData, index) in pageData.tabs"
                   :key="index"
                   class="q-pa-none flex"
                   :name="index">
        <div class="content-box">
          <div class="title"> {{tabData.key}}</div>
          <div class="description">{{tabData.value}}</div>
          <div v-if="tabData.link"
               class="more-detail text-right">
            <q-btn
              flat
              :to="tabData.link"
              style="color: #8075DC"
              class="btn"
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
  <q-skeleton v-if="loading"
              class="full-width slider-loading"
              height="520px" />
  <div v-else
       class="bank-soalaa flex">
    <div class="content">
      <div class="title">
        بانک سوالا
      </div>
      <div class="sub-title">
        {{pageData.bank_soala.title}}
      </div>
      <div v-for="(item, index) in pageData.bank_soala.value"
           :key="index"
           class="soalaa-item">
        <q-icon size="7px"
                name="circle" />
        {{item}}
      </div>
    </div>
    <div class="img-box">
      <q-img
        class="img"
        :srs="pageData.bank_soala.image" />
    </div>
  </div>
  <div class="sub-mit-box flex justify-between">
    <div class="info">با ورود و یا ثبت نام در سوالا میتوانید محتوای شخصی سازی شده و مربوط به خود را دنبال کنید</div>
    <div class="action-box">

    </div>
  </div>

</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
// import { axios } from 'src/boot/axios'
export default {
  name: 'home-page',
  data: () => ({
    pageData: [],
    slide: 1,
    autoplay: true,
    loading: true,
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
  mounted() {
    this.closeSidBarAndAppbar()
  },
  methods: {
    closeSidBarAndAppbar () {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
      // this.$store.commit('AppLayout/updateLayoutHeaderVisible', false)
    },
    async initPageData() {
      this.loading = true
      try {
        const response = await this.getData(API_ADDRESS.homePage.base)
        this.pageData = response.data.data
        // this.pageData = await this.call(API_ADDRESS.homePage.base)
        console.log(this.pageData)
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
    // call(t) {
    //   return axios.get(t)
    // }
  }

}
</script>

<style scoped lang="scss">
.slider{
  border-radius: 30px;
  height: 520px;
  margin: 40px 0;
  @media screen and (max-width: 1439px){
    height: 364px;
  }
  @media screen and (max-width: 1023px){
    height: 360px;
  }
  @media screen and (max-width: 599px){
    height: 360px;
  }
}
.slider-loading{
  border-radius: 30px;
}
.why-soalaa{
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 31px;
  letter-spacing: -0.03em;
  color: #6D708B;
  margin:20px 0 16px 0;
}
.tab-title{
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 56px;
  text-align: center;
  letter-spacing: -0.03em;
  color: #434765;
  margin-bottom: 32px;
}
.tab-container{
  margin-bottom: 80px;
  .active-container{
    color: #9690E4;
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
    }

  }
  .tab-content{
    background: rgba(228, 232, 239, .6);
    border-radius: 20px;
    padding: 40px 80px;
    .content-box{
      margin-right: 40px;
      .title{
        font-weight: 700;
        font-size: 24px;
        line-height: 37px;
        letter-spacing: -0.03em;
        color: #434765;
        margin-bottom: 24px;
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
      }
      .more-detail{

        .btn{
          color: #8075DC;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 28px;
          letter-spacing: -0.03em;
        }
      }
    }
    .img-box{
      width:576px;
      height: 360px;
      border-radius: 20px;
      .img{
        width: 100%;
        height: 100%;
        border-radius: inherit;
      }
    }

  }
}
.bank-soalaa{
  padding: 40px 120px;
  background: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 24px;
  margin-bottom: 80px;
  .content{
    margin-right: 135px;
    width: 587px;
    .title{
      font-style: normal;
      font-weight: 800;
      font-size: 40px;
      line-height: 62px;
      color: #8075DC;
      margin-bottom: 10px;
    }
    .sub-title{
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 34px;
      letter-spacing: -0.03em;
      color: #6D708B;
      margin-bottom: 10px;

    }
    .soalaa-item{
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      letter-spacing: -0.03em;
      color: #6D708B;
      margin-bottom: 6px;
      .badge{
        background: #6D708B;
      }

    }
  }
  .img-box{
    width: 400px;
    height: 400px;
    .img{
      width: 100%;
      height: 100%;
    }
  }
}
.sub-mit-box{
  background: #FFFFFF;
  border-radius: 16px;
  padding: 30px 80px;
  .info{
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.03em;
    color: #000000;
  }
}
</style>
