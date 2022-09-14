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
    yuyu :  {{activeTab}}
    <q-tab-panels v-model="activeTab"
                  animated
                  class="tab-content">
      <q-tab-panel v-for="(tabData, index) in pageData.tabs"
                   :key="index"
                   :name="index">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>

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
  margin-bottom: 100px;
  .active-container{
    color: #9690E4;
  }
  .tab-style{
    width: 202px;
    margin: 0 15px;
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

  }
}
</style>
