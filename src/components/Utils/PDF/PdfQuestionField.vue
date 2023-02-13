<template>
  <div ref="questionField"
       class="question-field"
  >
    <div class="question-box"
         :class="{ 'current-question': this.currentQuestion.id === question.id, ltr: isLtrQuestion}"
    >
      <div v-if="displayStatement"
           class="question-head"
           :style="{marginBottom: questionAndChoices + 'mm'}"
      >
        <p :id="'question' + question.id"
           class="question-body"
        >
          <vue-katex class="vue-katex"
                     :input="'<span class='+'number'+'>'+ order +') </span>' + question.statement"
                     base64
                     @loaded="onStatementLoaded"
          />
        </p>
        <div class="PDF-LINE-BREAK" />
      </div>
      <q-list
        v-if="displayChoices"
        class="choices-box row"
      >
        <q-item v-for="(choice, index) in question.choices"
                :key="choice.id"
                class="choices"
                :class="choiceClass"
                :style="{marginBottom: betweenChoices + 'mm'}"
        >
          <q-item-section ref="choices"
                          class="choice"
                          :class="{ltr: isRtl}"
          >
            <div class="choice-inside">
              <q-icon
                class="check-icon col"
                color="green"
                size="20px"
                name="check"
              />
              <vue-katex class="vue-katex"
                         :input="'<span class='+'number'+'>'+ (index + 1) +') </span>' + choice.title"
                         :ltr="isLtrQuestion"
                         base64
                         @loaded="onChoiceLoaded(choice)"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-if="displayDescriptiveAnswer"
           class="question-descriptiveAnswer"
      >
        <p :id="'question' + question.id"
           class="question-body"
           :class="{ ltr: isRtl }"
        >
          <vue-katex class="vue-katex"
                     :input="getQuestionCompleteAnswerInput(order, question.descriptive_answer)"
                     base64
                     @loaded="onDescriptiveAnswerLoaded"
          />
        </p>
        <div class="PDF-LINE-BREAK" />
      </div>
      <div class="PDF-LINE-BREAK" />
    </div>
  </div>
</template>

<script>
import VueKatex from 'src/components/VueKatex'
import 'src/assets/scss/markdownKatex.scss'
import { mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins'

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
    getQuestionCompleteAnswerInput () {
      return (order, input) => {
        return '<span class=' + 'number-descriptive' + '>' + order + ')' + ' (گزینه ' + this.getQuestionAnswerIndex + ')' + ' </span><br>' + input
      }
    },
    getQuestionAnswer () {
      return this.question.choices.filter(choice => choice.answer)
    },
    getQuestionAnswerIndex () {
      return this.question.choices.findIndex(choice => choice.answer) + 1
    },
    allChoiceLoaded () {
      const notLoadedChoice = this.question.choices.find(choice => !choice.loaded)
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
    },
    choiceClass () {
      const question = this.question
      const largestChoice = this.getLargestChoice(question.choices)
      const largestChoiceWidth = this.windowSize.x / largestChoice
      if (largestChoiceWidth < 24) {
        return 'col-md-12'
      }
      if (largestChoiceWidth < 70) {
        return 'col-md-6'
      }
      if (largestChoiceWidth < 96) {
        return 'col-md-3'
      }
      return 'col-md-3'
    }
  },
  watch: {
    questionLoaded () {
      this.$emit('questionLoaded')
      this.$emit('update:height', this.$refs.questionField.clientHeight)
    }
  },
  methods: {
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
      .choices {
        display: flex;
        flex-direction: row;
        padding: 0 16px;
        min-height: 24px;

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
