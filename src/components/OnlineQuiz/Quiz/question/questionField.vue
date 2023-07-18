<template>
  <div
    v-intersection="inView"
    class="question-field"
  >
    <q-card v-if="considerActiveCategory && !source.in_active_category && !showWithAnswer"
            class="alert-sheet shadow-2"
            :class="currentQuestion.id === source.id ? 'red-sheet' : 'orange-sheet'"
            rounded
            dark
    >
      <q-card-section class="alert-sheet-text">
        (
        سوال شماره
        {{ getQuestionNumberFromId(source.id) }}
        )
        <br>
        در حال حاضر امکان مشاهده سوالات این دفترچه امکان پذیر نمی باشد
      </q-card-section>
    </q-card>
    <div v-if="(considerActiveCategory && source.in_active_category) || !considerActiveCategory || showWithAnswer"
         class="question-box"
         :class="{ 'current-question': this.currentQuestion.id === source.id, ltr: isLtrQuestion}"
    >
      <div class="question-head">
        <p
          :id="'question' + source.id"
          class="question-body"
          :class="{ ltr: isRtl }"
        >
          <vue-katex
            v-if="source.parent.id"
            :input="questionParentStatement"
          />
          <vue-katex
            :input="questionStatement"
          />
        </p>
        <div
          class="question-icons"
          :style="{ float: isRtlString ? 'left' : 'right' }"
        >
          <q-btn
            v-if="getChoiceStatus() !== 'o'"
            text-color="grey"
            icon="mdi-checkbox-blank-circle-outline"
            flat
            fab-mini
            :disable="showWithAnswer"
            @click="changeStatus(source.id, 'o')"
          />
          <q-btn
            v-else
            icon="mdi-checkbox-blank-circle"
            text-color="yellow"
            flat
            fab-mini
            :disable="showWithAnswer"
            @click="changeStatus(source.id, 'o')"
          />
          <q-btn
            v-if="getChoiceStatus() === 'x'"
            text-color="red"
            icon="mdi-close"
            flat
            fab-mini
            :disable="showWithAnswer"
            @click="changeStatus(source.id ,'x')"
          />
          <q-btn
            v-else
            text-color="grey"
            icon="mdi-close"
            flat
            fab-mini
            :disable="showWithAnswer"
            @click="changeStatus(source.id ,'x')"
          />
          <q-btn
            v-if="getChoiceBookmark()"
            text-color="blue"
            icon="mdi-bookmark"
            flat
            fab-mini
            :disable="showWithAnswer"
            @click="changeBookmark(source.id)"
          />
          <q-btn
            v-else
            text-color="grey"
            icon="mdi-bookmark-outline"
            flat
            fab-mini
            :disable="showWithAnswer"
            @click="changeBookmark(source.id)"
          />
        </div>
      </div>
      <q-list class="choices-box row">
        <q-item
          v-for="(choice, index) in source.choices.list"
          :key="choice.id"
          class="choices"
          :class="choiceClass"
        >
          <q-item-section
            ref="choices"
            class="choice"
            :class="{active: getAnsweredChoiceId() === choice.id, ltr: isRtl}"
            @click="clickOnAnswer({ questionId: source.id, choiceId: choice.id})"
          >
            <div class="choice-inside">
              <q-icon
                class="check-icon col"
                color="green"
                size="20px"
                name="check"
              />
              <vue-katex
                :input="(choiceNumber[index]) + choice.title"
                :ltr="isLtrQuestion"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn
        flat
        role="presentation"
        class="see-answer-button no-padding"
        :label="descriptiveAnswerExpanded ? '' : ''"
        :icon-right="descriptiveAnswerExpanded ? 'isax:arrow-up-2' : 'isax:arrow-down-1'"
        @click="toggleContent"
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
      <div v-if="source.descriptive_answer"
           class="answer-section">
        <q-expansion-item
          v-model="descriptiveAnswerExpanded"
          header-class="hideExpansionHeader"
        >
          <div class="description-answer-body">
            <div class="description-answer"
            >
              <div
                v-if="source.choices.getSelected()"
                class="question-answer-choice"
              >
                گزینه
                {{ source.choices.getSelected().getNumberTitle() }}
              </div>

              <div
                v-if="source.descriptive_answer"
                class="question-answer-description"
              >
                <vue-katex :input="source.descriptive_answer? source.descriptive_answer :'پاسخ تشریحی ندارد.'" />
              </div>
            </div>

            <div class="description-answer-video"
            >
              <div class="answer-video flex items-center justify-center"
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
      </div>
    </div>
  </div>
