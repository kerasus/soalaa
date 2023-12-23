<template>
  <div ref="questionField"
       class="question-field">
    <div class="question-box"
         :class="{ 'current-question': this.currentQuestion.id === question.id, ltr: isLtrQuestion}">
      <div class="question-info">
        <div v-if="question.level && showLevel"
             class="level-content">
          <div v-for="item in 3"
               :key="item"
               class="level-circles"
               :class="item === questionLevelClasses[question.level]?.level ? questionLevelClasses[question.level].class : ''" />
          <div class="level-text">
            {{ questionLevelClasses[question.level]?.title }}
          </div>
        </div>
        <div v-if="question.reference && showReference"
             class="reference-content">
          <div class="reference-text">
            <div v-if="question.reference[0]"
                 class="reference-name">
              {{ question.reference[0].value }}
            </div>
            <div v-if="(showYear && question.years.length > 0) || question.loading"
                 class="question-year ellipsis col-sm-6 col-xs-6 justify-end">
              <q-skeleton v-if="question.loading"
                          class="info-title q-mx-sm"
                          type="text"
                          width="80px" />
              <div v-for="(year, index) in question.years"
                   :key="index"
                   class="question-tag">
                {{year.value}}
              </div>
            </div>
          </div>

          <div v-if="question.reference[0]"
               class="source-avatar">
            <q-avatar v-if="question.reference[0].image"
                      :icon="`img:${question.reference[0].image}`"
                      size="36px" />
            <q-avatar v-else
                      size="36px">
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
      <div v-if="displayStatement"
           class="question-head"
           :style="{marginBottom: questionAndChoices + 'mm'}">
        <p :id="'question' + question.id"
           class="question-body">
          <vue-katex class="vue-katex"
                     :input="'<span class='+'number'+'>' + question.order +') </span>' + question.statement"
                     base64
                     @loaded="onStatementLoaded" />
        </p>
        <div class="PDF-LINE-BREAK" />
      </div>
      <q-list v-if="displayChoices"
              ref="choicesBox"
              class="choices-box">
        <q-item v-for="(choice, index) in questionChoices"
                :ref="'choice-item-id' + choice.id"
                :key="'choice-item-id' + choice.id"
                class="choices"
                :style="{marginBottom: betweenChoices + 'mm'}">
          <q-item-section ref="choices"
                          class="choice"
                          :class="{ltr: isRtl}">
            <div class="choice-inside">
              <q-icon class="check-icon col"
                      color="green"
                      size="20px"
                      name="check" />
              <vue-katex class="vue-katex"
                         :input="'<span class='+'number'+'>'+ (index + 1) +') </span>' + choice.title"
                         :ltr="isLtrQuestion"
                         base64
                         @loaded="onChoiceLoaded(choice)" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-if="displayDescriptiveAnswer"
           class="question-descriptiveAnswer">
        <p :id="'question' + question.id"
           ref="questionBody"
           class="question-body"
           :class="{ ltr: isRtl }">
          <vue-katex class="vue-katex"
                     :input="getQuestionCompleteAnswerInput(question.order, question.descriptive_answer, question.isExternalAnswer)"
                     base64
                     @loaded="onDescriptiveAnswerLoaded" />
        </p>
        <div class="PDF-LINE-BREAK" />
      </div>
      <div class="PDF-LINE-BREAK" />
    </div>
  </div>
</template>

