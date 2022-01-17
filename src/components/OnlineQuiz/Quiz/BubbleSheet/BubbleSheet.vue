<template>
  <div
    ref="bubbleSheet"
    :class="{
      'bubble-sheet': true,
      'questions-list': true,
      'pasokh-nameh': info.type === 'pasokh-nameh',
      'pasokh-barg': info.type === 'pasokh-barg',

    }"
  >
    <!--              v-if="quiz.id !== null"-->

    <v-overlay
      :absolute="true"
      :opacity="0.9"
      :value="overlay"
    >
      در حال ساخت پاسخبرگ
    </v-overlay>

    <v-col
      v-for="(group, index) in questionsInGroups"
      :key="index"
      class="question-group"
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
          <v-tooltip
            v-if="getUserQuestionData(question.id)"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                {{ getQuestionNumberFromId(question.id) }}
              </span>
            </template>
            <span>
              <v-icon
                v-if="showDateOfAnsweredAt"
                dark
              >
                mdi-calendar-check-outline
              </v-icon>
              <v-icon
                v-else
                dark
              >
                mdi-clock-check-outline
              </v-icon>
              {{ showAnsweredAt(getUserQuestionData(question.id).answered_at) }}
            </span>
          </v-tooltip>
          <span v-else-if="info.type === 'scanned-pasokh-barg'">
            {{ question.id }}
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
          <v-icon
            v-if="info.type === 'pasokh-nameh' && choice.answer"
            size="12"
            :color="getUserQuestionData(question.id) && choice.id === getUserQuestionData(question.id).answered_choice_id ? '#fff' : '#00c753'"
          >
            mdi-check
          </v-icon>
          <v-icon
            v-if="info.type === 'pasokh-nameh' && getUserQuestionData(question.id) && choice.id === getUserQuestionData(question.id).answered_choice_id && !choice.answer"
            size="12"
            color="#fff"
          >
            mdi-close
          </v-icon>
        </div>
      </div>
    </v-col>
  </div>
</template>

