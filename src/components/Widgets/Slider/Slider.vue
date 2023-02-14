<template>
  <div class="page-width"
       :style="options.style">
    <q-skeleton v-if="loading"
                class="full-width slider-loading"
                height="520px" />
    <!--    <q-carousel-->
    <!--      v-else-->
    <!--      v-model="slide"-->
    <!--      animated-->
    <!--      navigation-->
    <!--      infinite-->
    <!--      prev-icon=""-->
    <!--      :autoplay="autoplay"-->
    <!--      arrows-->
    <!--      transition-prev="slide-right"-->
    <!--      transition-next="slide-left"-->
    <!--      class="slider"-->
    <!--      @mouseenter="autoplay = false"-->
    <!--      @mouseleave="autoplay = false"-->
    <!--    >-->
    <!--      <q-carousel-slide v-for="(pic, index) in slideList"-->
    <!--                        :key="index"-->
    <!--                        :name="index"-->
    <!--                        :img-src="pic" />-->
    <!--    </q-carousel>-->
    <q-carousel v-else
                v-model="slide"
                :arrows="options.list.length > 1 ? defaultOptions.controlNavigation.arrows : false"
                :prev-icon="defaultOptions.controlNavigation.prevIcon"
                :next-icon="defaultOptions.controlNavigation.nextIcon"
                :navigation="options.list.length > 1 ? defaultOptions.controlNavigation.navigation : false"
                :navigation-position="defaultOptions.controlNavigation.navigationPosition"
                :navigation-icon="defaultOptions.controlNavigation.navigationIcon"
                :navigation-active-icon="defaultOptions.controlNavigation.navigationActiveIcon"
                :thumbnails="defaultOptions.controlNavigation.thumbnails"
                :control-color="defaultOptions.controlNavigation.controlColor"
                :control-text-color="defaultOptions.controlNavigation.controlTextColor"
                :control-type="defaultOptions.controlNavigation.controlType"
                :animated="defaultOptions.transition.animated"
                :infinite="defaultOptions.transition.infinite"
                :swipeable="defaultOptions.transition.swipeable"
                :autoplay="defaultOptions.transition.autoplay"
                :transition-prev="defaultOptions.transition.transitionPrev"
                :transition-next="defaultOptions.transition.transitionNext"
                :transition-duration="defaultOptions.transition.transitionDuration"
                :height="defaultOptions.styles.height ? defaultOptions.styles.height : 'auto'"
                :class="defaultOptions.styles.classes"
                class="slider-widget">
      <q-carousel-slide v-for="(slide, index) in options.list"
                        :key="index"
                        :name="index">
        <a :href="slide.link">
          <lazy-img v-if="slide.photo.src !== ''"
                    :src="slide.photo.src"
                    :alt="slide.title" />
          <lazy-img v-else
                    qImage="true"
                    :src="responsiveFeatures(slide.features).src"
                    :alt="slide.title" />
          <q-tooltip v-if="slide.title"
                     :offset="[18, 18]">
            {{ slide.title }}
          </q-tooltip>
        </a>
      </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control :position="defaultOptions.control.position"
                            :offset="defaultOptions.control.offset"
                            :class="defaultOptions.control.class">
          <slot name="controls-content" />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<!--<script>-->
<!--import API_ADDRESS from 'src/api/Addresses'-->
<!--export default {-->
<!--  name: 'Slider',-->
<!--  data: () => ({-->
<!--    loading: false,-->
<!--    slideList: [],-->
<!--    slide: 1,-->
<!--    autoplay: false-->
<!--  }),-->
<!--  props: {-->
<!--    getData: {-->
<!--      type: Function,-->
<!--      default: () => {}-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.initPageData()-->
<!--  },-->
<!--  methods: {-->
<!--    async initPageData() {-->
<!--      this.loading = true-->
<!--      try {-->
<!--        const response = await this.getData(API_ADDRESS.homePage.base)-->
<!--        this.slideList = response.data.data.slider-->
<!--        this.loading = false-->
<!--      } catch (e) {-->
<!--        this.loading = false-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<script>
import { ref } from 'vue'
import { BannerList } from 'src/models/Banner.js'
// import { mixinWidget } from 'src/mixin/Widgets.js'
import lazyImg from '../../../components/lazyImg.vue'

export default {
  name: 'Slider',
  components: { lazyImg },
  // mixins: [mixinWidget],
  props: {
    options: {
      type: Object,
      default () {
        return new BannerList()
      }
    }
  },
  data () {
    return {
      loading: false,
      slide: ref(null),
      fullscreen: ref(false),
      windowWidth: 0,
      defaultOptions: {
        control: {
          position: 'bottom',
          offset: [18, 18],
          class: ''
        },
        styles: {
          classes: '',
          height: ''
        },
        controlNavigation: {
          arrows: true,
          prevIcon: '',
          nextIcon: '',
          navigation: true,
          navigationPosition: 'bottom',
          navigationIcon: '',
          navigationActiveIcon: '',
          thumbnails: false,
          controlColor: 'primary',
          controlTextColor: '',
          controlType: 'flat'
        },
        transition: {
          animated: true,
          infinite: true,
          swipeable: true,
          autoplay: false,
          transitionPrev: 'fade',
          transitionNext: 'fade',
          transitionDuration: 300
        }
      }
    }
  },
  mounted () {
    if (this.options && this.options.list && this.options.list.length > 0) {
      this.slide = 0
    }
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    },
    responsiveFeatures (features) {
      if (this.windowWidth >= 1920) {
        return features.xl.src !== '' ? features.xl : features.lg.src !== '' ? features.lg : features.sm.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return features.lg.src !== '' ? features.lg : features.md.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.xl
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return features.md.src !== '' ? features.md : features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.lg.src !== '' ? features.lg : features.xl
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return features.sm.src !== '' ? features.sm : features.xs.src !== '' ? features.xs : features.md.src !== '' ? features.md : features.lg.src !== '' ? features.lg : features.xl
      } else if (this.windowWidth <= 599) {
        return features.xs.src !== '' ? features.xs : features.sm.src !== '' ? features.sm : features.md.src !== '' ? features.md : features.lg.src !== '' ? features.lg : features.xl
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page-width{
  //width: 100%;
  margin: 0 auto;
  @media screen and (max-width:1439px ){
    //width: 954px;
    //width: 100%;
  }
  @media screen and (max-width:1023px ){
    //width: 540px;
    //width: 100%;
  }
  @media screen and (max-width:599px ){
    //width: 100%;
    padding-left: 19px;
    padding-right: 19px;
  }

  .q-carousel.slider-widget {
    .q-carousel__slides-container {
      .q-panel.scroll {
        .q-carousel__slide {
          padding: 0;
        }
      }
    }
  }
}
.slider-loading{
  border-radius: 30px;
}
</style>
