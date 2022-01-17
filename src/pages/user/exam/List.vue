<template>
  <v-container>
    <vue-confirm-dialog />
    <v-row>
      <v-col>
        <progress-linear :active="loadingList" />
        <v-alert
          v-if="exams.list.length === 0 && !loadingList"
          type="info"
        >
          آزمونی وجود ندارد
        </v-alert>
        <v-row v-if="exams.list.length > 0 && !loadingList">
          <v-col>
            <v-row class="table-header">
              <v-col
                cols="3"
                class="pr-7"
              >
                عنوان
              </v-col>
              <v-col cols="2">
                زمان شروع آزمون
              </v-col>
              <v-col
                v-if="false"
                cols="2"
              >
                زمان پایان آزمون
              </v-col>
              <v-col
                v-if="false"
                cols="1"
              >
                میزان تاخیر مجاز
              </v-col>
              <v-col cols="7">
                عملیات
              </v-col>
            </v-row>
            <v-row
              v-for="item in exams.list"
              :key="item.id"
              class="exam-info-bar"
            >
              <v-col>
                <v-sheet
                  class="d-flex exam-list-sheet"
                  elevation="0"
                  outlined
                  rounded
                  shaped
                >
                  <v-row class="table-row justify-center">
                    <v-col
                      cols="12"
                      md="3"
                      class="pr-7 justify-center"
                    >
                      {{ item.title }}
                    </v-col>
                    <v-col
                      cols="12"
                      md="2"
                    >
                      <span class="d-inline-block-md d-none">
                        زمان شروع آزمون:
                      </span>
                      {{ item.shamsiDate('start_at').dateTime }}
                    </v-col>
                    <v-col
                      v-if="false"
                      cols="12"
                      md="2"
                    >
                      <span class="d-inline-block-md d-none">
                        زمان پایان آزمون:
                      </span>
                      {{ item.shamsiDate('finish_at').dateTime }}
                    </v-col>
                    <v-col
                      v-if="false"
                      cols="12"
                      md="1"
                    >
                      <span class="d-inline-block-md d-none">
                        میزان تاخیر مجاز:
                      </span>
                      {{ item.delay_time }}
                      دقیقه
                    </v-col>
                    <v-col
                      cols="12"
                      md="7"
                    >
                      <v-btn
                        v-if="item.exam_actions.can_register"
                        color="#00c753"
                        text
                        @click="registerExam(item)"
                      >
                        ثبت نام
                      </v-btn>
                      <v-btn
                        v-if="item.exam_actions.can_start"
                        color="#ffc107"
                        text
                        @click="goToParticipateExamPage(item)"
                      >
                        شروع آزمون
                      </v-btn>
                      <v-btn
                        v-if="item.exam_actions.can_submit_new_answers"
                        color="#ffc107"
                        text
                        @click="goToSendResults(item)"
                      >
                        ثبت گزینه ها
                      </v-btn>
                      <v-btn
                        v-if="item.exam_actions.can_continue"
                        color="purple"
                        text
                        @click="continueExam(item)"
                      >
                        ادامه آزمون
                      </v-btn>
                      <v-btn
                        v-if="item.exam_actions.can_submit_offline_answers"
                        color="#ffc107"
                        text
                        @click="getConfirmation(item.id, item.user_exam_id)"
                      >
                        ثبت پاسخنامه ذخیره شده در سیستم
                      </v-btn>
                      <v-btn
                        v-if="item.exam_actions.can_see_report"
                        color="#00b5e6"
                        text
                        @click="goToResult(item)"
                      >
                        مشاهده نتایج
                      </v-btn>
                      <v-btn
                        v-if="!!item.holding_status"
                        color="#ffc107"
                        text
                        disabled
                      >
                        {{ item.holding_status }}
                      </v-btn>
                      <template v-if="item.booklet_url">
                        <v-btn
                          v-for="(booklet, bookletIndex) in item.booklet_url.filter( bookletItem => !!bookletItem.questions_booklet_url)"
                          :key="bookletIndex"
                          color="#ffc107"
                          text
                          @click="downloadBooklet(booklet.questions_booklet_url)"
                        >
                          {{ booklet.category_title }}
                        </v-btn>
                      </template>
                      <v-btn
                        color="green"
                        text
                        @click="setDialogStatus(item)"
                      >
                        ارسال پاسخنامه
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <send-answer-photo
      :questions="questions"
      :exam-data="bubbleSheetDialogExam"
      :dialog-status="bubbleSheetDialog"
      @closeDialog="bubbleSheetDialog = false"
    />
  </v-container>
</template>

<script>
import {Exam, ExamList} from "@/models/Exam";
import {mixinAuth, mixinQuiz} from '@/mixin/Mixins'
import ProgressLinear from "@/components/ProgressLinear";
import VueConfirmDialog from 'vue-confirm-dialog'
import SendAnswerPhoto from "@/pages/user/exam/SendAnswerPhoto";
import Vue from 'vue'
import {Question} from "@/models/Question";

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

