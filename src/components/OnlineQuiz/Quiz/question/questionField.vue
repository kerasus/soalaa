<template>
  <div
    v-intersection="inView"
    class="question-field"
  >
    <q-card
      v-if="considerActiveCategory && !source.in_active_category"
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
    <div
      v-if="(considerActiveCategory && source.in_active_category) || !considerActiveCategory"
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
            :input="(source.index + 1) + ') ' + source.statement"
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
            @click="changeStatus(source.id, 'o')"
          />
          <q-btn
            v-else
            icon="mdi-checkbox-blank-circle"
            text-color="yellow"
            flat
            fab-mini
            @click="changeStatus(source.id, 'o')"
          />
          <q-btn
            v-if="getChoiceStatus() === 'x'"
            text-color="red"
            icon="mdi-close"
            flat
            fab-mini
            @click="changeStatus(source.id ,'x')"
          />
          <q-btn
            v-else
            text-color="grey"
            icon="mdi-close"
            flat
            fab-mini
            @click="changeStatus(source.id ,'x')"
          />
          <q-btn
            v-if="getChoiceBookmark()"
            text-color="blue"
            icon="mdi-bookmark"
            flat
            fab-mini
            @click="changeBookmark(source.id)"
          />
          <q-btn
            v-else
            text-color="grey"
            icon="mdi-bookmark-outline"
            flat
            fab-mini
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
    </div>
  </div>
</template>

<script>
import 'src/assets/scss/markdownKatex.scss'
import { mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins'
import VueKatex from 'src/components/VueKatex'

export default {
  name: 'questionField',
  components: {
    VueKatex
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
      observer: null,
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
