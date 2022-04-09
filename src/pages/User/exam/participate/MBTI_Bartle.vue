<template>
  <div class="participate-mbti-bartle">
      <div  class="row q-pt-lg q-mb-md">
        <div class="col-5 q-mx-xl">
          <a href="https://alaatv.com">
            <q-img
              src="https://nodes.alaatv.com/upload/mbti-bartle-alaa-logo.png"
              width="27px"
              height="40ox"
            />
          </a>
        </div>
        <div class="col-6">
          <a href="https://alaatv.com">
            <q-img
              src="https://nodes.alaatv.com/upload/mbti-bartle-alaa-text.png"
              width="134px"
              height="40px"
            />
          </a>
        </div>
      </div>
      <div class="row justify-between">
        <div
          class="q-mx-xl text-subtitle1 text-grey-10"
          v-if="quiz"
          v-text="quiz.title"
        />
        <div
          class="q-mx-xl text-h6 text-grey-10"
          v-text="counter.string"
        />
      </div>
    <q-linear-progress
       size="15px"
      :value="((counter.value)+1)/100"
       color="warning"
       track-color="grey-3"
      reverse
      class="q-mt-sm"
    />
    <div
      class="question-box-parent"
    >
      <div class="row justify-center">
        <div class="question-box">
          <div class="arrow-box prev">
            <q-btn
              text-color="white"
              class="answer-btn"
              :style=" ($route.params.questNumber.toString() === '1') ?'background: #eaeaea' : 'background: #ffe082'"
              unelevated
              :disabled="$route.params.questNumber.toString() === '1'"
              @click="goToPrevQuestion('onlineQuiz.mbtiBartle')"
            >
              <i class="fi-rr-angle-right" />
            </q-btn>
          </div>
          <div class="question">
            <p class="question-number">
              سوال
              {{ $route.params.questNumber }}
            </p>
            <p
              v-if="currentQuestion"
              class="statement"
              v-html="currentQuestion.statement"
            />
            <div
              v-if="currentQuestion"
              class="choices"
              :class="{
                  agree: stringMeanThumbUpOrDown(currentQuestion.choices.list[0].title) === 'ThumbUp',
                  disagree: stringMeanThumbUpOrDown(currentQuestion.choices.list[0].title) === 'ThumbDown'
                }"
            >
              <div
                v-for="(choice, index) in currentQuestion.choices.list"
                :key="index+choiceKey"
                class="choice"
                :class="{
                    agree: stringMeanThumbUpOrDown(choice.title) === 'ThumbUp',
                    disagree: stringMeanThumbUpOrDown(choice.title) === 'ThumbDown',
                    active: choice.active
                  }"
              >
                <div
                  v-if="stringMeanThumbUpOrDown(choice.title) === 'ThumbUp' || stringMeanThumbUpOrDown(choice.title) === 'ThumbDown'"
                  class="choice-circle"
                  @click="choiceClick(choice.id)"
                >
                  <div class="row items-center choice-inner-circle">
                    <i
                      v-if="stringMeanThumbUpOrDown(choice.title) === 'ThumbUp'"
                      class="fi-rr-thumbs-up"
                    />
                    <i
                      v-else
                      class="fi-rr-thumbs-down"
                    />
                    <i class="fi fi-rr-Angle-left"></i>
                  </div>
                </div>
                <p
                  v-if="stringMeanThumbUpOrDown(choice.title) === 'ThumbUp' || stringMeanThumbUpOrDown(choice.title) === 'ThumbDown'"
                  v-html="choice.title"
                />
                <div
                  v-else
                  class="choice-rect"
                  @click="choiceClick(choice.id)"
                >
                  <div
                    class="choice-inner-rect"
                    v-html="choice.title"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="next arrow-box">
            <q-btn
              text-color="white"
              class="answer-btn"
              :style=" (!isCurrentQuestionAnswered || getQuestionNumberFromId(currentQuestion.id) === getCurrentExamQuestionsInArray().length) ?'background: #eaeaea' : 'background: #ffe082'"
              unelevated
              :disabled="!isCurrentQuestionAnswered || getQuestionNumberFromId(currentQuestion.id) === getCurrentExamQuestionsInArray().length"
              @click="goToNextQuestion('onlineQuiz.mbtiBartle')"
            >
              <i class="fi-rr-angle-left" />
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <q-dialog>

    </q-dialog>
  </div>
</template>