<script>
    import moment from 'moment-jalaali'
  import {mixinQuiz, mixinUserActionOnQuestion} from "@/mixin/Mixins";

  export default {
    name: 'BubbleSheet',
    mixins: [
      mixinQuiz,
      mixinUserActionOnQuestion
    ],
    props: {
      submitAnswers: {
        default: true
      },
      bubbleSheetWidth: {
        default: null
      },
      questions: {
        default: null
      },
      info: {
        default: null
      },
      exam: {
        default: null
      },
      delayTime: {
        default: 2000
      },
    },
    data: () => ({
      showDateOfAnsweredAt: false,
      overlay: false,
      boxSize: 600
    }),
    computed: {
      bubbleSize() {
        return this.$store.getters['AppLayout/bubbleSize']
      },
      boxHeight() {
        const boxSize = this.bubbleSheetWidth - 24
        // each group width is 140px
        const horizontalGroupAmounts = Math.floor(boxSize / 140)
        const verticalGroupAmount = Math.ceil(this.questionsInGroups.length / horizontalGroupAmounts)
        return verticalGroupAmount * 182 + 20
      },
      questionsInGroups() {
        let groups = [],
            chunk  = 10
        let array
        if (this.questions === null) {
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
    created() {
      if (this.delayTime === 0) {
        this.overlay = true
      }
      // console.Log(this.questions)
      // console.Log(this.getCurrentExamQuestionsInArray())
    },
    mounted() {
      this.setBubbleSheetHeight()
      this.checkForShowDateOfAnsweredAt()
    },
    methods: {
      setBubbleSheetHeight () {
        let that = this
        setTimeout(() => {
          if (that.$refs.bubbleSheet) {
            that.$refs.bubbleSheet.style.height = that.questionListHeight() - 24 + 'px'
          }
          that.overlay = false
        }, this.delayTime)
      },
      showAnsweredAt (answeredAt) {
        let formatString = 'HH:mm:ss'
        if (this.showDateOfAnsweredAt) {
          formatString = 'HH:mm:ss jYYYY/jMM/jDD'
        }

        return moment(new Date(answeredAt)).format(formatString)
      },
      checkForShowDateOfAnsweredAt () {
        let dateTime = ''
        let that = this
        this.questionsInGroups.forEach( groupItem => {
          groupItem.forEach( questionItem => {
            const userQuestionData = that.getUserQuestionData(questionItem.id)
            if (userQuestionData && userQuestionData.answered_at) {
              if (dateTime === '') {
                dateTime = moment(new Date(userQuestionData.answered_at))
              } else {
                let dayDiff = dateTime.diff(moment(new Date(userQuestionData.answered_at)), 'days')
                if (dayDiff !== 0) {
                  that.showDateOfAnsweredAt = true
                }
              }
            }
          })
        })
      },
      getUserQuestionData(question_id) {
        if (typeof question_id === 'undefined') {
          question_id = this.currentQuestion.id
        }
        if (!this.quiz.id || !question_id || !this.userQuizListData[this.quiz.id]) {
          return false
        }
        return this.userQuizListData[this.quiz.id][question_id]
      },
      changeWidth() {
        // console.Log('test')
        this.$refs.bubbleSheet.style.height = this.questionListHeight() - 24 + 'px'
      },
      AnswerClicked(payload) {
        if (this.info.type !== 'pasokh-nameh')
        {
          this.answerClicked(payload, false)
          this.clickChoice(payload.questionId)
        }
      },
      ClickQuestionNumber(questionId) {
        if (this.info.type !== 'pasokh-nameh')
        {
          this.clickQuestionNumber(questionId)
        }
      },
      clickChoice(questionId) {
        if (this.submitAnswers) {
          this.$emit('clickChoice', questionId)
        }
      },
      clickQuestionNumber(questionId) {
        this.$emit('scrollTo', questionId)
      },
      questionListHeight() {
        // box is a col-7 with 12px padding
        this.boxSize = this.$refs.bubbleSheet.clientWidth - 24
        // console.log('box', this.boxSize)
        // each group width is 140px
        const horizontalGroupAmounts = Math.floor(this.boxSize / 140)
        const verticalGroupAmount = Math.ceil(this.questionsInGroups.length / horizontalGroupAmounts)
        return verticalGroupAmount * 185 + 24
      },
      questionListPadding() {
        const boxSize = this.$refs.bubbleSheet.clientWidth - 24
        const horizontalGroupAmounts = (this.$refs.bubbleSheet.clientHeight - 8) / 182
        const verticalGroupAmounts = Math.ceil(this.questionsInGroups.length / horizontalGroupAmounts)
        return (boxSize - (verticalGroupAmounts * 140)) / 2 + 5
      },
      test() {
        this.$refs.bubbleSheet.style.height = this.questionListHeight() - 24 + 'px'
      }
    },
    'windowSize.x': function () {
      // this.$refs.bubbleSheet.offsetHeight()
      this.$refs.bubbleSheet.style.height = this.questionListHeight() - 24 + 'px'
      // $('.questions-list').height(this.questionListHeight())
    }
  }
</script>

<style scoped>
    .v-overlay {
        align-items: flex-start;
        padding-top: 100px;
    }

    .pasokh-nameh .choice-in-list {
        position: relative;
        cursor: auto;
    }

    .pasokh-nameh .choice-in-list.answer {
        border: solid 1px #00c753;
    }

    .pasokh-nameh .choice-in-list.active {
        border: solid 1px #ff4243;
        background-color: #ff4243;
    }

    .pasokh-nameh .choice-in-list.active.answer {
        border: solid 1px #00c753;
        background-color: #00c753;
    }

    .question-group {
        background: #fff;
        border-radius: 10px;
        margin: 5px;
        padding: 5px 10px;
        width: 130px;
        font-size: 11px;
        max-height: 175px;

    }

    .question-in-list {
        margin: 2px 0;
        display: flex;
        flex-direction: row;
        height: 14px;
    }

    .choice-in-list {
        width: 19%;
        margin: 2px;
        border-radius: 6px;
        border: 1px solid #ffda6a;
        cursor: pointer;
    }

    .choice-in-list.active {
        background: #888;
    }

    .question-number-in-list {
        position: relative;
    }

    .question-number-in-list.circle::after {
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

    .question-number-in-list.cross::after {
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

    .pasokh-nameh .question-number-in-list.bookmark::after {
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

    .questions-list {
        direction: ltr;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 80px;
    }


</style>

<style>
    .pasokh-nameh .v-icon.mdi-check,
    .pasokh-nameh .v-icon.mdi-close {
        top: -2px;
        left: 2px;
    }
</style>
