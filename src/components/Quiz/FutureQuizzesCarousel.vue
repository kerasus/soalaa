<template>
  <div class="carousel-navigation">
    <div class="future-test-title">
      آزمون های پیش رو
    </div>
    <div class="carousel-navigation-btn-wrapper">
      <q-btn color="white"
             class="carousel-navigation-btn left"
             text-color="black"
             icon="chevron_right"
             @click="prevSlide()" />
      <q-btn color="white"
             class="carousel-navigation-btn"
             text-color="black"
             icon="chevron_left"
             @click="nextSlide()" />
    </div>
  </div>
  <carousel ref="carousel"
            dir="rtl"
            :items-to-show="$q.screen.lt.sm ? 1.4 : $q.screen.lt.md ? 2 : $q.screen.lt.lg ? 2.3 : 3"
            style="width:100%;height: 200px; background: transparent;">
    <slide v-for="slide in 10"
           :key="slide">
      <div class="test-col">
        <div class="test-box">
          <div class="test-box-content">
            <div class="test-box-image">
              <img v-if="slide.image !== undefined"
                   :src="slide.image"
                   alt="image">
            </div>
            <div class="test-box-info">
              <div class="test-box-title">
                {{'آزمون دوازدهم انسانی خرداد ماه در دبیرستان البرز تهران'.substring(0,35)}}...
              </div>
              <div class="test-box-category">
                آزمون سه آ
              </div>
              <div v-if="!$q.screen.lt.sm"
                   class="test-box-schedule">
                <div class="test-box-date">
                  <q-icon name="schedule" />
                  ۲۵ اردیبهشت ۱۴۰۱
                </div>
                |
                <div class="test-box-time">
                  ساعت ۱۲:۰۰
                </div>
              </div>
            </div>
          </div>
          <div class="test-box-schedule">
            <div class="test-box-date">
              <q-icon name="schedule" />
              ۲۵ اردیبهشت ۱۴۰۱
            </div>
            |
            <div class="test-box-time">
              ساعت ۱۲:۰۰
            </div>
          </div>
          <div class="test-box-footer"
               :class="slide == 1 ? 'active' : ''">
            <div class="test-time">
              {{ slide == 1 ? 'آزمون شروع شده' : '۳ روز مانده'}}
            </div>
            <a v-if="slide == 1"
               href="#"
               class="test-link">
              ورود به آزمون
              <q-icon name="arrow_back_ios" />
            </a>
          </div>
        </div>
      </div>
    </slide>
  </carousel>
</template>

<script>
import { defineComponent, ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

export default defineComponent({
  name: 'FutureQuizzesCarousel',
  components: {
    Carousel,
    Slide
  },
  setup() {
    const carousel = ref()
    const nextSlide = () => {
      carousel.value.next()
    }
    const prevSlide = () => {
      carousel.value.prev()
    }

    return {
      carousel,
      nextSlide,
      prevSlide
    }
  }
})
</script>

<style lang="scss" scoped>
.carousel-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 20px;

  .carousel-navigation-btn-wrapper {

    .carousel-navigation-btn {
      width: 32px;
      height: 32px;
      background: #FFFFFF;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
      border-radius: 6px;

      &.left {
        margin-right: 16px;
      }
    }
  }

  .future-test-title {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    text-align: right;
    color: #434765;
  }
}

.test-col {
  .test-box {
    position: relative;
    width: 330px;
    height: 177px;
    background: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 16px;

    .test-box-content {
      padding: 16px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .test-box-image {
        background: #d2d2d2;
        width: 102px;
        height: 102px;
        border-radius: 8px;

        @media screen and (max-width: 600px) {
          width: 64px;
          height: 64px;
        }
      }

      .test-box-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-left: 16px;

        .test-box-title {
          width: 180px;
          height: 50px;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 25px;
          text-align: left;
          color: #434765;

          @media screen and (max-width: 600px) {
            width: 130px;
            height: 40px;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.03em;
          }
        }

        .test-box-category {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
          text-align: right;
          color: #6D708B;

          @media screen and (max-width: 600px) {
            font-weight: 400;
            font-size: 12px;
            line-height: 19px;
            padding-top: 8px;
          }
        }
      }

      @media screen and (max-width: 600px) {
        padding: 16px 16px 0;
      }
    }

    .test-box-schedule {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #6D708B;

      .test-box-date {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        text-align: right;
        letter-spacing: -0.03em;
        color: #6D708B;
        margin-right: 8px;

        @media screen and (max-width: 600px) {
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
        }
      }

      .test-box-time {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        text-align: right;
        letter-spacing: -0.03em;
        color: #6D708B;
        margin-left: 8px;

        @media screen and (max-width: 600px) {
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
        }
      }

      @media screen and (max-width: 600px) {
        padding-left: 16px;
        padding-top: 5px;
      }
    }

    .test-box-footer {
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      bottom: 0;
      width: 330px;
      height: 43px;
      background: #F4F3FF;
      border-radius: 0px 0px 16px 16px;

      .test-time {
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 19px;
        text-align: right;
        color: #E86562;

        @media screen and (max-width: 600px) {
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
        }
      }

      .test-link {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        text-align: right;
        color: #FFFFFF;
        text-decoration: none;

        @media screen and (max-width: 600px) {
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
        }
      }

      &.active {
        background: #FFB74D;

        .test-time {
          color: #FFFFFF;
        }
      }

      @media screen and (max-width: 600px) {
        width: 230px;
        height: 36px;
      }
    }

    @media screen and (max-width: 600px) {
      width: 230px;
      height: 150px;
    }
  }
}
.carousel__slide {
  padding: 10px;
  min-height: 200px;
}

  </style>