<script>
import { mixinDrawer, mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins'
import mbtiData from 'src/assets/js/MBTI_Bartle_Data'
//  import Assistant from '/plugins/assistant'
export default {
  name: 'MBTIBartle',
  mixins: [mixinDrawer, mixinQuiz, mixinUserActionOnQuestion],
  data () {
    return {
      choiceKey: Date.now(),
      tryAgainDialog: false,
      finished: false
    }
  },
  computed: {
    counter () {
      return {
        string: this.$route.params.questNumber + '/' + 90,
        value: (this.$route.params.questNumber - 1) / 90 * 100
      }
    },
    isCurrentQuestionAnswered () {
      let isAnswered = false
      if (this.currentQuestion && this.currentQuestion.choices) {
        this.currentQuestion.choices.list.forEach(choice => {
          if (choice.active) {
            isAnswered = true
          }
        })
      }
      return isAnswered
    }
  },
  created () {
    this.drawer = false
    this.appBar = false
    this.$store.dispatch('AppLayout/updateAppBarAndDrawer', false)
  },
  updated () {
    this.$store.dispatch('loading/overlayLoading', false)
  },
  mounted () {
    const that = this
    this.startExam(that.$route.params.quizId, 'onlineQuiz.mbtiBartle')
      .then((res) => {
        that.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
        const unansweredQuestion = that.getUnansweredQuestionBehind()
        if (unansweredQuestion) {
          that.changeQuestion(unansweredQuestion.id, 'onlineQuiz.mbtiBartle')
        } else {
          const isFinished = that.isFinished()
          if (isFinished) {
            that.sendAnswersAndFinishExam()
          }
        }
      })
      .catch((error) => {
        // Assistant.reportErrors(error)
        that.$q.notify({
          message: 'مشکلی در دریافت اطلاعات آژمون رخ داده است. لطفا دوباره امتحان کنید.',
          color: 'negative'
        })
        that.$router.push({ name: 'user.exam.list' })
        console.log('error', error)
      })
  },
  methods: {
    stringMeanThumbUpOrDown (string) {
      if (string === null || (this.currentQuestion.sub_category && this.currentQuestion.sub_category.title !== 'MBTI')) {
        return false
      }

      if (string.includes('موافقم')) {
        return 'ThumbUp'
      } else if (string.includes('مخالفم')) {
        return 'ThumbDown'
      }
    },
    isFinished () {
      // console.log('isFinished')
      const that = this
      const countOfQuestions = Object.keys(this.currentExamQuestions).length
      if (
        this.userQuizListData &&
          this.userQuizListData[this.quiz.user_exam_id]
      ) {
        let answeredQuestionsCount = 0
        const tstArr = []
        const checkedQuestionIds = Object.keys(this.userQuizListData[this.quiz.user_exam_id])
        checkedQuestionIds.forEach(item => {
          if (
            that.userQuizListData &&
              that.userQuizListData[that.quiz.user_exam_id] &&
              that.userQuizListData[that.quiz.user_exam_id][item] &&
              that.userQuizListData[that.quiz.user_exam_id][item].answered_choice_id &&
              that.userQuizListData[that.quiz.user_exam_id][item].answered_choice_id.toString()
          ) {
            answeredQuestionsCount++
          } else {
            tstArr.push(that.userQuizListData[that.quiz.user_exam_id][item])
          }
        })

        return (answeredQuestionsCount === countOfQuestions)
      } else {
        return false
      }
    },
    isLastQuestion () {
      const countOfQuestions = Object.keys(this.currentExamQuestions).length
      return countOfQuestions.toString() === this.$route.params.questNumber.toString()
    },
    getUnansweredQuestionBehind () {
      // console.log('getUnansweredQuestionBehind ')
      if (
        this.userQuizListData &&
          this.userQuizListData[this.quiz.user_exam_id]
      ) {
        const that = this
        const currentExamQuestionIndexes = this.getCurrentExamQuestionIndexes()
        const currentExamQuestions = this.currentExamQuestions
        const currentQuestionNumber = this.$route.params.questNumber
        let unansweredQuestion = null
        const tstArr = []
        Object.keys(currentExamQuestionIndexes).forEach(questIndex => {
          const questNumber = parseInt(questIndex) + 1
          if (parseInt(currentQuestionNumber) >= parseInt(questNumber)) {
            const questionId = currentExamQuestionIndexes[questIndex]
            if (
              !that.userQuizListData ||
                !that.userQuizListData[that.quiz.user_exam_id] ||
                !that.userQuizListData[that.quiz.user_exam_id][questionId] ||
                !that.userQuizListData[that.quiz.user_exam_id][questionId].answered_choice_id ||
                !that.userQuizListData[that.quiz.user_exam_id][questionId].answered_choice_id.toString() ||
                typeof that.userQuizListData[that.quiz.user_exam_id][questionId].answered_choice_id === 'undefined' ||
                that.userQuizListData[that.quiz.user_exam_id][questionId].answered_choice_id === null
            ) {
              unansweredQuestion = currentExamQuestions[questionId]
            } else {
              tstArr.push(that.userQuizListData[that.quiz.user_exam_id][questionId])
            }
          }
        })

        return unansweredQuestion
      } else {
        return null
      }
    },
    // eslint-disable-next-line camelcase
    setCurrentQuestionChoice (choice_id, active) {
      const that = this
      if (typeof active === 'undefined') {
        active = true
      }
      this.currentQuestion.choices.list.forEach((item, index) => {
        // eslint-disable-next-line camelcase
        if (choice_id !== null && choice_id.toString() === that.currentQuestion.choices.list[index].id.toString()) {
          // Vue.set(that.currentQuestion.choices.list[index], 'active', active)
          that.choiceKey = Date.now()
        } else {
          // Vue.set(that.currentQuestion.choices.list[index], 'active', false)
          that.choiceKey = Date.now()
        }
      })
    },
    choiceClick (id) {
      this.$store.dispatch('loading/overlayLoading', true)
      const that = this
      const isLastQuestion = this.isLastQuestion()
      const answerClickedPromise = this.answerClicked({ choiceId: id, questionId: this.currentQuestion.id }, true)
      answerClickedPromise.then((response) => {
        const targetQuestion = response.data.data.find(item => (
          this.currentQuestion.id !== null &&
                item.question_id !== null &&
                item.question_id.toString() === this.currentQuestion.id.toString())
        )
        if (
          targetQuestion &&
                targetQuestion.choice_id &&
                targetQuestion.choice_id.toString()
        ) {
          if (!isLastQuestion) {
            that.setCurrentQuestionChoice(targetQuestion.choice_id, true)
            setTimeout(() => {
              that.goToNextQuestion('onlineQuiz.mbtiBartle')
            }, 500)
          } else {
            that.setCurrentQuestionChoice(targetQuestion.choice_id, true)
            setTimeout(() => {
              that.startExam(that.$route.params.quizId, 'onlineQuiz.mbtiBartle')
                .then(() => {
                  that.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
                  const unansweredQuestion = that.getUnansweredQuestionBehind()
                  if (unansweredQuestion) {
                    that.changeQuestion(unansweredQuestion.id, 'onlineQuiz.mbtiBartle')
                  } else {
                    const isFinished = that.isFinished()
                    if (isFinished) {
                      that.sendAnswersAndFinishExam()
                    }
                  }
                })
            }, 500)
          }
        } else {
          that.setCurrentQuestionChoice(null, false)
          this.$store.dispatch('loading/overlayLoading', false)
        }
      })
        .catch((e) => {
          console.log(e)
          this.$store.dispatch('loading/overlayLoading', false)
        })
    },
    sendAnswersAndFinishExam () {
      const that = this
      this.sendUserQuestionsDataToServerAndFinishExam(this.quiz.user_exam_id)
        .then(() => {
          // that.$notify({
          //   group: 'notifs',
          //   text: 'اطلاعات آزمون شما ثبت شد.',
          //   type: 'success'
          // })
          that.$store.commit('Exam/clearExamData', that.quiz.user_exam_id)
          that.tryAgainDialog = false
          that.$router.push({ name: 'mbtiBartle.result', params: { exam_id: this.quiz.id.toString(), user_exam_id: this.quiz.user_exam_id.toString() } })
        })
        .catch(() => {
          that.$notify({
            group: 'notifs',
            title: 'توجه!',
            text: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است.',
            type: 'error',
            duration: 6000
          })
          that.tryAgainDialog = true
        })
    },
    getMbtiBg (type) {
      return mbtiData.mbtiType[type].backgroundColor
    },
    getMbtiDetailsFromAnswers (answer) {
      const details = []
      for (let i = 0; i < 4; i++) {
        const title = mbtiData.mbtiGroups[i].title
        const text = mbtiData.mbtiGroups[i].text
        const values = []
        values.push({
          title: answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[0]].label,
          percent: answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[0]].ratio,
          label: mbtiData.mbtiKeys[2 * i].value
        })
        values.push({
          title: answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[1]].label,
          percent: answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[1]].ratio,
          label: mbtiData.mbtiKeys[2 * i + 1].value
        })
        details.push({
          title,
          text,
          values
        })
      }
      return details
    },
    getMbtiTypeFromAnswers (answer) {
      let type = ''
      if (answer[Object.keys(answer)[0]][mbtiData.mbtiKeys[0].text.ratio] > 50) {
        type += mbtiData.mbtiKeys[0].value
      } else {
        type += mbtiData.mbtiKeys[1].value
      }

      if (answer[Object.keys(answer)[0]][mbtiData.mbtiKeys[2].text.ratio] > 50) {
        type += mbtiData.mbtiKeys[2].value
      } else {
        type += mbtiData.mbtiKeys[3].value
      }

      if (answer[Object.keys(answer)[0]][mbtiData.mbtiKeys[4].text.ratio] > 50) {
        type += mbtiData.mbtiKeys[4].value
      } else {
        type += mbtiData.mbtiKeys[5].value
      }

      if (answer[Object.keys(answer)[0]][mbtiData.mbtiKeys[6].text.ratio] > 50) {
        type += mbtiData.mbtiKeys[6].value
      } else {
        type += mbtiData.mbtiKeys[7].value
      }

      return type
    },
    calculateExam () {
      const questions = [{}]
      const answer = {}
      questions.forEach(question => { // set the sub categories in the answer obj
        if (!answer[question.sub_category.id]) {
          answer[question.sub_category.id] = {}
        }

        question.choices.list.forEach(choice => { // set the values in the answer obj
          if (!answer[question.sub_category.id][choice.answer]) {
            answer[question.sub_category.id][choice.answer] = {
              repeat: 0,
              possible: 0,
              ratio: 0
            }
          }
        })
      })

      questions.forEach(question => {
        question.choices.list.forEach(choice => {
          answer[question.sub_category.id][choice.answer].possible++
          if (choice.active) {
            answer[question.sub_category.id][choice.answer].repeat++
          }
        })
      })

      Object.keys(answer).forEach((subCategory) => {
        Object.keys(answer[subCategory]).forEach((value) => {
          answer[subCategory][value].ratio = Math.round(answer[subCategory][value].repeat / answer[subCategory][value].possible * 100)
        })
      })

      return answer
    }
  }
}
</script>