</template>

<script>
import VueKatex from 'src/components/VueKatex'
import 'src/assets/scss/markdownKatex.scss'
import { mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins'
import { Content } from 'src/models/Content.js'
import { ContentTimePoint } from 'src/models/ContentTimePoint.js'
import ContentVideoPlayer from 'src/components/ContentVideoPlayer.vue'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'questionField',
  components: {
    VueKatex,
    ContentVideoPlayer
  },
  mixins: [mixinQuiz, mixinUserActionOnQuestion],
  props: {
    index: { // index of current source
      type: Number
    },
    considerActiveCategory: { // index of current source
      type: Boolean,
      default: true
    },
    showWithAnswer: {
      type: Boolean,
      default: false
    },
    // questionsColumn: { // here is: {uid: 'unique_1', text: 'abc'}
    //   default () {
    //     return null
    //   }
    // },
    source: { // here is: {uid: 'unique_1', text: 'abc'}
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isRtl: false,
      descriptiveAnswerExpanded: false,
      observer: null,
      content: new Content(),
      questionTimePoint: new ContentTimePoint(),
      nextTimePoint: new ContentTimePoint(),
      choiceNumber: {
        0: '1) ',
        1: '2) ',
        2: '3) ',
        3: '4) '
      }
    }
  },
  created () {
  },
  computed: {
    isLtrQuestion () {
      const string = this.source.statement
      if (!string) {
        return false
      }
      const persianRegex = /[\u0600-\u06FF]/
      return !string.match(persianRegex)
    },
    isRtlString () {
      const source = this.source
      const string = source.statement
      if (!string) {
        return false
      }
      const persianRegex = /[\u0600-\u06FF]/
      return string.match(persianRegex)
    },
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    },
    choiceClass () {
      const source = this.source
      const largestChoice = this.getLargestChoice(source.choices)
      const largestChoiceWidth = this.windowSize.x / largestChoice
      if (largestChoiceWidth < 24) {
        return 'col-md-12'
      }
      if (largestChoiceWidth < 48) {
        return 'col-md-6'
      }
      if (largestChoiceWidth < 96) {
        return 'col-md-3'
      }
      return 'col-md-3'
    },
    questionIndexString () {
      return (this.source.index + 1) + ') '
    },
    questionParentStatement () {
      return this.questionIndexString + this.source.parent.statement
    },
    questionStatement () {
      if (this.source.parent.id) {
        return this.source.statement
      }
      return this.questionIndexString + this.source.statement
    }
  },
  mounted () {
    this.observer = new IntersectionObserver(this.intersectionObserver, { threshold: [0.7, 0.75, 0.8] })
    this.observer.observe(this.$el)
  },
  unmounted () {
    this.observer.disconnect()
  },
  methods: {
    getChoiceStatus () {
      const userQuestionData = this.getUserQuestionData(this.quiz.user_exam_id, this.source.id)
      if (!userQuestionData) {
        return false
      }
      return userQuestionData.status
    },
    getChoiceBookmark () {
      if (
        !this.userQuizListData ||
        !this.userQuizListData[this.quiz.user_exam_id] ||
        !this.userQuizListData[this.quiz.user_exam_id][this.source.id]
      ) {
        return false
      }

      return this.userQuizListData[this.quiz.user_exam_id][this.source.id].bookmarked
    },
    getAnsweredChoiceId () {
      if (
        !this.userQuizListData ||
        !this.userQuizListData[this.quiz.user_exam_id] ||
        !this.userQuizListData[this.quiz.user_exam_id][this.source.id]
      ) {
        return false
      }

      return this.userQuizListData[this.quiz.user_exam_id][this.source.id].answered_choice_id
    },
    inView (payload) {
      this.$emit('inView', {
        isInView: payload.isIntersecting,
        number: this.getQuestionNumberFromId(this.source.id)
      })
    },
    clickOnAnswer (payload) {
      if (this.showWithAnswer) {
        return
      }
      this.answerClicked(payload)
    },
    intersectionObserver (entries) {
      // eslint-disable-next-line vue/no-mutating-props
      this.source.isInView = entries[0].intersectionRatio >= 0.75
    },
    removeErab (string) {
      if (!string || string.length === 0) {
        return ''
      }

      let temp = string
      temp = temp.split('َ').join('')
      temp = temp.split('ُ').join('')
      temp = temp.split('ِ').join('')
      temp = temp.split('ّ').join('')
      temp = temp.split('ً').join('')
      temp = temp.split('ٌ').join('')
      temp = temp.split('ٍ').join('')
      return temp
    },
    getLargestChoice (choices) {
      let largestChoice = 0
      choices.list.forEach((source) => {
        if (source.title.length > largestChoice) {
          largestChoice = this.removeErab(source.title).length
        }
      })
      return largestChoice
    },
    toggleContent() {
      this.descriptiveAnswerExpanded = !this.descriptiveAnswerExpanded
      if (this.descriptiveAnswerExpanded) {
        this.getQuestionContent()
      }
    },
    getQuestionContent() {
      if (!this.source.content_id) {
        return
      }
      this.contentLoading = true
      this.$axios.get(API_ADDRESS.content.get(this.source.content_id))
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
.question-field{
  width: 100% !important;
  .alert-sheet{
    margin: 10px;
    display: flex;
    height: 200px;
    .alert-sheet-text{
      margin: auto;
    }
    &.red-sheet{
      background-color: #F44336;
    }
    &.orange-sheet{
      background-color: #fb8c00;
    }
  }
  .question-box {
    padding: 10px 10px 10px 30px;
    &.current-question {
      background-color: #fffaee;
    }
    .question-head{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0;
      .question-body {
        margin-bottom: 20px;
        line-height: 40px;
      }
      .question-icons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
    }
    .choices-box{
      .choices {
        display: flex;
        flex-direction: row;
        .choice{
          display: flex;
          flex-direction: row;
          height: auto;
          cursor: pointer;
          transition: all ease-in-out 0.3s;
          padding: 0;
          .choice-inside{
            display: flex;
            flex-direction: row;
            width: 100%;
          }
          &:hover {
            background: #e1e1e1;
          }
          &.active{
            .check-icon{
              display: block;
            }
          }
          .check-icon{
            display: none;
          }
        }
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
          // max-width: 620px;
          width: 100%;
          background: #F6F9FF;
          border-radius: 16px;
          margin-right: 30px;

          @media only screen and (max-width: 1023px) {
            padding: 16px;
            margin-right: 24px;
          }

          @media only screen and (max-width: 599px) {
            max-width: 100%;
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
  }
  .ltr {
    direction: rtl;
    &.question-box{
      padding: 10px 20px;
    }
    &.choice{
      direction: rtl;
      text-align: right;
    }
    &.question-icons{
      float: left;
    }
  }
}
</style>

<style lang="scss">
.question-field{
  .question-box{
    .question-head{
      .question-icons{
        .q-btn--fab-mini {
          padding: 0;
          height: 36px;
          width: 36px;
        }
      }
    }
  }
}
</style>
