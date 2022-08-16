<template>
  <div class="landing-3a-features-container">
    <div class="landing-3a-features-title">ویژگی های آزمون سه‌آ</div>

    <div class="landing-3a-features">
      <div class="landing-3a-feature">
        <q-img :width="imageWidth"  src="https://nodes.alaatv.com/upload/landing/3a/7.png"/>
        <p class="feature-title">سه‌آ در سه شنبه ها</p>
      </div>

      <div class="landing-3a-feature">
        <q-img :width="imageWidth"  src="https://nodes.alaatv.com/upload/landing/3a/8.png"/>
        <p class="feature-title">راحت در موبایل</p>
      </div>

      <div class="landing-3a-feature">
        <q-img :width="imageWidth"  src="https://nodes.alaatv.com/upload/landing/3a/9.png"/>
        <p class="feature-title">کارنامه آنی</p>
      </div>

      <div class="landing-3a-feature">
        <q-img :width="imageWidth"  src="https://nodes.alaatv.com/upload/landing/3a/10.png"/>
        <p class="feature-title">تست‌ها مطابق کنکور</p>
      </div>

      <div class="landing-3a-feature">
        <q-img :width="imageWidth"  src="https://nodes.alaatv.com/upload/landing/3a/12.png"/>
        <p class="feature-title">پاسخنامه ویدئویی</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '3aFeatures',
  data () {
    return {
      imageWidthList: [
        { xl: '240px', lg: '192px', md: '242px', sm: '212px', xs: '272px' },
        { xl: '191px', lg: '154px', md: '192px', sm: '169px', xs: '220px' },
        { xl: '191px', lg: '154px', md: '168px', sm: '169px', xs: '210px' },
        { xl: '140px', lg: '108px', md: '131px', sm: '126px', xs: '146px' },
        { xl: '121px', lg: '91px', md: '128px', sm: '104px', xs: '130px' }
      ],
      currentImagesWidthList: []
    }
  },
  computed: {
    imageWidth () {
      return this.setImageWidth()
    },

    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    }
  },
  methods: {
    setImageWidth () {
      this.currentImagesWidthList = []

      if (this.windowSize.x > 1439) {
        this.imageWidthList.forEach(item => {
          this.currentImagesWidthList.push(item.xl)
        })
      } else if (this.windowSize.x > 1023) {
        this.imageWidthList.forEach(item => {
          this.currentImagesWidthList.push(item.lg)
        })
      } else if (this.windowSize.x > 768) {
        this.imageWidthList.forEach(item => {
          this.currentImagesWidthList.push(item.md)
        })
      } else if (this.windowSize.x > 600) {
        this.imageWidthList.forEach(item => {
          this.currentImagesWidthList.push(item.sm)
        })
      } else {
        this.imageWidthList.forEach(item => {
          this.currentImagesWidthList.push(item.xs)
        })

        return this.currentImagesWidthList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.landing-3a-features-container {
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 767px) {
    padding-bottom: 55px;
  }

  @media only screen and (max-width: 599px) {
    padding-bottom: 43px;
  }

  .landing-3a-features-title {
    text-align: center;
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
    line-height: 42px;
    color: #232323;
    margin-bottom: 30px;

    @media only screen and (max-width: 768px) {
      font-size: 24px;
    }

    @media only screen and (max-width: 600px) {
      font-size: 20px;
      margin-bottom: 16px;
    }
  }

  .landing-3a-features {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media only screen and (max-width: 600px) {
      width: 300px;
    }

    .landing-3a-feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 350px;
      height: 286px;

      @media only screen and (max-width: 1439px) {
        width: 290px;
        height: 230px;
      }

      @media only screen and (max-width: 1023px) {
        width: 210px;
      }

      @media only screen and (max-width: 768px) {
        width: 150px;
        height: 167px;
      }

      @media only screen and (max-width: 600px) {
        width: 144px;
        height: 164px;
      }

      .feature-title {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 32px;
        color: #1E1E1E;

        @media only screen and (max-width: 1439px) {
          font-size: 18px;
        }

        @media only screen and (max-width: 768px) {
          font-size: 16px;
        }

        @media only screen and (max-width: 600px) {
          font-size: 12px;
        }
      }
    }
  }

}
</style>