<style scoped lang="scss">
.participate-mbti-bartle {
  background: #fff;
  height: 100vh;
  .header-container {
    padding: 0 calc(((100vw - 1264px) / 6) + 30px);
    font-size: 18px;
    font-weight: 500;
    @media only screen and (max-width: 1264px) {
      padding: 0 40px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 16px;
      padding: 0 30px;
    }
    @media only screen and (max-width: 575px) {
      padding: 0 20px;
    }
  }
  .question-box-parent {
    background: #ffe082;
    height: calc(100% - 140px);
    .question-box {
      margin-top: 54px;
      width: 1000px;
      height: 500px;
      background: #fff;
      border-radius: 50px;
      padding: 20px;
      box-shadow: 0 5px 10px 0 rgba(255, 193, 7, 0.2);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @media only screen and (max-width: 1800px) {
        height: 440px;
      }
      @media only screen and (max-width: 1336px) {
        height: 420px;
      }
      @media only screen and (max-width: 1200px) {
        height: 360px;
        width: 860px;
      }
      @media only screen and (max-width: 989px) {
        width: 500px;
        height: 640px;
      }
      @media only screen and (max-width: 767px) {
        width: 400px;
        height: 640px;
        border-radius: 30px;
      }
      @media only screen and (max-width: 575px) {
        width: calc(100% - 50px);
        height: 400px;
        padding: 8px;
        margin-top: 26px;
      }
      .arrow-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .answer-btn {
          width: 50px;
          height: 100px;
          border-radius: 10px;
          @media only screen and (max-width: 989px) {
            position: absolute;
            background-color: #fff !important;
            opacity: 1;
            width: 60px !important;
          }
          @media only screen and (max-width: 767px) {
            width: 40px !important;
          }
          @media only screen and (max-width: 575px) {
            width: 25px !important;
            height: 80px !important;
          }
          .q-btn__content{
            i {
              font-size: 24px;
              font-weight: bolder;
              @media only screen and (max-width: 989px) {
                color: #ffc107 !important;
              }
          }
        }

        }
        &.prev {
          button {
            @media only screen and (max-width: 989px) {
              right: 0;
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }
          }
          i {
            margin-left: 6px;
          }
        }
        &.next {
          button {
            @media only screen and (max-width: 989px) {
              left: 0;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            }
          }
        }
      }
      .question {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .question-number {
          font-size: 20px;
          font-weight: bold;
          @media only screen and (max-width: 767px) {
            font-size: 18px;
          }
        }
        .statement {
          font-size: 18px;
          font-weight: 500;
          max-width: 700px;
          text-align: center;
          @media only screen and (max-width: 767px) {
            font-size: 14px;
          }
        }
        .choices {
          display: flex;
          flex-direction: row;
          justify-content: center;
          .choice {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 18px;
            font-weight: 500;
            @media only screen and (max-width: 767px) {
              font-size: 16px;
            }
            .choice-circle {
              margin: 40px 40px 15px;
              width: 130px;
              height: 130px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              transition: 0.3s ease background-color;
              @media only screen and (max-width: 767px) {
                margin: 40px 20px 15px;
              }
              @media only screen and (max-width: 575px) {
                margin: 20px 15px 10px;
                width: 90px;
                height: 90px;
              }
              .choice-inner-circle {
                width: 100px;
                height: 100px;
                background: #fff;
                border-radius: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: 0.3s ease background-color;
                @media only screen and (max-width: 575px) {
                  width: 70px;
                  height: 70px;
                }
                i {
                  transition: 0.3s ease background-color;
                  font-size: 35px;
                  margin-top: 16px;
                }
              }
            }
            &.disagree {
              color: #f44336;
              .choice-circle {
                background-color: rgba(244, 67, 54, 0.2);
                &:hover {
                  background-color: rgba(244, 67, 54, 0.4);
                }
              }
              &.active {
                .choice-circle {
                  background-color: rgba(244, 67, 54, 0.4);
                  .choice-inner-circle {
                    background-color: #f44336;
                    i {
                      color: #fff;
                    }
                  }
                }
              }
            }
            &.agree {
              color: #4caf50;
              .choice-circle {
                background-color: rgba(76, 175, 80, 0.2);
                &:hover {
                  background-color: rgba(76, 175, 80, 0.4);
                }
              }
              &.active {
                .choice-circle {
                  background-color: rgba(76, 175, 80, 0.4);
                  .choice-inner-circle {
                    background-color: #4caf50;
                    i {
                      color: #fff;
                    }
                  }
                }
              }
            }
            .choice-rect {
              margin: 40px 20px 15px;
              width: 330px;
              height: 130px;
              border-radius: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              transition: 0.3s ease background-color;
              background-color: rgba(76, 175, 80, 0.2);
              padding: 5px 15px;
              text-align: center;
              @media only screen and (max-width: 1200px) {
                margin: 40px 10px 15px;
              }
              &:hover {
                background-color: rgba(76, 175, 80, 0.4);
              }
              .choice-inner-rect {
                width: 300px;
                height: 100px;
                border-radius: 20px;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: 0.3s ease background-color;
              }
            }
            &:not(.disagree):not(.agree).active .choice-rect {
              .choice-inner-rect {
                background-color: rgba(76, 175, 80, 0.4);
              }
            }
          }
          &:not(.disagree):not(.agree) {
            @media only screen and (max-width: 990px) {
              flex-direction: column;
            }
            .choice-rect {
              @media only screen and (max-width: 990px) {
                width: 420px;
                height: 130px;
                margin: 10px 0;
              }
              @media only screen and (max-width: 767px) {
                width: 340px;
                height: 110px;
                border-radius: 20px;
              }
              @media only screen and (max-width: 575px) {
                width: 240px;
                height: 95px;
              }
              .choice-inner-rect {
                @media only screen and (max-width: 990px) {
                  width: 390px;
                  height: 100px;
                }
                @media only screen and (max-width: 767px) {
                  font-size: 14px;
                  width: 310px;
                  height: 80px;
                  border-radius: 15px;
                }
                @media only screen and (max-width: 575px) {
                  width: 220px;
                  height: 75px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style>
.participate-mbti-bartle .progress-bar .v-progress-linear__background {
  background: #e5e5e5 !important;
  right: 0 !important;
}
.participate-mbti-bartle .progress-bar .v-progress-linear__determinate {
  left: 0;
  right: auto;
}
.participate-mbti-bartle .arrow-box .v-btn {
  min-width: 10px;
  border-radius: 10px;
  opacity: 0.7;
}
.participate-mbti-bartle .arrow-box .v-btn .v-icon {
  font-size: 40px;
  color: #fff;
}
html {
  overflow: auto;
}
</style>
