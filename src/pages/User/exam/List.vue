<template>
  <div
    class="userExamList"
    style="font-size: 16px;"
  >
    <!--    ToDo : add confirm-dialog-->
    <!--    <vue-confirm-dialog />-->
    <div class="fit row wrap justify-center items-start content-start"
    >
      <div class="col col-9 examList-container">
        <!--        ToDo : ProgressLinear-->
        <!--        <progress-linear :active="loadingList" />-->
        <q-banner
          v-if="exams.list.length === 0 && !loadingList"
          inline-actions
          rounded
          class="bg-blue text-white">
          <template v-slot:avatar>
            <q-icon name="mdi-information"
                    color="white"></q-icon>
          </template>
          آزمونی وجود ندارد
        </q-banner>
        <div v-if="exams.list.length > 0 && !loadingList"
             class="row">
          <div class="col">
            <div class="row table-header"
                 style="padding-bottom: 12px;"
            >
              <div class="col col-1" />
              <div class="col col-3 text-center examList-title-text"
              >
                عنوان آزمون
              </div>
              <div class="col col-3 text-center examList-title-text"
              >
                شروع آزمون
              </div>
              <div v-if="false"
                   class="col col-2"
                   style="padding-right: 24px;"
              >
                زمان پایان آزمون
              </div>
              <div v-if="false"
                   class="col col-1"
              >
                میزان تاخیر مجاز
              </div>
              <div class="col col-4 text-center examList-title-text"
              >
                عملیات
              </div>
              <div class="col col-1" />
            </div>
            <div v-for="item in exams.list"
                 :key="item.id"
                 class="row exam-info-bar"
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
                    <div class="col col-1 exam-list-empty-col" />
                    <div class="col col-12 col-md-3 pr-7 justify-center text-center examList-content-text"
                    >
                      {{ item.title }}
                    </div>
                    <div class="col col-12 col-md-3 text-center examList-content-text"
                    >
                      {{ item.shamsiDate('start_at').time }}
                      <span class="examList-start-date">
                        {{ item.shamsiDate('start_at').date }}
                      </span>
                    </div>
                    <div v-if="false"
                         class="col col-12 col-md-2"
                    >
                      <span class="d-inline-block-md d-none">
                        زمان پایان آزمون:
                      </span>
                      {{ item.shamsiDate('finish_at').dateTime }}
                    </div>
                    <div v-if="false"
                         class="col col-12 col-md-1"
                    >
                      <span class="d-inline-block-md d-none">
                        میزان تاخیر مجاز:
                      </span>
                      {{ item.delay_time }}
                      دقیقه
                    </div>
                    <div class="col col-12 col-md-4 examList-action-section"
                    >
                      <q-btn
                        v-if="item.exam_actions.can_register"
                        class="exam-action-big-btn exam-btn-text"
                        style="background: #4CAF50"
                        flat
                        @click="registerExam(item)"
                      >
                        ثبت نام در آزمون
                      </q-btn>
                      <q-btn
                        v-if="item.exam_actions.can_start"
                        class="exam-action-big-btn exam-btn-text"
                        style="background: #9690E4"
                        flat
                        @click="goToParticipateExamPage(item)"
                      >
                        شروع آزمون
                      </q-btn>
                      <div class="exam-list-exam-actions">
                        <q-btn
                          v-if="item.exam_actions.can_continue"
                          class="exam-action-medium-btn exam-btn-text"
                          style="background: #9690E4"
                          unelevated
                          @click="continueExam(item)"
                        >
                          ادامه آزمون
                        </q-btn>
                        <q-btn
                          v-if="item.exam_actions.can_see_report"
                          class="exam-action-medium-btn exam-btn-text exam-show-result"
                          style="background: #FFB74D"
                          unelevated
                          @click="goToResult(item)"
                        >
                          مشاهده نتایج
                        </q-btn>
                      </div>
                      <q-btn
                        v-if="item.exam_actions.can_submit_answer"
                        class="exam-action-big-btn exam-btn-text"
                        style="background: #FFB74D"
                        unelevated
                        @click="getConfirmation(item.user_exam_id)"
                      >
                        <q-icon name="isax:tick-circle"
                                size="20px"
                                style="margin-left: 3px;" />
                        ثبت پاسخنامه ذخیره شده
                      </q-btn>
                      <template v-if="item.booklet_url">
                        <q-btn class="exam-list-menu-btn exam-action-big-btn  exam-btn-text"
                               unelevated
                               label="لیست دفترچه ها"
                               style="background: #71C5F4">
                          <q-menu
                            fit
                            transition-show="flip-right"
                            transition-hide="flip-left"
                          >
                            <q-list>
                              <q-item
                                v-if="item.booklet_url[1]"
                                clickable
                                @click="downloadBooklet(item.booklet_url[1].questions_booklet_url)"
                              >
                                <q-item-section
                                  :key="'questions_booklet_url-'+1"
                                  class="exam-btn-text">
                                  <span class="exam-list-menu-title">
                                    <q-icon name="isax:book-1"
                                            size="20px" />
                                    {{ item.booklet_url[1].category_title }}
                                  </span>
                                </q-item-section>
                              </q-item>
                              <q-item
                                v-if="item.booklet_url[1]"
                                clickable
                                @click="downloadBooklet(item.booklet_url[1].descriptive_answers_booklet_url)"
                              >
                                <q-item-section
                                  :key="'questions_booklet_url-'+1"
                                  class="exam-btn-text"
                                >
                                  <span class="exam-list-menu-title">
                                    <q-icon name="isax:note-2"
                                            size="20px" />
                                    پاسخ {{ item.booklet_url[1].category_title }}
                                  </span>
                                </q-item-section>
                              </q-item>
                              <q-separator />
                              <q-item
                                v-if="item.booklet_url[0]"
                                clickable
                                @click="downloadBooklet(item.booklet_url[0].questions_booklet_url)"
                              >
                                <q-item-section
                                  :key="'questions_booklet_url-'+0"
                                  class="exam-btn-text"
                                >
                                  <span class="exam-list-menu-title">
                                    <q-icon name="isax:book-1"
                                            size="20px" />
                                    {{ item.booklet_url[0].category_title }}
                                  </span>
                                </q-item-section>
                              </q-item>
                              <q-item
                                v-if="item.booklet_url[0]"
                                clickable
                                @click="downloadBooklet(item.booklet_url[0].descriptive_answers_booklet_url)"
                              >
                                <q-item-section
                                  :key="'questions_booklet_url-'+0"
                                  class="exam-btn-text"
                                >
                                  <span class="exam-list-menu-title">
                                    <q-icon name="isax:note-2"
                                            size="20px" />
                                    پاسخ {{ item.booklet_url[0].category_title }}
                                  </span>
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </template>
                      <q-btn
                        v-if="!!item.holding_status"
                        style="color: #ffc107"
                        flat
                        disabled
                      >
                        <q-icon name="isax:info-circle"
                                size="20px"
                                style="margin-left: 3px;" />
                        {{ item.holding_status }}
                      </q-btn>
                    </div>
                    <div class="col col-1 exam-list-empty-col" />
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
import API_ADDRESS from 'src/api/Addresses'
// import ProgressLinear from 'src/components/ProgressLinear'
// import VueConfirmDialog from 'vue-confirm-dialog'
// import { createApp } from 'vue'
// const app = createApp({})
// app.use(VueConfirmDialog)
// app.component('vue-confirm-dialog', VueConfirmDialog.default)