export default {
  name: 'List',
  components: {SendAnswerPhoto, ProgressLinear},
  mixins: [mixinAuth, mixinQuiz],
  data: () => ({
    preventStartExam: false,
    examItem: new Exam(),
    exams: new ExamList(),
    loadingList: false,
    bubbleSheetDialog: false,
    bubbleSheetDialogExam: new Exam(),
    questions: []
  }),
  created() {
    this.getExams()
  },
  mounted() {
    this.disconnectSocket()
    this.$store.commit('AppLayout/updateAppBarAndDrawer', true)
    this.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
  },
  methods: {
    setDialogStatus(exam){
      this.bubbleSheetDialog = true
      this.bubbleSheetDialogExam = new Exam(exam)
      this.$store.commit('updateQuiz', this.bubbleSheetDialogExam)

      const bubbleSheetResponse = [
        {
          "q_n": 1,
          "c_n": [
            4
          ]
        },
        {
          "q_n": 2,
          "c_n": [
            3
          ]
        }
      ]


      for (let i = 0; i < bubbleSheetResponse.length; i++) {
        this.questions.push(new Question({id: bubbleSheetResponse[i].q_n}))
      }

      const userAnswerResponse = this.convertBubbleSheetResponseToUserAnswerResponse(this.bubbleSheetDialogExam.user_exam_id, bubbleSheetResponse)

      console.log('userAnswerResponse', userAnswerResponse)
      this.$store.commit('clearExamData', this.bubbleSheetDialogExam.id)
      this.$store.commit('mergeDbAnswersIntoLocalstorage', {
        dbAnswers: userAnswerResponse,
        exam_id: this.bubbleSheetDialogExam.id
      })
    },
    goToResult(exam) {
      let routeName = 'user.exam.results'
      if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
        routeName = 'mbtiBartle.result'
      }
      this.$router.push({name: routeName, params: {user_exam_id: exam.user_exam_id, exam_id: exam.id}})
    },
    goToParticipateExamPage(exam) {
      let routeName = 'onlineQuiz.alaaView'
      if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
        routeName = 'onlineQuiz.mbtiBartle'
      }
      this.$router.push({name: routeName, params: {quizId: exam.id, questNumber: 1}})
    },
    goToSendResults(exam) {
      let routeName = 'onlineQuiz.konkoorView2'
      if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
        routeName = 'onlineQuiz.mbtiBartle'
      }
      this.$router.push({name: routeName, params: {quizId: exam.id, questNumber: 1}})
    },
    getConfirmation(examId, examUserId) {
      let that = this
      this.$store.commit('AppLayout/showConfirmDialog', {
        message: `مطمئنی؟ نتیجه شما پس از تایید، ثبت و رتبه شما محاسبه خواهد شد و به اندازه میانگین درصدهای شما، کد تخفیف همه محصولات آلاء برای شما ارسال خواهد شد. مثلا اگر میانگین درصدهای شما 60% باشد یک کد تخفیف 60% دریافت خواهید کرد`,
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
    continueExam(exam) {
      let routeName = 'onlineQuiz.alaaView'
      if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
        routeName = 'onlineQuiz.mbtiBartle'
      }
      this.$store.commit('setQuiz', new Exam())
      this.$router.push({name: routeName, params: {quizId: exam.id, questNumber: 1}})
    },
    getExams() {
      let that = this
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
    registerExam(exam) {
      // window.location.href = exam.alcaa_product_link
      this.user.registerExam(exam.id)
          .then((response) => {
            if (response.data.data.redirect_url) {
              window.location.href = response.data.data.redirect_url
            } else {
              this.$notify({
                group: 'notifs',
                title: 'توجه!',
                text: 'ثبت نام در آزمون با موفقیت انجام شد',
                type: 'success'
              })
              this.getExams()
            }
          })
    },
    sendAnswersAndFinishExam(examId, examUserId) {
      if (!this.hasExamDataOnThisDeviseStorage(examId)) {
        this.$notify({
          group: 'notifs',
          title: 'توجه!',
          text: 'در این سیستم پاسخنامه شما ثبت نشده است. لطفا از سیستمی که با آن در آزمون شرکت کرده اید استفاده کنید و این دکمه را بزنید.',
          type: 'error',
          duration: 30000,
        })
        return
      }
      let that = this
      this.sendUserQuestionsDataToServerAndFinishExam(examId, examUserId)
          .then(() => {
            that.$notify({
              group: 'notifs',
              text: 'اطلاعات آزمون شما ثبت شد.',
              type: 'success'
            })
            that.$store.commit('clearExamData', examId)
            that.$router.push({name: 'user.exam.list'})
          })
          .catch(() => {
            that.$notify({
              group: 'notifs',
              title: 'توجه!',
              text: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
              type: 'error',
              duration: 30000,
            })
            this.getExams()
          })
    },
    downloadBooklet (bookletUrl) {
      window.open(bookletUrl, '_blank').focus();
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
.appDarkMode .exam-list-sheet .v-btn--disabled span {
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
