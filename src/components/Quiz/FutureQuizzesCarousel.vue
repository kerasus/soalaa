<template>
  <div class="carousel-navigation">
    <div class="future-test-title">
      آزمون های پیش رو
    </div>
    <template v-if="exams.loading">
      کمی صبر کنید...
    </template>
    <template v-else>
      <div class="carousel-navigation-btn-wrapper">
        <q-btn color="white"
               unelevated
               class="carousel-navigation-btn left"
               text-color="black"
               icon="chevron_right"
               @click="prevSlide()" />
        <q-btn color="white"
               unelevated
               class="carousel-navigation-btn"
               text-color="black"
               icon="chevron_left"
               @click="nextSlide()" />
      </div>
    </template>
  </div>
  <carousel v-if="exams.list.length > 0"
            ref="carousel"
            dir="rtl"
            :items-to-show="$q.screen.lt.sm ? 1.4 : $q.screen.lt.md ? 2 : $q.screen.lt.lg ? 2.3 : 3"
            style="width:100%;height: 200px; background: transparent;">
    <slide v-for="slide in exams.list"
           :key="slide">
      <div class="test-col">
        <div class="test-box">
          <div class="test-box-content">
            <div class="test-box-image">
              <q-img v-if="!!slide.photo"
                     :src="slide.photo"
                     class="img"
                     alt="image" />
            </div>
            <div class="test-box-info">
              <div class="test-box-title">
                {{slide.title.substring(0,35)}}...
              </div>
              <div class="test-box-category">
                آزمون سه آ
              </div>
              <div v-if="!$q.screen.lt.sm"
                   class="test-box-schedule">
                <div class="test-box-date">
                  <q-icon name="schedule" />
                  {{ getExamStartAtTitledDate(slide.start_at) }}
                </div>
                |
                <div class="test-box-time">
                  ساعت
                  {{getExamStartAtTime(slide.start_at)}}
                </div>
              </div>
            </div>
          </div>
          <div class="test-box-schedule">
            <div class="test-box-date">
              <q-icon name="schedule" />
              {{ getExamStartAtTitledDate(slide.start_at) }}
            </div>
            |
            <div class="test-box-time">
              ساعت
              {{getExamStartAtTime(slide.start_at)}}
            </div>
          </div>
          <div
            class="test-box-footer"
            :class="true ? 'active' : ''"
          >
            <div v-if="!isExamStarted"
                 class="test-time">
              {{ getExamRemainingTime(slide.start_at) }}
              مانده
            </div>
            <div v-else
                 class="test-time">
              آزمون شروع شده
            </div>
            <div
              v-if="isExamStarted"
              class="test-link">
              <router-link
                :to="getExamRoute(slide)"
                style="text-decoration: none; color: #FFFFFF;"
              >
                ورود به آزمون
                <q-icon name="arrow_back_ios" />
              </router-link>
            </div>
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
import { ExamList } from 'src/models/Exam'
import moment from 'moment'
import ShamsiDate from 'src/plugins/ShamsiDate'
import Time from 'src/plugins/time'

export default defineComponent({
  name: 'FutureQuizzesCarousel',
  components: {
    Carousel,
    Slide
  },
  props: {
    exams: {
      type: ExamList,
      default: new ExamList()
    }
  },
  methods: {
    getExamStartAtTitledDate (dateTime) {
      return ShamsiDate.getTitledDate(dateTime)
    },
    getExamStartAtTime (dateTime) {
      return moment(dateTime, 'YYYY-M-D hh:mm:ss').format('hh')
      // return '2023-02-27 12:00:00'
    },
    getExamRemainingTime (dateTime) {
      const remainingTime = Time.getRemainTime(dateTime)
      const msRemainingTime = Time.getRemainTime(dateTime, false)
      if (msRemainingTime < 0) {
        this.isExamStarted = true
      } else {
        return this.getTitledTime(remainingTime)
      }
    },
    getTitledTime (time) {
      const timePieces = time.split(':')
      if ((parseInt(timePieces[0]) > 23)) {
        return Math.round(timePieces[0] / 24) + ' روز'
      }
      return time
    }
  },
  computed: {
    getExamRoute () {
      return (exam) => {
        let routeName = 'onlineQuiz.alaaView'
        if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
          routeName = 'onlineQuiz.mbtiBartle'
        }

        return { name: routeName, params: { quizId: exam.id, questNumber: 1 } }
      }
    }
  },
  setup() {
    const isExamStarted = ref(false)
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
      prevSlide,
      isExamStarted
    }
  }
})
</script>

<style lang="scss" scoped>
.carousel-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 20px;

  .carousel-navigation-btn-wrapper {

    .carousel-navigation-btn {
      width: 28px;
      height: 28px;
      max-height: 28px;
      min-height: 28px;
      background: #FFFFFF;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
      border-radius: 6px;

      &:deep(.q-btn__content) {
        margin: 0;
      }

      &:deep(.q-icon) {
        color: #6D708B;
        font-weight: 400;
      }

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
        .img{
          width: 100%;
          height: 100%;
          border-radius: inherit;
          :deep(.q-img__image){
            object-fit: fill !important;
          }
        }

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
