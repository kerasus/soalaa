<template>
  <div class="exam-list-container">
    <div v-if="exams.list.length > 0"
         class="quiz-list-container">
      <div class="row q-pt-md">
        <div class="col-12 col-md-6">

          <div class="search-bar">
            <q-input v-model="searchInExams"
                     type="search"
                     label="جست و جو در آزمون ها">
              <template v-slot:append>
                <q-icon name="isax:search-normal-1"
                        icon="search"
                        flat
                        :loading="exams.loading"
                        @click="setFilter"
                />
              </template>
            </q-input>
          </div>
        </div>
        <div class="col-12 col-md-6 filter-btn-col">
          <q-btn
            v-if="quizType === 'myExam'"
            unelevated
            class="create-exam"
            @click="gotoCreateExam">
            آزمون جدید
          </q-btn>
          <q-btn
            unelevated
            class="filter-toggle"
            :class="filterBar ? 'open': '' "
            icon="isax:filter"
            @click="toggleFilter" />
        </div>
      </div>
      <div class="row filter-wrapper"
           :class="filterBar ? 'open': '' ">
        <div
          class="col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
          <div class="filter-input-label">{{quizType === 'myExam'? 'تاریخ ایجاد' : 'تاریخ آزمون'}}</div>
          <form-builder
            ref="filterForm"
            class="filter-form-builder"
            :value="inputs"
          />
        </div>
        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 flex justify-end items-end">
          <q-btn
            unelevated
            color="white"
            text-color="dark"
            class="filter-refresh-btn"
            icon="isax:rotate-left"
            @click="clearInputs"
          />
          <q-btn
            unelevated
            color="primary"
            label="اعمال"
            class="filter-submit-btn"
            :loading="exams.loading"
            @click="setFilter"
          />
        </div>
      </div>
      <div class="quiz-list-wrapper">
        <q-list class="quiz-list">
          <q-item class="quiz-list-item header">
            <q-item-section>
              <div class="row quiz-list-header-row">
                <div class="quiz-list-header-col"
                     :class="quizType === 'myExam' ? 'col-5' : 'col-6'">
                  عنوان آزمون
                </div>
                <div v-if="quizType === 'myExam'"
                     :class="quizType === 'myExam' ? 'col-2' : 'col-3'"
                     class="quiz-list-header-col">
                  نوع آزمون
                </div>
                <div class="quiz-list-header-col"
                     :class="quizType === 'myExam' ? 'col-2' : 'col-3'">
                  شروع آزمون
                </div>
                <div class="quiz-list-header-col"
                     :class="quizType === 'myExam' ? 'col-3' : 'col-3'">
                  عملیات
                </div>
              </div>
            </q-item-section>
          </q-item>
          <q-item v-for="item in exams.list"
                  :key="item"
                  class="quiz-list-item">
            <q-item-section>
              <div class="row quiz-list-item-row">
                <div class="quiz-list-item-name ellipses"
                     :class="quizType === 'myExam' ? 'col-xs-12 col-sm-5 col-md-5 col-lg-5 col-xl-5' : 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'">
                  <span v-if="$q.screen.lt.sm"
                        class="quiz-list-res-title">
                    نام آزمون :
                  </span>
                  <div class="quiz-list-item-name-text">{{item.title}}</div>
                </div>
                <div v-if="quizType === 'myExam'"
                     class="quiz-list-item-schedule ellipses"
                     :class="quizType === 'myExam' ? 'col-xs-12 col-sm-2 col-md-2 col-lg-2 col-xl-2' : 'col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3'">
                  <span v-if="$q.screen.lt.sm"
                        class="quiz-list-res-title">
                    نوع آزمون :
                  </span>
                  تست
                </div>
                <div class="quiz-list-item-schedule ellipses"
                     :class="quizType === 'myExam' ? 'col-xs-12 col-sm-2 col-md-2 col-lg-2 col-xl-2' : 'col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3'"
                >
                  <span v-if="$q.screen.lt.sm"
                        class="quiz-list-res-title">
                    زمان آزمون :
                  </span>
                  <div class="uiz-list-item-schedule-date">
                    {{getDate(item.start_at) }}
                  </div>
                  <div class="uiz-list-item-schedule-time">
                    {{ getTimeFromDateTime(item.start_at) }}
                  </div>
                </div>
                <div class="quiz-list-item-action"
                     :class="quizType === 'myExam' ? 'col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3' : 'col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3'"
                >
                  <q-btn v-if="item.exam_actions.can_register"
                         class="quiz-action-btn enroll"
                         flat
                         @click="registerExam(item)"
                  >
                    ثبت نام در آزمون
                  </q-btn>
                  <q-btn v-if="item.exam_actions.can_start"
                         class="quiz-action-btn enroll"
                         flat
                         @click="goToParticipateExamPage(item, false, personal)"
                  >
                    شروع آزمون
                  </q-btn>
                  <q-btn v-if="item.exam_actions.can_retake"
                         class="quiz-action-btn enroll"
                         flat
                         @click="showRetakeConfirmation(item, personal)"
                  >
                    شروع مجدد
                  </q-btn>
                  <q-btn
                    v-if="item.exam_actions.can_continue"
                    class="quiz-action-btn continue"
                    unelevated
                    @click="continueExam(item, false, personal)"
                  >
                    ادامه آزمون
                  </q-btn>
                  <q-btn
                    v-if="item.exam_actions.can_see_report"
                    class="quiz-action-btn result"
                    style="background: #FFB74D"
                    unelevated
                    @click="goToResult(item)"
                  >
                    مشاهده نتایج
                  </q-btn>
                  <q-btn
                    v-if="item.exam_actions.can_submit_answer"
                    class="quiz-action-btn document"
                    unelevated
                    @click="getConfirmation(item.user_exam_id)"
                  >
                    <q-icon name="isax:tick-circle"
                            size="20px"
                            style="margin-left: 3px;" />
                    ثبت پاسخنامه ذخیره شده
                  </q-btn>
                  <template v-if="item.booklet_url">
                    <q-btn class="quiz-action-btn document"
                           unelevated
                           label="لیست دفترچه ها">
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
                  <q-btn
                    v-if="quizType === 'myExam'"
                    disable
                    color="dark"
                    :to="{name : 'User.Exam.Download'}"
                    class="quiz-action-download"
                    flat
                    icon="isax:import"
                    @click="onClick"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div v-else
         class="row">
      <div class="col-12 flex column flex-center">
        <img class="no-item"
             src="https://nodes.alaatv.com/aaa/landing/Soalaa/States/empty_azmuns.png"
             alt="no-item">
        <div class="no-item-title">
          شما آزمون ساخته شده ای ندارید
        </div>
        <a class="new-link">
          ساخت آزمون جدید
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Exam, ExamList } from 'src/models/Exam'
import { mixinAuth, mixinQuiz } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'
import { FormBuilder, inputMixin } from 'quasar-form-builder'
import ShamsiDate from 'src/plugins/ShamsiDate'
import Time from 'src/plugins/time.js'

