<template>
  <div ref="questionField"
       class="question-field">
    <div class="question-box"
         :class="{ 'current-question': this.currentQuestion.id === question.id, ltr: isLtrQuestion}">
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
                :class="choiceClass"
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
    }
  },
  emits: ['update:height', 'questionLoaded'],
  data () {
    return {
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
