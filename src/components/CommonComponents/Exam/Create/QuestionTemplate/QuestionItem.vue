<template>
  <q-card
    class="question-card custom-card"
    :class="{ 'selected': ( selected || question.selected) && !finalApprovalMode }"
  >
    <q-resize-observer @resize="onResize" />
    <q-card-section class="question-card-header row">
      <div class="question-info col-xl-9 col-sm-8 col-xs-12">
        <div
          v-if="listConfig.questionId"
          class="question-card-chip-id"
        >
          <q-chip class="question-id ">
            سوال
            <q-skeleton
              v-if="question.loading"
              class="chip-dynamic-text"
              type="text"
              width="110px"
            />
            <span class="chip-dynamic-text ellipsis">
              {{ question.code }}
            </span>
          </q-chip>
        </div>

        <div
          v-if="listConfig.questionLevel"
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
        v-if="listConfig.questionSource"
        class="question-source col-xl-3 col-sm-4 col-xs-6"
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
              v-if="question.years[0]"
              class="source-date"
            >
              {{ question.years[0].value }}
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
            <span
              v-else
              class="alternate-avatar"
            />
          </div>
        </div>
      </div>
      <div
        v-if="listConfig.questionInfo && question.tags.list.length > 0"
        class="question-tags ellipsis col-sm-12 col-xs-6"
      >
        <div
          v-for="(item, index) in question.tags.list"
          :key="index"
          class="question-tag"
        >
          <q-skeleton
            v-if="question.loading"
            class="info-title"
            type="text"
            width="80px"
          />
          <div
            v-else
            class="tag-box no-wrap flex items-center"
          >
            <div class="tag-title ellipsis">{{ item.title }}</div>
            <div class="tag-circle" />
          </div>

        </div>
      </div>
    </q-card-section>

    <q-card-section
      class="question-section "
      :class="{'extra-panel' : finalApprovalMode }"
    >
      <div
        v-if="finalApprovalMode || showQuestionNumber"
        class="question-index"
      >
        <div class="question-number">{{ finalApprovalMode ? questionIndex + 1 : question.order }}</div>
      </div>

      <div
        v-else
        class="question-icon"
        :class="isLtrQuestion() ? 'order-last' : ''"
      />

      <div class="question full-width">
        <question
          ref="questionComponent"
          :question="question"
        />
      </div>
    </q-card-section>

    <q-card-section class="answer-section">
      <q-expansion-item
        v-model="descriptiveAnswerExpanded"
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
            <div class="answer-video flex items-center justify-center"
                 :class="{'bg-white': ( selected || question.selected) && !finalApprovalMode}"
            >
              <div class="soon flex items-center justify-center">
                به زودی
              </div>

              <!--              ToDo : uncomment this when backend give you a valid key-->
              <!--              <video-player />-->
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
          :label="descriptiveAnswerExpanded ? '' : ''"
          :icon-right="descriptiveAnswerExpanded ? 'isax:arrow-up-2' : 'isax:arrow-down-1'"
          @click="descriptiveAnswerExpanded = !descriptiveAnswerExpanded"
        >
          <span v-if="descriptiveAnswerExpanded">
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
import question from 'components/CommonComponents/Exam/Create/QuestionTemplate/Question'
// import VideoPlayer from 'src/components/VideoPlayer'
import { Question } from 'src/models/Question'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'QuestionItem',
  components: {
    VueKatex,
    question
    // VideoPlayer
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
          deleteQuestionFromDb: true,
          editQuestion: false,
          switch: true
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
  emits: ['checkSelect', 'changeOrder'],
  data () {
    return {
      questionChoiceList: [],
      confirmQuestion: false,
      descriptiveAnswerExpanded: false,
      questionLevel: 2,
      listConfig: {
        questionId: false,
        questionLevel: false,
        questionSource: false,
        questionInfo: false,
        editQuestion: true,
        switch: false,
        selectQuestion: true,
        reportProblem: true,
        questionRate: true,
        questionComment: true,
        descriptiveAnswer: true,
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
      }
    }
  },
  created () {
    this.setPageConfig()
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
      this.$refs.questionComponent.setChoiceCol()
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
        editQuestion: true,
        selectQuestion: true,
        reportProblem: true,
        questionRate: true,
        questionComment: true,
        descriptiveAnswer: true,
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
        // return finalConf
      }
      if (this.pageStrategy === 'lesson-detail') {
        // return finalConf
      }
      return finalConf
    },
    applyListConfig () {
      let finalConf = {}
      if (this.finalApprovalMode) {
        finalConf = {
          ...this.listOptions,
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
        justify-content: left;

      @media only screen and (max-width: 599px) {
        order: 2;
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
      flex-direction: row;
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
        .tag-title{
          @media screen and (max-width: 599px){
            order: 2;
          }
          div{
            max-width: 99px;
          }
        }

        &:last-child {
          .tag-circle {
            display: none;
            @media screen and (max-width: 599px) {
              display: block;
            }
          }
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

      .question-number {
        position: absolute;
        left: -44px;
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
          left: -30px;
        }
      }
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
        max-width: 620px;
        width: 100%;
        background: #F6F9FF;
        border-radius: 16px;
        margin-right: 30px;

        @media only screen and (max-width: 1439px) {
          height: 230px;
        }

        @media only screen and (max-width: 1023px) {
          padding: 16px;
          margin-right: 24px;
          height: 200px;
        }

        @media only screen and (max-width: 599px) {
          max-width: 100%;
          height: 310px;
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
        .answer-video {
          width: 316px;
          height: 176px;
          background: #f6f9ff;
          border-radius: 16px;
          margin-bottom: 10px;
          .soon{
            width: 86px;
            height: 32px;
            background: #FFB74D;
            border-radius: 18px;
            color: white;
          }

          @media only screen and (max-width: 1439px) {
            width: 230px;
            height: 130px;
          }

          @media only screen and (max-width: 1023px) {
            width: 238px;
          }

          @media only screen and (max-width: 599px) {
            width: 100%;
            height: 158px;
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