<script>
import 'src/assets/scss/markdownKatex.scss'
import VueKatex from 'src/components/VueKatex.vue'
import { mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins.js'

export default {
  name: 'PdfQuestionField',
  components: { VueKatex },
  mixins: [mixinQuiz, mixinUserActionOnQuestion],
  props: {
    order: {
      type: Number
    },
    considerActiveCategory: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 0
    },
    questionAndChoices: {
      type: Number,
      default: 0
    },
    betweenChoices: {
      type: Number,
      default: 0
    },
    question: { // here is: {uid: 'unique_1', text: 'abc'}
      default () {
        return {}
      }
    },
    displayDescriptiveAnswer: {
      type: Boolean,
      required: true,
      default: false
    },
    displayStatement: {
      type: Boolean,
      required: true,
      default: false
    },
    displayChoices: {
      type: Boolean,
      required: true,
      default: false
    },
    displayTrueChoice: {
      type: Boolean,
      required: false,
      default: false
    },
    showLevel: {
      type: Boolean,
      default: true
    },
    showReference: {
      type: Boolean,
      default: true
    },
    showYear: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:height', 'questionLoaded'],
  data () {
    return {
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
      statementLoaded: false,
      descriptiveAnswerLoaded: false,
      isRtl: false,
      observer: null,
      choiceNumber: {
        0: '1) ',
        1: '2) ',
        2: '3) ',
        3: '4) '
      }
    }
  },
  computed: {
    questionChoices () {
      return this.question.choices.list ? this.question.choices.list : this.question.choices
    },
    getQuestionCompleteAnswerInput () {
      return (order, input, isExternal) => {
        if (isExternal) {
          return input
        }
        return '<span class=' + 'number-descriptive' + '>' + order + ')' + ' (گزینه ' + this.getQuestionAnswerIndex + ')' + ' </span><br>' + input
      }
    },
    getQuestionAnswerIndex () {
      return this.questionChoices.findIndex(choice => choice.answer) + 1
    },
    allChoiceLoaded () {
      const notLoadedChoice = this.questionChoices.find(choice => !choice.loaded)
      return !notLoadedChoice
    },
    questionLoaded () {
      return (this.allChoiceLoaded && this.statementLoaded) || this.descriptiveAnswerLoaded
    },
    isLtrQuestion () {
      const string = this.question.statement
      if (!string) {
        return false
      }
      const persianRegex = /[\u0600-\u06FF]/
      return !string.match(persianRegex)
    },
    isRtlString () {
      const question = this.question
      const string = question.statement
      if (!string) {
        return false
      }
      const persianRegex = /[\u0600-\u06FF]/
      return string.match(persianRegex)
    },
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    }
  },
  watch: {
    questionLoaded () {
      if (this.displayChoices) {
        this.checkChoiceColumns()
      }
      if (this.displayDescriptiveAnswer) {
        this.$refs.questionBody.getElementsByTagName('p').forEach(item => {
          item.dataset.elementHeight = item.clientHeight + 16
        })
      }
      this.$emit('update:height', {
        event1: this.$refs.questionField.clientHeight,
        event2: this.$refs.questionBody
      })
      this.$emit('questionLoaded', this.$refs.questionField.clientHeight)
    }
  },
  methods: {
    checkChoiceColumns () {
      if (!this.$refs.choicesBox) {
        return
      }
      const choicesBoxWidth = this.$refs.choicesBox.$el.clientWidth
      let maxWidth = 0

      this.questionChoices.forEach((item) => {
        // const choiceEl = this.$refs['choice-item-id' + item.id][0].$el
        const choiceEl = this.$refs['choice-item-id' + item.id][0].$el.getElementsByClassName('choice')[0]
        const choiceWidth = choiceEl.clientWidth
        if (maxWidth < (choiceWidth / choicesBoxWidth)) {
          maxWidth = (choiceWidth / choicesBoxWidth)
        }
      })
      const choiceWidth = maxWidth < 0.25 ? '25%' : (maxWidth < 0.5 ? '50%' : '100%')
      this.questionChoices.forEach((item) => {
        this.$refs['choice-item-id' + item.id][0].$el.style.width = choiceWidth
      })
    },
    onStatementLoaded () {
      this.statementLoaded = true
    },
    onDescriptiveAnswerLoaded () {
      this.descriptiveAnswerLoaded = true
    },
    onChoiceLoaded (choice) {
      choice.loaded = true
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
      choices.forEach((question) => {
        if (question.title.length > largestChoice) {
          largestChoice = this.removeErab(question.title).length
        }
      })
      return largestChoice
    },
    getLargestElementLength (element) {
      let largestElement = 0
      element.forEach((item) => {
        if (item.length > largestElement) {
          largestElement = this.removeErab(item).length
        }
      })
      return largestElement
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  z-index: 9999;
  .pdf-skeleton {
    border-radius: 15px;
  }
}
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
    &.current-question {
      background-color: #fffaee;
    }
    .question-info {
      display: flex;
      place-content: flex-end;
      align-items: center;
      .reference-content {
        margin-right: 24px;
      }
      .level-content {
        display: flex;
        margin-right: 109px;
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
    .question-head{
      padding: 0;
      .question-body {
        line-height: 40px;
      }
      .question-icons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
    }
    .question-descriptiveAnswer{
      padding: 0;
      .question-body {
        line-height: 40px;
      }
      .question-icons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
    }
    .choices-box{
      display: flex;
      flex-wrap: wrap;
      .choices {
        display: block;
        padding: 0 16px;
        min-height: 24px;
        width: 100%;

        .choice{
          width: max-content;
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
  :deep(.html-katex){
    //&:deep(.html-katex) {
    //&:first-child {
    //  display: inline-flex;
    //}
    p:nth-child(2) {
      display: initial;
      //display: contents;
    }
    &> p {
      direction: inherit;
    }
    .number {
      padding-right: 10px;
    }
    //}
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
    .question-descriptiveAnswer{
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
