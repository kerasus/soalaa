<template>
  <q-card
    class="question-card custom-card"
    :class="{ 'selected': ( selected || question.selected) && !finalApprovalMode }"
  >
    <q-resize-observer @resize="onResize" />
    <q-card-section class="question-card-header items-center row">
      <div class="question-info col-xl-9 col-sm-8 col-xs-12">
        <div
          class="question-card-chip-id"
        >
          <q-skeleton
            v-if="question.loading"
            class="chip-dynamic-text"
            type="text"
            width="110px"
          />
          <div v-else-if="question.code">
            <q-chip class="question-id ">
              سوال
              <span
                class="chip-dynamic-text ellipsis">
                {{ question.code }}
              </span>
            </q-chip>
          </div>
        </div>

        <div
          v-if="listConfig.questionLevel || question.loading "
          class="question-level"
        >
          <div
            v-if="question.loading"
            class="level-skeleton"
          >
            <div class="level-text">
              <q-skeleton
                type="text"
                width="40px"
                height="25px"
                class="q-ml-xs"
              />
            </div>

            <q-skeleton
              v-for="item in 3"
              :key="item"
              class="level-circles"
            >
            </q-skeleton>
          </div>

          <div
            v-else-if="question.level"
            class="level-content"
          >
            <div
              v-for="item in 3"
              :key="item"
              class="level-circles"
              :class="item === questionLevelClasses[questionLevel]?.level ? questionLevelClasses[questionLevel].class : ''">
            </div>
            <div class="level-text">
              {{ questionLevelClasses[questionLevel]?.title }}
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="listConfig.questionSource || question.loading "
        class="question-source col-xl-3 col-sm-4 col-xs-12"
      >
        <div
          v-if="question.loading"
          class="source-skeleton"
        >
          <div class="source-text">
            <q-skeleton
              type="text"
              class="source-name"
              width="90px"
              height="30px"
            />
            <q-skeleton
              type="text"
              class="source-date"
              width="40px"
              height="20px"
            />
          </div>

          <div class="source-avatar">
            <q-skeleton
              type="QAvatar"
              size="36px"
            />
          </div>
        </div>

        <div
          v-else
          class="source-content"
        >
          <div class="source-text">
            <div
              v-if="question.reference[0]"
              class="source-name"
            >
              {{ question.reference[0].value }}
            </div>
            <div
              v-if="(listConfig.questionYear && question.years.length > 0) || question.loading"
              class="question-year ellipsis col-sm-6 col-xs-6 justify-end"
            >
              <q-skeleton
                v-if="question.loading"
                class="info-title q-mx-sm"
                type="text"
                width="80px"
              />
              <div
                v-for="(year, index) in question.years"
                :key="index"
                class="question-tag"
              >
                {{year.value}}
              </div>
            </div>
          </div>

          <div
            v-if="question.reference[0]"
            class="source-avatar"
          >
            <q-avatar
              v-if="question.reference[0].image"
              :icon="`img:${question.reference[0].image}`"
              size="36px"
            >
            </q-avatar>
            <q-avatar
              v-else
              size="36px"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="72"
                   height="35"
                   viewBox="0 0 72 35"
                   fill="none">
                <path d="M66.1532 11.2621C69.5366 11.6879 72.382 8.85486 71.9578 5.48268C71.6681 3.18533 69.8056 1.33441 67.4983 1.04252C64.1148 0.616705 61.2694 3.44975 61.6936 6.82193C61.9833 9.11927 63.8458 10.9702 66.1532 11.2621Z"
                      fill="#FFB74D" />
                <path d="M32.5867 28.7181C36.3451 25.2249 38.4994 20.2902 38.4994 15.173C38.4994 12.7591 40.4722 10.7904 42.9042 10.7904H53.0956C55.6649 10.7904 57.7528 8.71601 57.7528 6.15045C57.7528 3.58489 55.6649 1.51045 53.0956 1.51045H42.9042C35.3427 1.51045 29.185 7.63702 29.185 15.173C29.185 17.7627 28.1374 20.1597 26.2333 21.9314L26.2329 21.9317C24.3345 23.7008 21.8498 24.5723 19.2301 24.3944C14.6275 24.0791 10.8422 20.2207 10.6247 15.628C10.5086 13.169 11.3486 10.819 12.9897 9.00181L12.9898 9.00171C14.7112 7.09505 14.5528 4.15956 12.6388 2.44653C10.7261 0.734792 7.78301 0.891513 6.06356 2.79608C2.77373 6.44009 1.09008 11.1547 1.32095 16.0636L1.32095 16.0638C1.76396 25.4461 9.19286 33.0069 18.5917 33.6528C19.0369 33.6843 19.4793 33.7 19.922 33.7H21.6157L21.5432 33.6278C25.662 33.275 29.5071 31.5811 32.5867 28.7181ZM32.5867 28.7181L32.1102 28.2053M32.5867 28.7181L32.1102 28.2053M32.1102 28.2053C35.7265 24.8442 37.7994 20.095 37.7994 15.173C37.7994 12.3696 40.0885 10.0904 42.9042 10.0904H53.0956C55.2812 10.0904 57.0528 8.32654 57.0528 6.15045C57.0528 3.97436 55.2812 2.21045 53.0956 2.21045H42.9042C35.7265 2.21045 29.885 8.02649 29.885 15.173C29.885 17.9583 28.7557 20.5405 26.7101 22.4439L20.885 32.9717C25.0747 32.7515 28.9969 31.0995 32.1102 28.2053Z"
                      fill="#9690E4"
                      stroke="#9690E4"
                      stroke-width="1.4" />
              </svg>
            </q-avatar>
          </div>
        </div>
      </div>
      <question-tags :question="question"
                     :list-config="listConfig" />
    </q-card-section>

    <q-card-section
      class="question-section "
      :class="{'extra-panel' : finalApprovalMode }"
    >
      <div
        v-if="finalApprovalMode || showQuestionNumber"
        class="question-index"
      >
        <div class="question-number-box">
          <div class="question-number">{{ finalApprovalMode ? questionIndex + 1 : question.in_subcategory_order }}</div>
        </div>
      </div>

      <div v-else>
        <div class="question-icon-box">
          <div
            class="question-icon"
            :class="isLtrQuestion() ? 'order-last' : ''"
          />
        </div>
      </div>

      <div class="question full-width">
        <question
          ref="questionComponent"
          :loading="question.loading"
          :question="question"
        />
      </div>
    </q-card-section>

    <div v-if="question.group">
      <question-item
        v-for="childQuestion in question.group"
        :key="childQuestion.id"
        :question="childQuestion"
        pageStrategy="question-bank"
      />
    </div>

    <q-card-section class="answer-section">
      <q-expansion-item
        v-model="listConfig.questionAnswerExpanded"
        header-class="hideExpansionHeader"
      >
        <div class="description-answer-body">
          <div class="description-answer"
               :class="{'bg-white': ( selected || question.selected) && !finalApprovalMode}"
          >
            <div
              v-if="this.question.choices.getSelected()"
              class="question-answer-choice"
            >
              گزینه
              {{ this.question.choices.getSelected().getNumberTitle() }}
            </div>

            <div
              v-if="question.descriptive_answer"
              class="question-answer-description"
            >
              <vue-katex :input="question.descriptive_answer? question.descriptive_answer :'پاسخ تشریحی ندارد.'" />
            </div>
          </div>

          <div class="description-answer-video"
          >
            <div v-if="contentLoading"
                 class="answer-video flex items-center justify-center">
              <q-spinner-ball
                color="primary"
                size="2em"
              />
            </div>
            <div v-else
                 class="answer-video flex items-center justify-center"
                 :class="{'bg-white': ( selected || question.selected) && !finalApprovalMode}"
            >
              <content-video-player v-if="content.hasVideoSource()"
                                    :content="content"
                                    :timePoint="questionTimePoint"
                                    :nextTimePoint="nextTimePoint" />
              <div v-else>
                ویدیویی وجود ندارد!
              </div>
            </div>

            <div class="answer-video-title">
              پاسخنامه ویدیویی
            </div>
          </div>
        </div>
      </q-expansion-item>
    </q-card-section>

    <q-card-section
      v-if="!question.loading"
      class="question-footer-section"
    >
      <div class="attach-question-buttons">
        <q-btn v-if="listOptions.editQuestion"
               unelevated
               color="primary"
               icon="isax:edit-2"
               class="question-item-button"
               :to="{name: 'Admin.Question.Edit', params: {
                 question_id: question.id
               }}"
        />
        <q-btn v-if="listOptions.deleteQuestionFromExam"
               unelevated
               color="primary"
               icon="isax:trash"
               class="question-item-button"
               @click="deleteQuestion"
        >
          <q-tooltip anchor="top middle"
                     self="bottom middle"
                     :offset="[10, 10]">
            حدف سوال از آزمون
          </q-tooltip>
        </q-btn>
        <q-btn v-if="listOptions.deleteQuestionFromDb"
               unelevated
               color="primary"
               icon="folder_delete"
               class="question-item-button"
               @click="deleteQuestionFromDb"
        >
          <q-tooltip anchor="top middle"
                     self="bottom middle"
                     :offset="[10, 10]">
            حدف سوال از پایگاه داده
          </q-tooltip>
        </q-btn>
        <q-btn
          v-if="listConfig.selectQuestion"
          unelevated
          class="question-item-button"
          :class="(selected || question.selected) ? 'detach-button': 'attach-button'"
          :icon="(selected || question.selected) ? 'isax:minus' : 'isax:add'"
          @click="selectQuestion"
        />

        <q-btn
          v-if="finalApprovalMode && questionsLength > 1 &&  questionIndex+1 !== 1"
          unelevated
          icon="isax:arrow-up-2"
          color="primary"
          class="order-btn"
          @click="changeOrder('up', question)"
        />
        <q-btn
          v-if="finalApprovalMode  && questionsLength > 1 && questionIndex+1 < questionsLength "
          unelevated
          icon="isax:arrow-down-1"
          color="primary"
          class="order-btn"
          @click="changeOrder('down', question)"
        />
      </div>

      <div class="user-action-buttons">
        <q-btn
          v-if="listConfig.reportProblem"
          flat
          dense
          label="گزارش خطا"
          icon-right="isax:danger"
          class="report-button"
          @click="reportProblemDialog.show = true"
        />

        <q-btn
          v-if="listConfig.descriptiveAnswer"
          flat
          role="presentation"
          class="see-answer-button no-padding"
          :label="listConfig.questionAnswerExpanded ? '' : ''"
          :icon-right="listConfig.questionAnswerExpanded ? 'isax:arrow-up-2' : 'isax:arrow-down-1'"
          @click="toggleContent"
        >
          <span v-if="listConfig.questionAnswerExpanded">
            پاسخ تشریحی
            <!--            بستن پاسخ تشریحی-->
          </span>
          <span v-else>
            <!--            <span :hidden="$q.screen.lt.sm">نمایش </span>-->
            <span>
              پاسخ تشریحی
            </span>
          </span>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
  <q-dialog v-model="reportProblemDialog.show">
    <q-card
      flat
      class="report-problem-dialog"
    >
      <q-card-section class="header-section">
        <q-btn
          v-close-popup
          flat
          round
          dense
          icon="close"
          class="close-button"
        />
        <div class="report-title">گزارش خطا</div>
      </q-card-section>

      <q-card-section class="problem-type no-padding">
        <div class="report-title">
          نوع خطا
        </div>
        <q-select
          v-model="reportProblemDialog.problemType"
          filled
          dense
          dropdown-icon="isax:arrow-down-1"
          :options="reportProblemDialog.options"
          option-value="id"
          option-label="value"
          map-options
          emit-value
          class="report-select-type"
        />
      </q-card-section>

      <q-card-section class="problem-description no-padding">
        <div class="report-title">
          توضیحات
        </div>
        <q-input
          v-model="reportProblemDialog.description"
          filled
          type="textarea"
          class="description-input"
        />
      </q-card-section>

      <q-card-actions class="action-box no-padding">
        <q-btn
          v-close-popup
          unelevated
          label="انصراف"
          class="cancel report-button"
        />
        <q-btn
          v-close-popup
          unelevated
          label="ثبت"
          color="primary"
          class="report-button"
          @click="reportProblem"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import VueKatex from 'src/components/VueKatex'
