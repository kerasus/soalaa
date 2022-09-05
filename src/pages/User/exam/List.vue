<template>
  <div
    class="userExamList"
    style="font-size: 16px;"
  >
    <!--    ToDo : add confirm-dialog-->
    <!--    <vue-confirm-dialog />-->
    <div class="fit row wrap justify-center items-start content-start"
    >
      <div class="col col-12 examList-container">
        <!-- TODO:
          - slider load data
          - tab & tab panel
          - load tab panels data
          - paginator for tab panels
        -->
        <div v-if="exams.list.length > 0 && !loadingList"
             class="slider-row">
          <div class="carousel-navigation">
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
          <carousel ref="carousel"
                    dir="rtl"
                    :items-to-show="3"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Exam, ExamList } from 'src/models/Exam'
import { mixinAuth, mixinQuiz } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

export default {
  name: 'List',
  //       ToDo : ProgressLinear
  components: {
    Carousel,
    Slide
  },
  mixins: [mixinAuth, mixinQuiz],
  data: () => ({
    preventStartExam: false,
    examItem: new Exam(),
    exams: new ExamList(),
    loadingList: false,
    slide: 'style'
  }),
  created () {
    this.getExams()
  },
  watch: {
    loadingList () {
      if (this.loadingList) {
        this.$store.commit('loading/loading', true)
      } else {
        this.$store.commit('loading/loading', false)
      }
    }
  },
  mounted () {
    this.disconnectSocket()
  },
  methods: {
    nextSlide() {
      this.$refs.carousel.next()
    },
    prevSlide() {
      this.$refs.carousel.prev()
    },
    goToResult (exam) {
      let routeName = 'user.exam.results'
      if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
        routeName = 'mbtiBartle.result'
      }
      this.$router.push({ name: routeName, params: { user_exam_id: exam.user_exam_id, exam_id: exam.id } })
    },
    goToParticipateExamPage (exam) {
      let routeName = 'onlineQuiz.alaaView'
      if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
        routeName = 'onlineQuiz.mbtiBartle'
      }
      this.$router.push({ name: routeName, params: { quizId: exam.id, questNumber: 1 } })
    },
    getConfirmation (userExamId) {
      const that = this
      this.$store.commit('AppLayout/showConfirmDialog', {
        message: 'مطمئنی؟ نتیجه شما پس از تایید، ثبت و رتبه شما محاسبه خواهد شد و به اندازه میانگین درصدهای شما، کد تخفیف همه محصولات آلاء برای شما ارسال خواهد شد. مثلا اگر میانگین درصدهای شما 60% باشد یک کد تخفیف 60% دریافت خواهید کرد',
        button: {
          no: 'ادامه میدم',
          yes: 'ثبت میکنم'
        },
        callback: (confirm) => {
          if (!confirm) {
            return
          }
          that.sendAnswersAndFinishExam(userExamId)
        }
      })
    },
    continueExam (exam) {
      let routeName = 'onlineQuiz.alaaView'
      if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
        routeName = 'onlineQuiz.mbtiBartle'
      }
      this.$router.push({ name: routeName, params: { quizId: exam.id, questNumber: 1 } })
    },
    getExams () {
      const that = this
      this.loadingList = true
      // this.user.getUserExams()
      this.$axios.get(API_ADDRESS.exam.userExamsList)
        .then((response) => {
          this.user.exams = new ExamList(response.data.data.exams)
          this.user.exams.loading = false
          this.exams = new ExamList(response.data.data.exams)
          this.loadingList = false
        })
        .catch(() => {
          that.loadingList = false
        })
    },
    registerExam (exam) {
      this.$axios.post(API_ADDRESS.exam.registerExam, { exam_id: exam.id })
        .then((response) => {
          if (response.data.data.redirect_url) {
            window.location.href = response.data.data.redirect_url
          } else {
            this.$q.notify({
              type: 'positive',
              message: 'ثبت نام در آزمون با موفقیت انجام شد',
              position: 'top'
            })
            this.getExams()
          }
        })
    },
    sendAnswersAndFinishExam (userExamId) {
      if (!this.hasExamDataOnThisDeviseStorage(userExamId)) {
        this.$q.notify({
          type: 'negative',
          message: 'در این سیستم پاسخنامه شما ثبت نشده است. لطفا از سیستمی که با آن در آزمون شرکت کرده اید استفاده کنید و این دکمه را بزنید.',
          position: 'top'
        })
        return
      }
      const that = this
      this.sendUserQuestionsDataToServerAndFinishExam(userExamId)
        .then(() => {
          that.$q.notify({
            type: 'positive',
            message: 'اطلاعات آزمون شما ثبت شد.',
            position: 'top'
          })
          that.$store.commit('Exam/clearExamData', userExamId)
          that.$router.push({ name: 'user.exam.list' })
        })
        .catch(() => {
          that.$q.notify({
            type: 'negative',
            message: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
            position: 'top'
          })
          this.getExams()
        })
    },
    downloadBooklet (bookletUrl) {
      window.open(bookletUrl, '_blank').focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-row {

  .carousel-navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 10px 20px;

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
          }

          .test-box-category {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 19px;
            text-align: right;
            color: #6D708B;
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
            }
          }
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
        }

        .test-link {
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 22px;
          text-align: right;
          color: #FFFFFF;
          text-decoration: none;
        }

        &.active {
          background: #FFB74D;

          .test-time {
            color: #FFFFFF;
          }
        }
      }
    }
  }
}

.carousel__slide {
  padding: 10px;
  min-height: 200px;
}

</style>