export default {
  name: 'List',
  //       ToDo : ProgressLinear
  // components: { ProgressLinear },
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
    this.$store.dispatch('AppLayout/updateAppBarAndDrawer', true)
    this.disconnectSocket()
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

<style scoped>
.exam-list-menu-btn {
  border-radius: 10px;
}
.exam-list-menu-title {
  color: #65677F;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
}
.exam-list-menu-title i {
  padding-right: 10px;
}

.exam-list-sheet {
  background: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 20px;
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

<style lang="scss">
.userExamList {
.disabled, .disabled *, [disabled], [disabled] * {
  color: rgba(0, 0, 0, 0.54) !important;
}
}
.appDarkMode .exam-list-sheet .q-btn--disabled span {
  color: #bfbfbf !important;
  opacity: 0.6;
}

.exam-info-bar .col {
  padding: 12px 0;
}

.exam-info-bar .q-btn__content {
  padding: 0;
}

.table-row {
  align-items: center;
}
</style>

<style lang="scss" scoped>
.examList-container {
  width: 88.2%;
  .exam-info-bar {
    .examList-title-text {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #65677F;
    }
    .examList-content-text {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #23263B;
    }
    .examList-action-section {
      display: flex;
      justify-content: center;
      .exam-list-exam-actions {
        display: flex;
      }
      .exam-btn-text {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
      }
      .exam-action-big-btn {
        width: 208px;
        height: 40px;
        border-radius: 10px;
      }
      .exam-action-medium-btn {
        padding: 0;
        width: 96px;
        height: 40px;
        border-radius: 10px;
        margin-right: 16px;
      }
    }
  }
}
@media only screen and (max-width: 1599px){
  .examList-container{
    .exam-info-bar {
      .examList-action-section {
        display: grid;
        .exam-list-exam-actions {
          justify-content: center;
          margin-bottom: 8px;
        }
        .exam-action-medium-btn {
          margin-right: 0;
        }
        .exam-show-result {
          margin-left: 16px;
        }
      }
    }
  }
}
@media only screen and (max-width: 1439px) {
  .examList-container{
    .exam-info-bar {
      .examList-action-section {
        display: flex;
        .exam-list-exam-actions {
          justify-content: center;
          margin-bottom: 0;
        }
        .exam-action-medium-btn {
          margin-right: 16px;
        }
        .exam-show-result {
          margin-left: 0;
        }
      }
    }
  }
}
@media only screen and (max-width: 1214px){
  .examList-container{
    .exam-info-bar {
      .examList-action-section {
        display: grid;
        .exam-list-exam-actions {
          justify-content: center;
          margin-bottom: 8px;
        }
        .exam-action-medium-btn {
          margin-right: 0;
        }
        .exam-show-result {
          margin-left: 16px;
        }
      }
    }
  }
}
@media only screen and (max-width: 1023px) {
  .examList-container{
    .exam-info-bar {
      .examList-action-section {
        display: flex;
        .exam-list-exam-actions {
          justify-content: center;
          margin-bottom: 0;
        }
        .exam-action-medium-btn {
          margin-right: 16px;
        }
        .exam-show-result {
          margin-left: 0;
        }
      }
    }
  }
  .exam-list-empty-col {
    display: none;
  }
}
@media only screen and (max-width: 600px){
  .examList-container{
    .exam-info-bar {
      .examList-action-section {
        display: grid;
        .exam-list-exam-actions {
          justify-content: center;
          margin-bottom: 8px;
        }
        .exam-action-medium-btn {
          margin-right: 0;
        }
        .exam-show-result {
          margin-left: 16px;
        }
      }
    }
  }
}
</style>
