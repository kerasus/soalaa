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
.slider{
  border-radius: 30px;
  height: 520px;
  margin: 40px 0;
  @media screen and (max-width: 1439px){
    height: 364px;
    margin: 30px 0;
  }
  @media screen and (max-width: 1023px){

  }
  @media screen and (max-width: 599px){
    margin: 16px 0;
  }
  &:deep(.q-carousel__navigation-inner){
    .q-btn{
      margin: 0;
      padding: 0;
      .q-spinner{
        font-size: 10px;
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
