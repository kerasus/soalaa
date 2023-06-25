<template>
  <div class="exam-list-container">
    <div class="quiz-list-container">
      <div class="row q-pt-md">
        <div :class="quizType === 'myExam' ? 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6' : 'col-xs-10 col-sm-6 col-md-6 col-lg-6 col-xl-6'">

          <div class="search-bar">
            <q-input v-model="searchInExams"
                     type="search"
                     label="جست و جو در آزمون ها"
                     @keydown.enter.prevent="setFilter">
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
        <div class="filter-btn-col"
             :class="quizType === 'myExam' ? 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6' : 'col-xs-2 col-sm-6 col-md-6 col-lg-6 col-xl-6'">
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
      <div v-if="exams.list.length > 0"
           class="quiz-list-wrapper">
        <q-list class="quiz-list">
          <q-item class="quiz-list-item header">
            <q-item-section>
              <div class="row quiz-list-header-row">
                <div class="quiz-list-header-col"
                     :class="quizType === 'myExam' ? 'col-5' : 'col-5'">
                  عنوان آزمون
                </div>
                <div v-if="quizType === 'myExam'"
                     :class="quizType === 'myExam' ? 'col-2' : 'col-4'"
                     class="quiz-list-header-col centered">
                  نوع آزمون
                </div>
                <div class="quiz-list-header-col started"
                     :class="quizType === 'myExam' ? 'col-3' : 'col-4 exam'">
                  شروع آزمون
                </div>
                <div class="quiz-list-header-col"
                     :class="quizType === 'myExam' ? 'col-2' : 'col-3'">
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
                     :class="quizType === 'myExam' ? 'col-xs-12 col-sm-5 col-md-5 col-lg-5 col-xl-5' : 'col-xs-12 col-sm-4 col-md-5 col-lg-5 col-xl-5'">
                  <span v-if="$q.screen.lt.sm"
                        class="quiz-list-res-title">
                    عنوان آزمون :
                  </span>
                  <div class="quiz-list-item-name-text">{{item.title}}</div>
                </div>
                <div v-if="quizType === 'myExam' || $q.screen.lt.sm"
                     class="quiz-list-item-schedule ellipses"
                     :class="quizType === 'myExam' ? 'col-xs-12 col-sm-2 col-md-2 col-lg-2 col-xl-2' : 'col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4'">
                  <span v-if="$q.screen.lt.sm"
                        class="quiz-list-res-title type">
                    نوع آزمون :
                  </span>
                  {{item.type.value === 'konkur' ? 'تست' : 'شخصیت شناسی'}}
                </div>
                <div class="quiz-list-item-schedule ellipses"
                     :class="quizType === 'myExam' ? 'col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3' : 'col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4'"
                >
                  <span v-if="$q.screen.lt.sm"
                        class="quiz-list-res-title time">
                    شروع آزمون :
                  </span>
                  <div class="uiz-list-item-schedule-time">
                    {{ getTimeFromDateTime(item.start_at) + ' ، ' }}
                  </div>
                  <div class="uiz-list-item-schedule-date">
                    {{getDate(item.start_at)}}
                  </div>
                </div>
                <div class="quiz-list-item-action"
                     :class="{'has-secondary':getExamActons(item).secondary,'col-xs-12 col-sm-2 col-md-2 col-lg-2 col-xl-2': quizType === 'myExam','col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-3': quizType === 'exam' }"
                >
                  <q-btn v-if="getExamActons(item).primary"
                         class="quiz-action-btn"
                         :class="getExamActons(item).primary.title === 'شروع آزمون' ? 'enroll' : getExamActons(item).primary.title === 'ادامه آزمون' ? 'continue' : 'result'"
                         :label="getExamActons(item).primary.title"
                         @click="getExamActons(item).primary.action"
                  />
                  <q-btn v-if="getExamActons(item).secondary"
                         flat
                         class="q-ml-md"
                  >
                    <svg width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="6"
                        r="2"
                        fill="#6D708B"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="2"
                        fill="#6D708B"
                      />
                      <circle
                        cx="12"
                        cy="18"
                        r="2"
                        fill="#6D708B"
                      />
                    </svg>
                    <q-menu fit
                            anchor="bottom left"
                            self="top middle"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                    >
                      <q-list>
                        <q-item v-for="(examAction, examActionIndex) in getExamActons(item).secondary"
                                :key="'actionIndex-'+examActionIndex"
                                v-ripple
                                clickable
                                @click="examAction.action"
                        >
                          <q-item-section avatar>
                            <q-icon :name="examAction.icon" />
                          </q-item-section>
                          <q-item-section>{{ examAction.title }}</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-else
           class="row">
        <div class="col-12 flex column flex-center">
          <img class="no-item"
               src="https://nodes.alaatv.com/aaa/landing/Soalaa/States/empty_azmuns.png"
               alt="no-item">
          <div v-if="personal"
               class="no-item-title">
            آزمونی ساخته نشده است
          </div>
          <div v-if="!personal"
               class="no-item-title">
            آزمونی وجود ندارد
          </div>
          <q-btn v-if="!personal"
                 class="new-link"
                 flat
                 unelevated
                 label="ثبت نام در آزمون"
                 @click="gotoSubscription" />
          <q-btn v-if="personal"
                 class="new-link"
                 flat
                 unelevated
                 label="ساخت آزمون جدید"
                 @click="gotoCreateExam" />
        </div>
      </div>
      <div class="row text-center justify-center pagination-box">
        <q-pagination
          v-if="pageCount > 1"
          v-model="page"
          :max="pageCount"
          :max-pages="6"
          direction-links
          icon-first="isax:arrow-right-3"
          icon-next="chevron_right"
          icon-last="chevron_left"
          @update:model-value="onChangePage"
        />
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
    },
    pageCount: {
      type: Number,
      default: 0
    },
    pagination: {
      type: Number
    }
  },
  emits: [
    'filterExamList',
    'changePage'
  ],
  mixins: [mixinAuth, mixinQuiz, inputMixin],
  components: {
    FormBuilder
  },
  data: () => ({
    examActions: [],
    examPrimaryAction: null,
    examSecondryActions: [],
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
  computed: {
    page() {
      return this.pagination
    }
  },
  mounted() {
    this.initPageData()
  },
  methods: {
    getExamActons (exam) {
      const examActions = []
      if (exam.exam_actions.can_register) {
        examActions.push({
          title: 'ثبت نام در آزمون',
          icon: 'isax:pen-add',
          action: () => this.registerExam(exam)
        })
      }
      if (exam.exam_actions.can_start) {
        examActions.push({
          title: 'شروع آزمون',
          icon: 'isax:timer-start',
          action: () => this.goToParticipateExamPage(exam, false, this.personal)
        })
      }
      if (exam.exam_actions.can_continue) {
        examActions.push({
          title: 'ادامه آزمون',
          icon: 'isax:forward',
          action: () => this.continueExam(exam, false, this.personal)
        })
      }
      if (exam.exam_actions.can_see_report) {
        examActions.push({
          title: 'مشاهده نتایج',
          icon: 'isax:receipt-item',
          background: '#FFB74D',
          action: () => this.goToResult(exam)
        })
      }
      if (exam.exam_actions.can_submit_answer) {
        examActions.push({
          title: 'ثبت پاسخنامه ذخیره شده',
          icon: 'isax:tick-circle',
          action: () => this.getConfirmation(exam.user_exam_id)
        })
      }
      if (exam.exam_actions.can_retake) {
        examActions.push({
          title: 'شروع مجدد',
          icon: 'isax:play-cricle',
          action: () => this.showRetakeConfirmation(exam, this.personal)
        })
      }
      if (exam.booklet_url) {
        exam.booklet_url.forEach(booklet => {
          if (booklet && booklet.questions_booklet_url) {
            examActions.push({
              title: booklet.category_title,
              icon: 'isax:book-1',
              action: () => this.downloadBooklet(booklet.questions_booklet_url)
            })
          }
          if (booklet && booklet.descriptive_answers_booklet_url) {
            examActions.push({
              title: 'پاسخ ' + booklet.category_title,
              icon: 'isax:note-2',
              action: () => this.downloadBooklet(booklet.descriptive_answers_booklet_url)
            })
          }
        })
      }
      if (this.quizType === 'myExam') {
        examActions.push({
          title: 'دانلود سوالات آزمون',
          disable: true,
          to: { name: 'User.Exam.Download' },
          icon: 'isax:import',
          action: () => this.$router.push({ name: 'User.Exam.Download', params: { examId: exam.id } })
        })
      }
      if (exam.holding_status) {
        examActions.push({
          title: exam.holding_status,
          icon: 'isax:info-circle',
          action: () => {}
        })
      }

      const primary = examActions.length > 0 ? examActions[0] : null
      const secondary = examActions.length > 1 ? examActions.slice(1) : null

      return { primary, secondary }
    },
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
    gotoSubscription() {
      this.$router.push({ name: 'Landing.3aExams' })
    },
    gotoCreateExam() {
      this.$router.push({ name: 'User.Create.Exam' })
    },
    onChangePage(value) {
      this.$emit('changePage', value)
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

        @media only screen and (max-width: 390px){
          width: 100%;
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
            margin-bottom: 0;

            @media only screen and (max-width: 600px){
              display: none;
            }
          }

          .quiz-list-header-row {
            .quiz-list-header-col {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 25px;
              text-align: right;
              color: #6D708B;
              padding-left: 30px;

              &.centered {
                justify-content: center;
                padding-left: 0px;
              }

              &.started {
                padding-left: 85px;

                &.exam {
                  padding-left: 100px;
                  @media only screen and (max-width: 1024px) and (min-width: 600px) {
                    padding-left: 40px;
                  }
                }

                @media only screen and (max-width: 1024px) and (min-width: 600px) {
                  padding-left: 50px;
                }
              }
            }
          }

          .quiz-list-item-row {
            display: flex;
            flex-direction: row;
            width: 100%;

            .quiz-list-item-name {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              color: #434765;
              padding-left: 30px;

              .quiz-list-item-name-text {
                @media only screen and (max-width: 600px){
                  width: 85%;
                }
              }

              @media only screen and (max-width: 600px){
                justify-content: flex-start;
                padding-left: 0px;
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
              width: 100px;
              text-align: left;

              &.type{
                width: 75px;
              }

              &.time{
                width: 90px;
              }
            }
            .quiz-list-item-action {
              display: flex;
              justify-content: flex-start;
              align-items: center;

              &.has-secondary {
                justify-content: space-between;
              }

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

    .pagination-box{
      margin-top: 30px;
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
