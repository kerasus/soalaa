<template>
  <div
    ref="bubbleSheet"
    class="bubbleSheet-body"
    :class="{
      'bubble-sheet': true,
      'questions-list': true,
      'pasokh-nameh': info.type === 'pasokh-nameh',
      'pasokh-barg': info.type === 'pasokh-barg',
    }"
  >
    <div
      v-for="(group, index) in questionsInGroups"
      :key="index"
      class="col question-group"
    >
      <div
        v-for="question in group"
        :key="question.id"
        class="question-in-list"
      >
        <div
          :class="{
            'question-number-in-list': true,
            circle: getUserQuestionData(question.id) && getUserQuestionData(question.id).status === 'o',
            cross: getUserQuestionData(question.id) && getUserQuestionData(question.id).status === 'x',
            bookmark: getUserQuestionData(question.id) && getUserQuestionData(question.id).bookmarked
          }"
          :style="{ width: '24%', cursor: 'pointer' }"
          @click="ClickQuestionNumber(question.id)"
        >
          <span v-if="getUserQuestionData(question.id)">
            {{ getQuestionNumberFromId(question.id) }}
            <q-tooltip
              v-if="getUserQuestionData(question.id)"
              anchor="bottom middle"
            >
              <span>
              <q-icon
                v-if="showDateOfAnsweredAt"
                icon="mdi-calendar-check-outline"
              />
              <q-icon
                v-else
                icon="mdi-clock-check-outline"
              />
              {{ showAnsweredAt(getUserQuestionData(question.id).answered_at) }}
            </span>
            </q-tooltip>
          </span>
          <span v-else>
            {{ getQuestionNumberFromId(question.id) }}
          </span>
        </div>
        <div
          v-for="choice in question.choices.list"
          :key="choice.id"
          :class="{
            'choice-in-list': true,
            active: getUserQuestionData(question.id) && choice.id === getUserQuestionData(question.id).answered_choice_id,
            answer: choice.answer
          }"
          @click="AnswerClicked({ questionId: question.id, choiceId: choice.id})"
        >
          <q-icon
            size="12"
            icon="mdi-check"
            :color="getUserQuestionData(question.id) && choice.id === getUserQuestionData(question.id).answered_choice_id ? '#fff' : '#00c753'"
          />
          <q-icon
            size="12"
            icon="mdi-close"
            color="#fff"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import { mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins'

export default {
  name: 'BubbleSheet',
  mixins: [
    mixinQuiz,
    mixinUserActionOnQuestion
  ],
  props: {
    questions: {
      default: null
    },
    info: {
      default: null
    },
    delayTime: {
      default: 2000
    }
  },
  data: () => ({
    showDateOfAnsweredAt: false,
    overlay: false,
    boxSize: 600
  }),
  computed: {
    bubbleSize () {
      return this.$store.getters['AppLayout/bubbleSize']
    },
    questionsInGroups () {
      const groups = []
      const chunk = 10
      let array
      if (!this.questions) {
        array = this.getCurrentExamQuestionsInArray()
        for (let i = 0, j = array.length; i < j; i += chunk) {
          groups.push(array.slice(i, i + chunk))
        }
      } else {
        array = this.questions
        for (let i = 0, j = 200; i < j; i += chunk) {
          groups.push(array.slice(i, i + chunk))
        }
      }
      return groups
    }
  },
  created () {
    if (this.delayTime === 0) {
      this.overlay = true
    }
  },
  mounted () {
    const that = this
    setTimeout(() => {
      if (that.$refs.bubbleSheet) {
        that.$refs.bubbleSheet.style.height = that.questionListHeight() - 24 + 'px'
      }
      that.overlay = false
    }, this.delayTime)
    this.checkForShowDateOfAnsweredAt()
  },
  watch: {
    overlay () {
      if (this.overlay) {
        this.$store.dispatch('loading/overlayLoading', true)
      } else {
        this.$store.dispatch('loading/overlayLoading', false)
      }
    }
  },
  methods: {
    showAnsweredAt (answeredAt) {
      let formatString = 'HH:mm:ss'
      if (this.showDateOfAnsweredAt) {
        formatString = 'HH:mm:ss jYYYY/jMM/jDD'
      }
      return moment(new Date(answeredAt)).format(formatString)
    },
    checkForShowDateOfAnsweredAt () {
      let dateTime = ''
      const that = this
      this.questionsInGroups.forEach(groupItem => {
        groupItem.forEach(questionItem => {
          const userQuestionData = that.getUserQuestionData(questionItem.id)
          if (userQuestionData && userQuestionData.answered_at) {
            if (dateTime === '') {
              dateTime = moment(new Date(userQuestionData.answered_at))
            } else {
              const dayDiff = dateTime.diff(moment(new Date(userQuestionData.answered_at)), 'days')
              if (dayDiff !== 0) {
                that.showDateOfAnsweredAt = true
              }
            }
          }
        })
      })
    },
    getUserQuestionData (questionId) {
      if (typeof questionId === 'undefined') {
        questionId = this.currentQuestion.id
      }
      if (!this.quiz.id || !questionId || !this.userQuizListData[this.quiz.id]) {
        return false
      }
      return this.userQuizListData[this.quiz.id][questionId]
    },
    AnswerClicked (payload) {
      if (this.info.type !== 'pasokh-nameh') {
        this.answerClicked(payload)
        this.clickChoice(payload.questionId)
      }
    },
    ClickQuestionNumber (questionId) {
      if (this.info.type !== 'pasokh-nameh') {
        this.clickQuestionNumber(questionId)
      }
    },
    clickChoice (questionId) {
      this.$emit('clickChoice', questionId)
    },
    clickQuestionNumber (questionId) {
      this.$emit('scrollTo', questionId)
    },
    questionListHeight () {
      // box is a col-7 with 12px padding
      this.boxSize = this.$refs.bubbleSheet.clientWidth - 24
      const horizontalGroupAmounts = Math.floor(this.boxSize / 140)
      const verticalGroupAmount = Math.ceil(this.questionsInGroups.length / horizontalGroupAmounts)
      return verticalGroupAmount * 185 + 24
    }
  }
}
</script>

<style lang="scss" scoped>
.bubbleSheet-body {
  &.pasokh-nameh {
    .choice-in-list {
      position: relative;
      cursor: auto;

      &.answer {
        border: solid 1px #00c753;
        background-color: #00c753;
      }

      &.active {
        border: solid 1px #ff4243;
        background-color: #ff4243;
      }
    }
  }

  &.questions-list {
    direction: rtl;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 80px;
  }

  .question-group {
    background: #fff;
    border-radius: 10px;
    margin: 5px;
    padding: 5px 10px;
    width: 130px;
    font-size: 11px;
    max-height: 175px;

    .question-in-list {
      margin: 2px 0;
      display: flex;
      flex-direction: row;
      height: 14px;

      .choice-in-list {
        width: 19%;
        margin: 2px;
        border-radius: 6px;
        border: 1px solid #ffda6a;
        cursor: pointer;

        &.active {
          background: #888;
        }
      }

      .question-number-in-list {
        position: relative;

        &.circle {
          &:after {
            content: "\F0130";
            position: absolute;
            font: normal normal normal 24px/1 "Material Design Icons";
            text-rendering: auto;
            line-height: inherit;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: #ffda6a;
            left: -13px;
            font-size: 14px;
            top: -5px;
          }
        }

        &.cross {
          &:after {
            content: "\F0156";
            position: absolute;
            font: normal normal normal 24px/1 "Material Design Icons";
            text-rendering: auto;
            line-height: inherit;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: red;
            left: -13px;
            font-size: 14px;
            top: -5px;
          }
        }

        &.bookmark {
          &:after {
            content: "\F00C3";
            position: absolute;
            font: normal normal normal 24px/1 "Material Design Icons";
            text-rendering: auto;
            line-height: inherit;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: #2196F3;
            left: -13px;
            font-size: 14px;
            top: -5px;
          }
        }
      }
    }
  }
}

</style>
