<template>
  <div class="page-width">
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
      <q-carousel-slide v-for="(pic, index) in slideList"
                        :key="index"
                        :name="index"
                        :img-src="pic" />
    </q-carousel>
  </div>

</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'Slider',
  data: () => ({
    loading: false,
    slideList: [],
    slide: 1,
    autoplay: false
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
    async initPageData() {
      this.loading = true
      try {
        const response = await this.getData(API_ADDRESS.homePage.base)
        this.slideList = response.data.data.slider
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
  margin: 0 auto;
  @media screen and (max-width:1439px ){
    width: 954px;
  }
  @media screen and (max-width:1023px ){
    width: 540px;
  }
  @media screen and (max-width:599px ){
    width: 100%;
    padding-left: 19px;
    padding-right: 19px;
  }
}
.slider{
  border-radius: 30px;
  height: 520px;
  margin: 40px 0;
  @media screen and (max-width: 1439px){
    height: 364px;
    margin: 30px 0;
    border-radius: 20px;
    &:deep(.q-carousel__next-arrow--horizontal){
        display: none;
    }
    &:deep(.q-carousel__prev-arrow--horizontal){
        display: none;
    }
  }
  @media screen and (max-width: 1023px){
    border-radius: 16px;
  }
  @media screen and (max-width: 599px){
    margin: 16px 0;
    height: 208px;
  }

  &:deep(.q-carousel__navigation-inner){
    .q-btn__content{
      margin: 0;
    }
    .q-btn{
      width: 8px !important;
      height: 8px !important;
      min-width: 8px !important;
      min-height: 8px !important;
      margin: 0 2px;
      padding: 0;
      i{
        font-size: 8px;
      }
      @media screen and (max-width: 599px){
        width: 4px !important;
        height: 4px !important;
        min-width: 4px !important;
        min-height: 4px !important;
        margin: 0 2px;
        padding: 0;
        i{
          font-size: 4px;
        }
      }
    }
    .q-carousel__navigation-icon--active{
      width: 12px !important;
      height: 12px !important;
      min-width: 12px !important;
      min-height: 12px !important;
      margin: 0 2px;
      padding: 0;
      i{
        font-size: 12px;
      }
      @media screen and (max-width: 599px){
        width: 8px !important;
        height: 8px !important;
        min-width: 8px !important;
        min-height: 8px !important;
        margin: 0 2px;
        padding: 0;
        i{
          font-size: 8px;
        }
      }
    }
  }
  &:deep(.q-carousel__navigation-icon--active){
    .q-btn{
      .q-spinner{
        font-size: 15px;
      }
    }
  }
}
.slider-loading{
  border-radius: 30px;
}
</style>
