<template>
  <div v-if="true"
       class="quiz-list-container">
    <div class="row q-pt-md">
      <div class="col-6">
        <div class="search-bar">
          <q-input v-model="searchInExams"
                   type="search"
                   label="جست و جو در آزمون ها">
            <template v-slot:append>
              <q-btn color="dark"
                     icon="search"
                     flat
                     :loading="exams.loading"
                     @click="setFilter"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-6 filter-btn-col">
        <q-btn
          unelevated
          class="filter-toggle"
          icon="isax:filter"
          @click="toggleFilter" />
      </div>
    </div>
    <div class="row filter-wrapper"
         :class="filterBar ? 'open': '' ">
      <div v-if="quizType === 'myExam'"
           class="col-xs-12 col-sm-12 flex justify-start items-end"
           :class="quizType === 'myExam' ? 'col-md-4 col-lg-4 col-xl-4' : ''">
        <div class="filter-input-label">نوع سوالات آزمون</div>
        <q-select v-model="examType"
                  :options="typeOptions"
                  dropdown-icon="isax:arrow-down-1"
                  bg-color="white"
                  style="width:90%"
                  filled />
      </div>
      <div
        class="col-xs-12 col-sm-12"
        :class="quizType === 'myExam' ? 'col-md-6 col-lg-6 col-xl-6' : 'col-md-8 col-lg-8 col-xl-8'">
        <div class="filter-input-label">تاریخ آزمون</div>
        <form-builder
          ref="filterForm"
          :value="inputs"
        />
      </div>
      <div class="col-xs-12 col-sm-12 flex justify-end items-end"
           :class="quizType === 'myExam' ? 'col-md-2 col-lg-2 col-xl-2' : 'col-md-4 col-lg-4 col-xl-4'">
        <q-btn
          unelevated
          color="white"
          text-color="dark"
          class="filter-refresh-btn"
          icon="refresh"
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
              <div class="quiz-list-item-name"
                   :class="quizType === 'myExam' ? 'col-xs-12 col-sm-5 col-md-5 col-lg-5 col-xl-5' : 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'">
                {{item.title.substring(0,40)}} ...
              </div>
              <div v-if="quizType === 'myExam'"
                   class="quiz-list-item-schedule"
                   :class="quizType === 'myExam' ? 'col-xs-12 col-sm-2 col-md-2 col-lg-2 col-xl-2' : 'col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3'">
                تست
              </div>
              <div class="quiz-list-item-schedule"
                   :class="quizType === 'myExam' ? 'col-xs-12 col-sm-2 col-md-2 col-lg-2 col-xl-2' : 'col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3'"
              >
                {{getDate(item.start_at) }}
                ,
                {{ getTimeFromDateTime(item.start_at) }}
              </div>
              <div class="quiz-list-item-action"
                   :class="quizType === 'myExam' ? 'col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3' : 'col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3'"
              >
                <q-btn
                  class="quiz-action-btn"
                  :class="item.exam_actions.can_start ? 'enroll' : 'result'"
                  :label="item.exam_actions.can_start ? 'شرکت در آزمون' : 'مشاهده نتایج'"
                  @click="onClick"
                />
                <q-btn
                  v-if="quizType === 'myExam'"
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
      {
        type: 'formBuilder',
        name: 'formBuilderCol',
        col: 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6',
        value: [
          { type: 'separator', label: 'از', size: '0', separatorType: 'none', col: 'col-1' },
          { type: 'date', name: 'from', responseKey: 'fromDate', calendarIcon: ' ', value: '2022-08-27', col: 'col-11' }
        ]
      },
      {
        type: 'formBuilder',
        name: 'formBuilderCol',
        col: 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6',
        value: [
          { type: 'separator', label: 'تا', size: '0', separatorType: 'none', col: 'col-1' },
          { type: 'date', name: 'to', responseKey: 'toDate', calendarIcon: ' ', value: '2022-08-27', col: 'col-11' }
        ]
      }
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
      this.$refs.filterForm.clearFormBuilderInputValues()
      this.examType = ''
      this.searchInExams = ''
    },
    toggleFilter() {
      this.filterBar = !this.filterBar
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

      &:deep(.q-field__control) {
        width: 330px;
        height: 40px;
        border-radius: 8px;
      }

      &:deep(.q-field__append) {
        height: 40px;
        border-radius: 8px;
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
    }
    .filter-btn-col {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;

      .filter-toggle {
        width: 40px;
        height: 40px;
        background: #E4E8EF;
        border-radius: 8px;
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

            .quiz-list-item-name {
              display: flex;
              justify-content: center;
              align-items: center;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              text-align: right;
              color: #434765;
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

              @media only screen and (max-width: 390px){
                margin: 3px 0;
              }
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

                @media only screen and (max-width: 600px){
                  align-items: center;
                  width: 252px;
                  height: 40px;
                }
              }

              .quiz-action-download {
                margin-left: 45px;

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
              width: 312px;
              height: 165px;
            }
          }

          @media only screen and (max-width: 390px){
            min-width: 100%;
            width: 312px;
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
