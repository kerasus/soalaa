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
    <q-markup-table
      wrap-cells
      separator="none"
      class="question-table"
      :class="{ 'current-question': this.currentQuestion.id === source.id, ltr: isLtrQuestion}"
    >
      <thead>
      <tr>
        <th class="table-head">
          <p
            v-if="(considerActiveCategory && source.in_active_category) || !considerActiveCategory"
            :id="'question' + source.id"
            class="question-body"
            :class="{ ltr: isRtl }"
          >
            {{source.order + ') ' + source.statement}}
            <!--            <vue-katex-->
            <!--              :input="source.order + ') ' + source.statement"-->
            <!--            />-->
          </p>
          <div
            v-if="(considerActiveCategory && source.in_active_category) || !considerActiveCategory"
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
        </th>
      </tr>
      </thead>
      <tbody class="table-body">
      <tr class="choices q-tr--no-hover">
        <td
          v-for="(choice, index) in source.choices.list"
          :key="choice.id"
          ref="choices"
          class="choice col-md-3"
          :class="{active: getAnsweredChoiceId() === choice.id, ltr: isRtl}"
          @click="clickOnAnswer({ questionId: source.id, choiceId: choice.id})"
        >
          <div
            v-html="choiceNumber[index] + choice.title"
          />
          <!--          <vue-katex-->
          <!--            :input="(choiceNumber[index]) + choice.title"-->
          <!--            :ltr="isLtrQuestion"-->
          <!--          />-->
        </td>
      </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import 'src/assets/scss/markdownKatex.scss'
import { mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins'
// import VueKatex from 'src/components/VueKatex'

export default {
  name: 'questionField',
  components: {
    // VueKatex
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
    questionsColumn: { // here is: {uid: 'unique_1', text: 'abc'}
      default () {
        return null
      }
    },
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
    choiceClass () {
      const source = this.source
      const largestChoice = this.getLargestChoice(source.choices)
      const largestChoiceWidth = this.questionsColumn.clientWidth / largestChoice
      if (largestChoiceWidth < 12) {
        return 12
      }
      if (largestChoiceWidth < 24) {
        return 6
      }
      if (largestChoiceWidth < 48) {
        return 3
      }
      return 3
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
      const userQuestionData = this.getUserQuestionData(this.quiz.id, this.source.id)
      if (!userQuestionData) {
        return false
      }
      return userQuestionData.status
    },
    getChoiceBookmark () {
      if (
        !this.userQuizListData ||
        !this.userQuizListData[this.quiz.id] ||
        !this.userQuizListData[this.quiz.id][this.source.id]
      ) {
        return false
      }

      return this.userQuizListData[this.quiz.id][this.source.id].bookmarked
    },
    getAnsweredChoiceId () {
      if (
        !this.userQuizListData ||
        !this.userQuizListData[this.quiz.id] ||
        !this.userQuizListData[this.quiz.id][this.source.id]
      ) {
        return false
      }

      return this.userQuizListData[this.quiz.id][this.source.id].answered_choice_id
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
  .question-table {
    padding: 10px 10px 10px 30px;
    &.current-question {
      background-color: #fffaee;
    }
    .table-head{
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
    .table-body{
      .choices {
        display: flex;
        flex-direction: column;
        .choice{
         height: auto;
          cursor: pointer;
          transition: all ease-in-out 0.3s;
          padding: 0;
          &:hover {
            background: #e1e1e1;
          }
          &.active{
            &:before {
              content: "\F012C";
              display: inline-block;
              font: normal normal normal 24px/1 "Material Design Icons";
              text-rendering: auto;
              line-height: inherit;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              margin-left: 10px;
              color: #4caf50;
              font-size: 20px;
            }
          }
        }
      }
    }
    &.q-table__card {
      box-shadow: none;
      border-radius: 0;
    }
  }
  .ltr {
    direction: rtl;
    &.question-table{
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
  .question-table{
    .table-head{
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