export default defineComponent({
  name: 'QuizList',
  props: {
    quizType: {
      type: String,
      default: () => {}
    },
    personal: {
      type: Boolean,
      default: false
    },
    exams: {
      type: ExamList,
      default: new ExamList()
    }
  },
  emits: [
    'filterExamList'
  ],
  mixins: [mixinAuth, mixinQuiz, inputMixin],
  components: {
    FormBuilder
  },
  data: () => ({
    searchInExams: '',
    preventStartExam: false,
    examItem: new Exam(),
    loadingList: false,
    examType: '',
    typeOptions: ['تست', 'تشریحی', 'ترکببی'],
    filterBar: false,
    inputs: [
      { type: 'date', name: 'from', label: 'از', calendarIcon: ' ', responseKey: 'fromDate', col: 'col-12 col-sm-6 form-builder-date-from' },
      { type: 'date', name: 'to', label: 'تا', responseKey: 'toDate', calendarIcon: ' ', col: 'col-12 col-sm-6 form-builder-date-to' }
    ]
  }),
  created () {
    // this.getExams()
  },
  watch: {
    quizType () {
      this.clearInputs()
    },
    loadingList () {
      if (this.loadingList) {
        this.$store.commit('loading/loading', true)
      } else {
        this.$store.commit('loading/loading', false)
      }
    }
  },
  mounted() {
    this.initPageData()
  },
  methods: {
    initPageData() {
      this.clearInputs()
      this.setDefaultData()
    },
    setDefaultData() {
      if (this.quizType !== 'exam') return
      const input = this.inputs.find(i => i.name === 'to')
      input.value = Time.now()
    },
    getTimeFromDateTime(dateTime) {
      return ShamsiDate.getTimeFromDateTime(dateTime)
    },
    getDate(dateTime) {
      return ShamsiDate.getDate(dateTime)
    },
    goToResult (exam) {
      let routeName = 'user.exam.results'
      if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
        routeName = 'mbtiBartle.result'
      }
      this.$router.push({ name: routeName, params: { user_exam_id: exam.user_exam_id, exam_id: exam.id } })
    },
    getParticipateExamPageRoute (retake, personal) {
      if (retake) {
        return 'onlineQuiz.alaaView.retake'
      }
      if (personal) {
        return 'onlineQuiz.alaaView.personal'
      }
      return 'onlineQuiz.alaaView'
    },
    goToParticipateExamPage (exam, retake, personal) {
      let routeName = this.getParticipateExamPageRoute(retake, personal)
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
    continueExam (exam, retake, personal) {
      let routeName = this.getParticipateExamPageRoute(retake, personal)
      if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
        routeName = 'onlineQuiz.mbtiBartle'
      }
      if (exam.type && exam.type.value && exam.type.value === 'psychometric') {
        routeName = 'onlineQuiz.mbtiBartle'
      }
      this.$router.push({ name: routeName, params: { quizId: exam.id, questNumber: 1 } })
    },
    showRetakeConfirmation (exam, personal) {
      this.$store.dispatch('AppLayout/showConfirmDialog', {
        show: true,
        message: 'با زدن دکمه تایید گزینه های شما حدف نمی شوند اما زمان آزمون شما از اول شروع می شود',
        buttons: {
          no: 'خیر',
          yes: 'بله'
        },
        callback: async (confirm) => {
          if (confirm) {
            this.goToParticipateExamPage(exam, true, personal)
          }
          this.closeConfirmModal()
        }
      })
    },
    // getExams () {
    //   const that = this
    //   this.loadingList = true
    //   // this.user.getUserExams()
    //   this.$axios.get(API_ADDRESS.exam.userExamsList)
    //     .then((response) => {
    //       this.user.exams = new ExamList(response.data.data.exams)
    //       this.user.exams.loading = false
    //       this.exams = new ExamList(response.data.data.exams)
    //       this.loadingList = false
    //     })
    //     .catch(() => {
    //       that.loadingList = false
    //     })
    // },
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
    },
    setFilter() {
      const inputValues = this.$refs.filterForm.getValues()
      const filterData = {
        from: '',
        to: ''
      }
      inputValues.forEach(input => {
        if (input.value) {
          Object.assign(filterData, {
            [input.name]: input.value
          })
        }
      })
      Object.assign(filterData, {
        examType: this.examType,
        title: this.searchInExams
      })
      this.$emit('onFilter', filterData)
    },
    clearInputs () {
      if (this.$refs.filterForm) {
        this.$refs.filterForm.clearFormBuilderInputValues()
      }
      this.examType = ''
      this.searchInExams = ''
    },
    toggleFilter() {
      this.filterBar = !this.filterBar
    },
    gotoCreateExam() {
      this.$router.push({ name: 'User.Create.Exam' })
    }
  }
})
</script>
<style lang="scss" scoped>
  .quiz-list-container {
    .search-bar {
      width: 330px;
      height: 40px;
      border-radius: 8px;
      margin-bottom: 20px;

      &:deep(.q-field__append){
        .q-icon{
          color: #6D708B;
          cursor: pointer;
          padding-right: 17px;
        }
      }

      &:deep(.q-field__control) {
        width: 330px;
        height: 40px;
        border-radius: 8px;
        color: transparent;

        &::before{
          border: none;
        }
      }

      &:deep(.q-field__native) {
        padding-right: 5px;
      }

      &:deep(.q-field__append) {
        height: 40px;
        border-radius: 8px;
        border: none;
      }

      &:deep(.q-field__label) {
        left: 16px;
        top: 25%;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
      }

      @media only screen and (max-width: 600px){
        width: 230px;
        height: 50px;
      }
      @media only screen and (max-width: 390px){
        width: 100%;
      }
    }
    .filter-btn-col {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;

      .filter-toggle {
        width: 40px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 8px;
        :deep(.q-icon){
          color: #6D708B;
        }

        &.open {
          background: #E4E8EF;
        }
      }

      .create-exam {
        width: 120px;
        height: 40px;
        background: #9690E4;
        border-radius: 8px;
        margin-right: 16px;
        display: flex;
        align-items: center;
        text-align: center;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.03em;
        color: #FFFFFF;
      }

      @media only screen and (max-width: 390px){
        margin-bottom: 20px;
      }
    }
    .filter-wrapper {
      display: none;
      height: 0;
      transition: all 0.5s ease-in-out;
      -moz-transition: all 0.5s ease-in-out; /* Firefox 4 */
      -webkit-transition: all 0.5s ease-in-out; /* Safari and Chrome */
      -o-transition: all 0.5s ease-in-out; /* Opera */
      -ms-transition: all 0.5s ease-in-out; /* Explorer 10 */

      &:deep(.form-builder-date-time-col){
        padding-bottom: 0 !important;

        .outsideLabel{
          display: none;
        }
      }

      &:deep(.form-builder-separator-col) {
        padding-bottom: 0 !important;
      }

      .filter-input-label {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        letter-spacing: -0.03em;
        color: #434765;
        margin-bottom: 8px;

        @media only screen and (max-width: 600px){
          margin-top: 16px;
        }
      }

      .filter-submit-btn {
        padding: 0px 20px;
        margin-left: 16px;
        height: 40px;
        background: #9690E4;
        border-radius: 8px;

        @media only screen and (max-width: 600px){
          margin-top: 16px;
        }
      }

      .filter-refresh-btn {
        border-radius: 8px;
        width: 40px;
        height: 40px;

        :deep(.q-icon){
          color: #6D708B;
        }

        @media only screen and (max-width: 600px){
          margin-top: 16px;
        }
      }

      &.open {
        display: flex;
        height: auto;
        transition: all 0.5s ease-in-out;
        -moz-transition: all 0.5s ease-in-out; /* Firefox 4 */
        -webkit-transition: all 0.5s ease-in-out; /* Safari and Chrome */
        -o-transition: all 0.5s ease-in-out; /* Opera */
        -ms-transition: all 0.5s ease-in-out; /* Explorer 10 */
      }
    }

    .quiz-list-wrapper {
      .quiz-list {
        margin: 16px 0;
        .quiz-list-item {
          display: flex;
          background: #FFFFFF;
          box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
          border-radius: 16px;
          margin-bottom: 16px;

          &.header {
            background: transparent;
            box-shadow: none;

            @media only screen and (max-width: 600px){
              display: none;
            }
          }

          .quiz-list-header-row {
            .quiz-list-header-col {
              display: flex;
              justify-content: center;
              align-items: center;
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 25px;
              text-align: right;
              color: #6D708B;
            }
          }

          .quiz-list-item-row {
            display: flex;
            flex-direction: row;
            width: 100%;

            .quiz-list-item-name {
              display: flex;
              justify-content: center;
              align-items: center;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              color: #434765;

              .quiz-list-item-name-text {
                @media only screen and (max-width: 600px){
                  width: 85%;
                }
              }

              @media only screen and (max-width: 600px){
                justify-content: flex-start;
              }
            }
            .quiz-list-item-schedule {
              display: flex;
              justify-content: center;
              align-items: center;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 24px;
              text-align: right;
              color: #434765;

              @media only screen and (min-width: 600px) and (max-width: 1024px){
                flex-direction: column;
              }

              @media only screen and (max-width: 600px) {
                margin: 3px 0;
                justify-content: flex-start;
              }
            }

            .quiz-list-res-title {
              width: 92px;
              text-align: left;
            }
            .quiz-list-item-action {
              display: flex;
              justify-content: center;
              align-items: center;

              .quiz-action-btn {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 126px;
                border-radius: 8px;
                color: #FFFFFF;

                &.enroll {
                  background: #FFB74D;
                }

                &.result {
                  background: #9690E4;
                }

                &.continue {
                  background: #4CAF50;
                }

                &.document {
                  background: #71c5f4;
                }

                @media only screen and (max-width: 600px){
                  align-items: center;
                  width: 252px;
                  height: 40px;
                }
              }

              .quiz-action-download {
                margin-left: 45px;

                @media only screen and (min-width: 600px) and (max-width: 1024px){
                  margin-left: 15px;
                }

                @media only screen and (max-width: 600px){
                  margin-left: 32px;
                }
              }
            }

            @media only screen and (max-width: 390px){
              justify-content: center;
              align-items: center;
              flex-direction: column;
              min-width: 100%;
              height: 165px;
            }
          }

          @media only screen and (max-width: 390px){
            min-width: 100%;
            height: 165px;
            flex-direction: column;
          }
        }

        @media only screen and (max-width: 600px){
          overflow-x: auto;
        }
        @media only screen and (max-width: 390px){
          overflow-x: hidden;
        }
      }
    }
  }

  .no-item {
    width: 230px;
    height: 230px;
    margin: 30px 0;

    @media only screen and (max-width: 390px){
      width: 230px;
      height: 230px;
    }
  }
  .no-item-title {
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 34px;
    text-align: center;
    color: #6D708B;

    @media only screen and (max-width: 600px){
      font-size: 20px;
      line-height: 31px;
    }
    @media only screen and (max-width: 390px){
      font-size: 18px;
      line-height: 28px;
    }
  }
  .new-link {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #8075DC;
    text-transform: none;
    margin-top: 12px;
  }
</style>