import question from 'components/Question/QuestionItem/Question'
import ContentVideoPlayer from 'src/components/ContentVideoPlayer.vue'
import { Question } from 'src/models/Question.js'
import API_ADDRESS from 'src/api/Addresses.js'
import { Content } from 'src/models/Content.js'
import { ContentTimePoint } from 'src/models/ContentTimePoint.js'
import QuestionTags from 'components/CommonComponents/Exam/Create/QuestionTags/QuestionTags'

export default {
  name: 'QuestionItem',
  components: {
    VueKatex,
    question,
    ContentVideoPlayer,
    QuestionTags
  },
  props: {
    questionsLength: {
      type: Number,
      default: 0
    },
    questionIndex: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    question: {
      type: Question,
      default: new Question()
    },
    listOptions: {
      type: Object,
      default () {
        return {
          copy: true,
          detachQuestion: true,
          deleteQuestionFromDb: false,
          deleteQuestionFromExam: false,
          editQuestion: false,
          switch: true,
          questionAnswerExpanded: false
        }
      }
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    pageStrategy: {
      type: String,
      default: ''
    },
    finalApprovalMode: {
      type: Boolean,
      default: false
    },
    showQuestionNumber: {
      type: Boolean,
      default: false
    },
    reportOptions: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'checkSelect',
    'changeOrder',
    'detachQuestion',
    'deleteQuestionFromExam',
    'copyIdToClipboard',
    'confirmQuestion',
    'deleteFromExam',
    'deleteFromDb'
  ],
  data () {
    return {
      contentLoading: false,
      questionChoiceList: [],
      confirmQuestion: false,
      questionLevel: 2,
      listConfig: {
        questionId: false,
        questionLevel: false,
        questionSource: false,
        questionInfo: false,
        editQuestion: true,
        switch: false,
        selectQuestion: false,
        reportProblem: true,
        questionRate: true,
        questionYear: false,
        questionComment: true,
        descriptiveAnswer: true,
        questionAnswerExpanded: false,
        menu: {
          show: true,
          items: {
            copy: true,
            detachQuestion: true,
            deleteQuestionFromDb: true
          }
        }
      },
      questionCol: '',
      questionLevelClasses: {
        1: {
          level: 1,
          class: 'easy',
          title: 'آسان'
        },
        2: {
          level: 2,
          class: 'medium',
          title: 'متوسط'
        },
        3: {
          level: 3,
          class: 'hard',
          title: 'سخت'
        }
      },
      info: [
        {
          name: 'شیمی دهم'
        },
        {
          name: 'فصل اول با عنوان لورم ایپسوم'
        },
        {
          name: 'ساختار اتم'
        }
      ],
      reportProblemDialog: {
        show: false,
        problemType: '',
        options: [],
        description: ''
      },
      content: new Content(),
      questionTimePoint: new ContentTimePoint(),
      nextTimePoint: new ContentTimePoint()
    }
  },
  created () {
    this.setPageConfig()
    // console.log('this.question ', this.question)
  },
  mounted () {
    this.setQuestionLevel()
    // console.log('question :', this.question)
  },
  computed: {
    trueChoice () {
      return this.question.choices.getSelected()
    },
    redirectToEditPage () {
      return {
        name: 'Admin.Question.Edit',
        params: {
          question_id: this.question.id
        }
      }
    }
  },
  methods: {
    onResize () {
      this.$refs.questionComponent?.setChoiceCol()
    },
    changeOrder (mode, question) {
      this.$emit('changeOrder', {
        question,
        mode
      })
    },
    isLtrQuestion () {
      const string = this.question.statement
      if (!string) {
        return false
      }
      const persianRegex = /[\u0600-\u06FF]/
      return !string.match(persianRegex)
    },
    selectQuestion () {
      this.$emit('checkSelect', this.question)
    },
    setQuestionLevel () {
      this.questionLevel = this.question.level
    },
    setPageConfig () {
      this.applyPageStrategy()
      this.applyListConfig()
      this.getQuestionReportOptions()
    },
    getQuestionReportOptions() {
      this.reportProblemDialog.options = this.reportOptions
    },
    applyPageStrategy () {
      if (!this.pageStrategy) return
      let source = {}
      source = this.pageMode()

      this.listConfig = Object.assign(this.listConfig, source)
    },
    pageMode () {
      const baseConf = {
        questionId: true,
        questionLevel: true,
        questionSource: true,
        questionInfo: true,
        deleteQuestionFromDb: false,
        deleteQuestionFromExam: false,
        editQuestion: true,
        selectQuestion: false,
        reportProblem: true,
        questionRate: true,
        questionComment: true,
        questionYear: false,
        descriptiveAnswer: true,
        questionAnswerExpanded: false,
        menu: {
          show: true,
          items: {
            copy: false,
            detachQuestion: true,
            deleteQuestionFromDb: true,
            confirmQuestion: true
          }
        }
      }
      const finalConf = {
        ...baseConf
      }
      if (this.pageStrategy === 'question-bank') {
        finalConf.deleteQuestionFromExam = true
        finalConf.deleteQuestionFromDb = true
        finalConf.questionYear = true
        // return finalConf
      }
      if (this.pageStrategy === 'lesson-detail') {
        // todo : temp
        finalConf.questionAnswerExpanded = true
        // return finalConf
      }
      return finalConf
    },
    applyListConfig () {
      let finalConf = {}
      if (this.finalApprovalMode) {
        finalConf = {
          ...this.listOptions,
          questionYear: true,
          reportProblem: true,
          editQuestion: false,
          menu: {
            show: false,
            items: {
              copy: false,
              detachQuestion: true,
              deleteQuestionFromDb: true,
              confirmQuestion: true
            }
          }
        }
      }

      this.listConfig = Object.assign(this.listConfig, finalConf)
    },
    emitAdminActions (action, data) {
      this.$emit(action, data)
    },
    deleteQuestion() {
      this.$emit('deleteFromExam', this.question)
    },
    deleteQuestionFromDb() {
      this.$emit('deleteFromDb', this.question)
    },
    async reportProblem() {
      const params = {
        type_id: this.reportProblemDialog.problemType,
        body: this.reportProblemDialog.description
      }
      try {
        await this.$axios.post(API_ADDRESS.exam.user.report(this.question.id), params)
        this.$q.notify({
          type: 'positive',
          message: 'گزازش با موفقیت ثبت شد.'
        })
      } catch (e) {
        this.$q.notify({
          type: 'negative',
          message: 'مشکلی به وجود آمده.'
        })
      }
    },
    toggleContent() {
      this.listConfig.questionAnswerExpanded = !this.listConfig.questionAnswerExpanded
      if (this.listConfig.questionAnswerExpanded) {
        this.getQuestionContent()
      }
    },
    getQuestionContent() {
      if (!this.question.content_id) {
        return
      }
      this.contentLoading = true
      this.$axios.get(API_ADDRESS.content.get(this.question.content_id))
        .then(res => {
          this.content = new Content(res.data.data)
          this.getTimePoints()
          this.contentLoading = false
        })
        .catch(() => {
          this.contentLoading = false
        })
    },
    getTimePoints() {
      this.questionTimePoint = this.content.timepoints.list.find(x => x.id === this.question.time_point_id)
      const timePointList = this.content.timepoints.list
      timePointList.sort((a, b) => (a.time > b.time ? 1 : -1))
      const timePointIndex = timePointList.findIndex(x => x.id === this.question.time_point_id) + 1
      this.nextTimePoint = timePointList[timePointIndex]
    }
  }
}
</script>

<style lang="scss" scoped>
.question-card {
  padding: 18px 24px 24px 24px;
  margin-bottom: 16px;
  &.selected{
    background: #F6F9FF;
    box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(112, 108, 161, 0.05), inset -8px 8px 20px rgba(112, 108, 161, 0.1), inset 8px -8px 20px rgba(112, 108, 161, 0.1), inset -8px -8px 10px rgba(255, 255, 255, 0.9), inset 8px 8px 13px rgba(112, 108, 161, 0.15) #{"/* rtl:ignore */"};
    border-radius: 16px;
  }

  @media only screen and (max-width: 1023px) {
    padding: 16px 20px 20px 20px;
  }

  @media only screen and (max-width: 599px) {
    padding: 16px 16px 20px 16px;
  }

  .question-card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    margin-bottom: 24px;

    @media only screen and (max-width: 1439px) {
      margin-bottom: 14px;
    }

    @media only screen and (max-width: 1023px) {
      margin-bottom: 12px;
    }

    .question-info {
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 599px) {
        margin-bottom: 12px;
      }

      .question-card-chip-id {
        display: flex;

        .chip-dynamic-text{
          @media screen and (max-width: 600px) {
            max-width: 60px;
          }
        }

        &:deep(.q-chip) {
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
          color: #434765;
          background: #F2F5F9;
          padding: 2px 8px;
        }

        .chip-dynamic-text {
          padding-left: 12px;

          @media only screen and (max-width: 1023px) {
            padding-left: 8px;
          }
        }
      }

      .question-level {
        display: flex;

        .level-content,
        .level-skeleton {
          display: flex;
          direction: rtl;

          .level-text {
            margin-right: 5px;
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 19px;
            color: #434765;
          }

          .level-circles {
            display: flex;
            flex-direction: row;
            margin-left: 5px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            background: #F2F5F9;

            &.easy {
              background: #8ED6FF;
            }

            &.medium {
              background: #FFCA28;
            }

            &.hard {
              background: #DA5F5C;
            }
          }
        }
      }
    }

    .question-source {
      display: flex;
      align-items: center;
      justify-content: right;
      min-height: 36px;

      @media only screen and (max-width: 599px) {
        //order: 2;
      }
      .source-content,
      .source-skeleton {
        display: flex;

        .source-text {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
          color: #434765;
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .source-date {
            text-align: end;
          }
        }

        .source-avatar {
          margin-left: 10px;
          display: flex;
          align-items: center;

          @media only screen and (max-width: 1023px) {
            margin-left: 4px;
          }

          .alternate-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #9690E4;
          }
        }
      }
    }

    .question-tags {
      display: flex;
      flex-direction: column;
      margin-top: 16px;

      @media only screen and (max-width: 1439px) {
        margin-top: 20px;
      }

      @media screen and (max-width: 599px) {
        flex-direction: column;
        margin-top: 0;
      }

      .question-tag {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        color: #434765;

        .tag-title{
          @media screen and (max-width: 599px){
            order: 2;
          }
          div{
            max-width: 99px;
          }
        }

        .tag-circle {
          border-radius: 50%;
          margin: 0 6px;
          width: 6px;
          height: 6px;
          background: #6D708B;
          opacity: 0.3;
          @media screen and (max-width: 599px){
            order: 1;
          }
        }
      }
    }

    .question-year {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      @media only screen and (max-width: 1439px) {
        margin-top: 20px;
      }

      @media screen and (max-width: 599px) {
        margin-top: 0;
      }
    }

    .question-tag {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 19px;
      color: #434765;

      .tag-title{
        @media screen and (max-width: 599px){
          order: 2;
        }
        div{
          max-width: 99px;
        }
      }

      .tag-circle {
        border-radius: 50%;
        margin: 0 6px;
        width: 6px;
        height: 6px;
        background: #6D708B;
        opacity: 0.3;
        @media screen and (max-width: 599px){
          order: 1;
        }
      }
    }
  }

  .question-section {
    display: flex;
    padding: 0;
    &.extra-panel{
      padding-left: 20px;
      @media screen and (max-width: 1024px) {
        padding-left: 10px;
      }
    }

    .question-index {
      position: relative;
      width: 15px;
      .question-number-box{
        position: absolute;
        left: -25px;
        width: 34px;
        height: var(--katexLineHeight);
        display: flex;
        align-items: center;
        @media only screen and (max-width: 1023px) {
          width: 26px;
          left: -30px;
        }
      }

      .question-number {
        width: 34px;
        height: 36px;
        background: var(--3a-Primary);
        border-radius: 0 10px 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        font-size: 16px;

        @media only screen and (max-width: 1023px) {
          width: 26px;
          height: 28px;
        }
      }
    }
    .question-icon-box{
      height: var(--katexLineHeight);
      display: flex;
      align-items: center;
    }

    .question-icon {
      margin-top: 5px;
      margin-right: 10px;
      width: 10px;
      height: 10px;
      background: #9690E4;
      border-radius: 3px;

      @media only screen and (max-width: 1439px) {
        margin-right: 8px;
      }

      @media only screen and (max-width: 599px) {
        margin-right: 4px;
      }
    }

    .question {

    }
  }

  .answer-section {
    padding: 0;

    :deep(.hideExpansionHeader) {
      display: none;
    }

    .description-answer-body {
      display: flex;

      margin-bottom: 24px;

      @media only screen and (max-width: 1023px) {
        margin-bottom: 20px;
      }

      @media only screen and (max-width: 599px) {
        margin-bottom: 28px;
        margin-right: 0;
        flex-direction: column;
      }

      .description-answer {
        padding: 20px 24px;
        width: 60%;
        background: #F6F9FF;
        border-radius: 16px;
        margin-right: 30px;

        @media only screen and (max-width: 1439px) {
          //height: 230px;
        }

        @media only screen and (max-width: 1023px) {
          padding: 16px;
          margin-right: 24px;
          //height: 200px;
          width: 50%;
        }

        @media only screen and (max-width: 599px) {
          max-width: 100%;
          width: 100%;
          //height: 310px;
          margin-bottom: 20px;

        }

        .question-answer-choice {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 12px;
          width: 77px;
          height: 24px;
          background: #4CAF50;
          border-radius: 12px;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          letter-spacing: -0.03em;
          color: #FFFFFF;
        }

        .question-answer-description {

        }
      }

      .description-answer-video {
        min-height: 176px;
        width: 40%;
        @media screen and(max-width: 1439px) {
          width: 38%;
          height: 130px;
        }
        @media screen and(max-width: 1023px) {
          width: 48%;
        }
        @media screen and(max-width: 599px) {
          width: 100%;
          height: 158px;
        }
        .answer-video {
          height: 100%;
          width: 100%;
          background: #f6f9ff;
          border-radius: 16px;
          margin-bottom: 10px;
          padding: 0 15px;

          .soon{
            width: 86px;
            height: 32px;
            background: #FFB74D;
            border-radius: 18px;
            color: white;
          }

          @media only screen and (max-width: 1439px) {

          }

          @media only screen and (max-width: 1023px) {
          }

          @media only screen and (max-width: 599px) {

          }
        }

        .answer-video-title {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          letter-spacing: -0.03em;
          color: #434765;
        }
      }

      &:deep(.q-item__section) {
        &:deep(.q-expansion-item__toggle-icon--rotated) {
          display: none !important;
        }
      }
    }

    &:deep(.q-focus-helper) {
      background: none !important;
    }

    &:deep(.q-item .q-item__section .q-icon) {
      display: none;
    }
  }

  .question-footer-section {
    display: flex;
    justify-content: space-between;
    padding: 0;

    .attach-question-buttons {
      display: flex;
      align-items: center;

      .order-btn{
        width: 32px;
        height: 32px;
        margin-right: 12px;
        :deep(.q-icon){
          font-size: 18px;
        }
      }

      .question-item-button {
        width: 40px;
        height: 40px;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
        border-radius: 10px;
        margin-right: 12px;

        &.attach-button {
          background: #9690E4;
          color: #FFFFFF;

        }

        &.detach-button {
          border: 2px solid #9690E4;
          color: #9690E4;
          background: transparent;
        }
      }
    }

    .user-action-buttons {
      @media only screen and (max-width: 599px) {
        display: flex;
        flex-direction: column;
      }

      .report-button {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        color: #6D708B;
        text-align: center;

        @media only screen and (max-width: 599px) {
          align-items: flex-end;
        }
        &:deep(.q-icon) {
          font-size: 14px;
        }
      }

      .see-answer-button {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #434765;
        margin-left: 30px;

        @media only screen and (max-width: 1023px) {
          margin-left: 10px;
        }

        &:deep(.q-icon) {
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
  }

  &:last-child {

    @media only screen and (max-width: 599px) {
      margin-bottom: 160px;
    }
  }
}

.report-problem-dialog {
  background: #FFFFFF;
  border-radius: 15px;
  padding: 12px 24px 20px 24px;
  width: 348px;
  height: 496px;
  .problem-type{
    .report-select-type{
      :deep(.q-field__native){
        span{
          max-width: 250px;
          max-height: 21px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }

  }

  .header-section {
    padding: 0;
    display: flex;
    margin-bottom: 30px;

    .close-button {
      min-width: 24px;
      min-height: 24px;
      margin-left: -12px;
      margin-right: 109px;

      &:deep(.q-btn__content ) {
        margin: 0;
      }

      &:deep(.q-icon) {
        font-size: 20px;
        color: #6D708B;
      }
    }

  }

  .report-title {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    color: #434765;
  }

  .report-select-type {
    margin-top: 8px;
    margin-bottom: 14px;
  }

  .description-input {
    height: 225px;
    margin-top: 8px;
    margin-bottom: 24px;
    :deep(.q-field__control){
      height: 225px;
    }
  }

  .action-box {
    display: flex;
    justify-content: flex-end;

    .report-button {
      height: 40px;
      width: 96px;
      background: #9690E4;
      border-radius: 8px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
      color: #FFFFFF;

      &.cancel {
        background: #F2F5F9;
        color: #6D708B;
      }
    }
  }
}

</style>
