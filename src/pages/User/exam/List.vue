<template>
  <div>
<!--    ToDo : add confirm-dialog-->
<!--    <vue-confirm-dialog />-->
    <div class="row">
      <div class="col">
        <progress-linear :active="loadingList" />
        <q-banner
          v-if="exams.list.length === 0 && !loadingList"
          inline-actions rounded class="bg-blue text-white">
          <template v-slot:avatar>
            <q-icon name="mdi-information" color="white"></q-icon>
          </template>
          آزمونی وجود ندارد
        </q-banner>
        <div class="row" v-if="exams.list.length > 0 && !loadingList">
          <div class="col">
            <div class="row table-header">
              <div class="col col-3 pr-7"
              >
                عنوان
              </div>
              <div class="col col-2" >
                زمان شروع آزمون
              </div>
              <div class="col col-2"
                v-if="false"
              >
                زمان پایان آزمون
              </div>
              <div class="col col-1"
                v-if="false"
              >
                میزان تاخیر مجاز
              </div>
              <div class="col col-7">
                عملیات
              </div>
            </div>
            <div class="row exam-info-bar"
              v-for="item in exams.list"
              :key="item.id"
            >
              <div class="col">
<!--                elevation="0"
                  outlined
                  rounded
                  shaped-->
                <div
                  class="d-flex exam-list-sheet"
                >
                  <div class="row table-row justify-center">
                    <div class="col col-12 col-md-3 pr-7 justify-center"
                    >
                      {{ item.title }}
                    </div>
                    <div class="col col-12 col-md-2"
                    >
                      <span class="d-inline-block-md d-none">
                        زمان شروع آزمون:
                      </span>
                      {{ item.shamsiDate('start_at').dateTime }}
                    </div>
                    <div class="col col-12 col-md-2"
                      v-if="false"
                    >
                      <span class="d-inline-block-md d-none">
                        زمان پایان آزمون:
                      </span>
                      {{ item.shamsiDate('finish_at').dateTime }}
                    </div>
                    <div class="col col-12 col-md-1"
                      v-if="false"
                    >
                      <span class="d-inline-block-md d-none">
                        میزان تاخیر مجاز:
                      </span>
                      {{ item.delay_time }}
                      دقیقه
                    </div>
                    <div class="col col-12 col-md-7"
                    >
                      <q-btn
                        v-if="item.exam_actions.can_register"
                        style="color: #00c753"
                        flat
                        @click="registerExam(item)"
                      >
                        ثبت نام
                      </q-btn>
                      <q-btn
                        v-if="item.exam_actions.can_start"
                        style="color: #ffc107"
                        flat
                        @click="goToParticipateExamPage(item)"
                      >
                        شروع آزمون
                      </q-btn>
                      <q-btn
                        v-if="item.exam_actions.can_continue"
                        color="purple"
                        style="color: purple"
                        flat
                        @click="continueExam(item)"
                      >
                        ادامه آزمون
                      </q-btn>
                      <q-btn
                        v-if="item.exam_actions.can_submit_answer"
                        style="color: #ffc107"
                        flat
                        @click="getConfirmation(item.id, item.user_exam_id)"
                      >
                        ثبت پاسخنامه ذخیره شده در سیستم
                      </q-btn>
                      <q-btn
                        v-if="item.exam_actions.can_see_report"
                        style="color: #00b5e6"
                        flat
                        @click="goToResult(item)"
                      >
                        مشاهده نتایج
                      </q-btn>
                      <q-btn
                        v-if="!!item.holding_status"
                        style="color: #ffc107"
                        flat
                        disabled
                      >
                        {{ item.holding_status }}
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Exam, ExamList } from 'src/models/Exam'
import { mixinAuth, mixinQuiz } from 'src/mixin/Mixins'
import ProgressLinear from 'src/components/ProgressLinear'
// import VueConfirmDialog from 'vue-confirm-dialog'
// import { createApp } from 'vue'
// const app = createApp({})
// app.use(VueConfirmDialog)
// app.component('vue-confirm-dialog', VueConfirmDialog.default)

export default {
  name: 'List',
  components: { ProgressLinear },
  mixins: [mixinAuth, mixinQuiz],
  data: () => ({
    preventStartExam: false,
    examItem: new Exam(),
    exams: new ExamList(),
    loadingList: false
  }),
  created () {
    this.getExams()
  },
  mounted () {
    this.$store.commit('AppLayout/updateAppBarAndDrawer', true)
  },
  methods: {
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
    getConfirmation (examId, examUserId) {
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
          that.sendAnswersAndFinishExam(examId, examUserId)
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
      this.user.getUserExams()
        .then((exams) => {
          that.exams = exams
          that.loadingList = false
        })
        .catch(() => {
          that.loadingList = false
        })
    },
    registerExam (exam) {
      // window.location.href = exam.alcaa_product_link
      this.user.registerExam(exam.id)
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
    sendAnswersAndFinishExam (examId, examUserId) {
      if (!this.hasExamDataOnThisDeviseStorage(examId)) {
        this.$q.notify({
          type: 'negative',
          message: 'در این سیستم پاسخنامه شما ثبت نشده است. لطفا از سیستمی که با آن در آزمون شرکت کرده اید استفاده کنید و این دکمه را بزنید.',
          position: 'top'
        })
        return
      }
      const that = this
      this.sendUserQuestionsDataToServerAndFinishExam(examId, examUserId)
        .then(() => {
          that.$q.notify({
            type: 'positive',
            message: 'اطلاعات آزمون شما ثبت شد.',
            position: 'top'
          })
          that.$store.commit('clearExamData', examId)
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
    }
  }
}
</script>

<style scoped>
    .exam-list-sheet {
        background: var(--surface-1);;
        min-height: 50px;
    }

    .appDarkMode .exam-list-sheet {
        background: #1c1c21;
    }

    @media only screen and (max-width: 960px) {
        .table-header {
            display: none;
        }
        .table-row {
            padding-right: 10px;
        }
    }
</style>

<style>
    .appDarkMode .exam-list-sheet .q-btn--disabled span {
        color: #bfbfbf !important;
        opacity: 0.6;
    }

    .exam-info-bar .col {
        padding: 6px 12px;
    }

    .table-row {
        align-items: center;
    }
</style>
