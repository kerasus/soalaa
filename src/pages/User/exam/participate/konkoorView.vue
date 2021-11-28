<template>
  <div class="konkoor-view ">
    <div class="row">
      <div class="col-md-5">
      </div>
      <div class="col-md-7">
        <div class="row left-side">
          <div class="col bubbleSheet-top">
            <q-btn
              icon="mdi-table-split-cell"
              @click="changeView('alaa')"
            />
            <q-btn-dropdown
              icon="account_circle"
              :label="user.full_name "
              color="grey-14"
              dropdown-icon="false"
              flat
            >
              <top-menu/>
            </q-btn-dropdown>
          </div>
          <div class="col">
            <BubbleSheet
              :info="{ type: 'pasokh-barg'}"
              :delay-time="0"
              @clickChoice="choiceClicked"
              @scrollTo="scrollTo"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="row timer-row"
    >
      <div class="col"></div>
      <div class="col">
        <Timer
          :daftarche="'عمومی'"
          :quiz-started-at="1607963897"
          :daftarche-end-time="1607999897"
          :height="100"
          @timerOpen="timerOpen"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import 'src/assets/scss/markdownKatex.scss'
import Item from 'src/components/OnlineQuiz/Quiz/question/questionField'
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinWindowSize } from 'src/mixin/Mixins'
import Timer from 'src/components/OnlineQuiz/Quiz/timer/timer'
import BubbleSheet from 'src/components/OnlineQuiz/Quiz/bubbleSheet/bubbleSheet'
import { Exam } from 'src/models/Exam'
import Assistant from 'src/plugins/assistant'
import TopMenu from 'src/components/Menu/topMenu/onlineQuizTopMenu'
export default {
  name: 'konkoorView',
  components: {
    Timer,
    TopMenu,
    BubbleSheet
  //   Item
  },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinWindowSize],
  data () {
    return {
      user: null,
      quizData: new Exam(),
      item: Item,
      lastTimeScrollRange: { start: 0, end: 29 },
      scrollState: 'not scrolling',
      timePassedSinceLastScroll: 0,
      setIntervalCallback: null,
      renderedQuestions: { startIndex: 0, endIndex: 0 },
      questions: [],
      inView: [],
      timerIsOpen: false
    }
  },
  // watch: {
  //   'windowSize.y': function () {
  //     this.setHeights()
  //   },
  //   'windowSize.x': function () {
  //     this.$store.commit('AppLayout/updateDrawer', false)
  //   }
  // },
  created () {
    this.getUser()
    this.startExam('6135be32e0db6947171ef9a0', 'KonkoorView')
      .then(() => {
        // that.loadFirstActiveQuestionIfNeed()
      })
    if (this.windowSize.x > 959) {
      this.changeAppBarAndDrawer(false)
    }
    // else {
    //   this.$router.push({
    //     name: 'onlineQuiz.alaaView',
    //     params: { quizId: 313, questNumber: this.$route.params.quizId }
    //   })
    // }
    if (!this.questions.length) {
      this.questions = this.getCurrentExamQuestionsInArray()
    }
  },
  mounted () {
    // this.setHeights()
    // if (this.currentQuestion.id === null) {
    //   this.loadFirstQuestion()
    // }
    // this.scrollTo(this.currentQuestion.id)
    // this.changeAppBarAndDrawer(false)
  },
  unmounted () {
    this.changeAppBarAndDrawer(true)
  },
  methods: {
    getUser () {
      this.user = this.$store.getters['Auth/user']
      return this.user
    },
    loadFirstActiveQuestionIfNeed () {
      const activeCcategory = this.quiz.getFirstActiveCategory()
      if (!activeCcategory) {
        this.loadFirstQuestion()
      } else {
        if (
          Assistant.getId(this.currentQuestion.sub_category.category_id) !== Assistant.getId(activeCcategory.id) &&
          activeCcategory.sub_categories.list.length > 0
        ) {
          const questionsOfSubcategory = this.getQuestionsOfSubcategory(activeCcategory.sub_categories.list[0].id)
          if (questionsOfSubcategory.length > 0) {
            this.currentQuestion = questionsOfSubcategory[0]
          }
        }
      }

      this.scrollTo(this.currentQuestion.id)

      // if (!this.currentQuestion.in_active_category) {//category_id
      //     let firstActiveQuestion = this.quiz.questions.getFirstActiveQuestion()
      //     if (!firstActiveQuestion) {
      //         this.loadFirstQuestion()
      //     } else {
      //         this.changeQuestion(firstActiveQuestion.id)
      //     }
      //     this.scrollTo(this.currentQuestion.id)
      // }
    },
    timerOpen (value) {
      this.timerIsOpen = value
    },
    getConfirmation () {
      const that = this
      this.$store.commit('AppLayout/showConfirmDialog', {
        message: 'از ارسال پاسخ ها اطمینان دارید؟',
        button: {
          no: 'ادامه میدم',
          yes: 'ثبت میکنم'
        },
        callback: (confirm) => {
          if (!confirm) {
            return
          }
          that.sendAnswersAndFinishExam()
        }
      })
    },
    sendAnswersAndFinishExam () {
      const that = this
      this.quiz.sendAnswersAndFinishExam()
        .then(() => {
          that.$store.commit('clearExamData', that.quiz.id)
          that.$notify({
            group: 'notifs',
            text: 'اطلاعات آزمون شما ثبت شد.',
            type: 'success'
          })
          that.$router.push({ name: 'user.exam.list' })
        })
        .catch(() => {
          that.$notify({
            group: 'notifs',
            title: 'توجه!',
            text: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
            type: 'warn',
            duration: 30000
          })
          that.$router.push({ name: 'user.exam.list' })
        })
    },
    test (payload) {
      if (payload.isInView) {
        for (let i = 0; i < this.inView.length; i++) {
          if (this.inView[i] === payload.number) {
            return
          }
        }
        this.inView.push(payload.number)
      } else {
        for (let i = 0; i < this.inView.length; i++) {
          if (this.inView[i] === payload.number) {
            this.inView.splice(i, 1)
          }
        }
      }
    },
    changeAppBarAndDrawer (state) {
      this.$store.commit('AppLayout/updateAppBarAndDrawer', state)
    },
    changeCurrentQuestionIfScrollingIsDone () {
      // console.Log('time since last: ', this.timePassedSinceLastScroll)
      // if (startIndex !== this.lastTimeScrollRange.start || endIndex !== this.lastTimeScrollRange.end) {
      //     this.lastTimeScrollRange.start = startIndex
      //     this.lastTimeScrollRange.end = endIndex
      // }
      if (this.timePassedSinceLastScroll >= 1000) {
        this.changeCurrentQuestionToFirstQuestionInView()
        this.timePassedSinceLastScroll = 0
        this.scrollState = 'not scrolling'
        clearInterval(this.setIntervalCallback)
        this.setIntervalCallback = null
      }
      this.timePassedSinceLastScroll += 250
    },
    updateLtr () {
      setTimeout(() => {
        document.querySelectorAll('.katex:not([dir="ltr"])').forEach(item => {
          item.setAttribute('dir', 'ltr')
        })
      }, 1000)
    },
    onScroll (startIndex, endIndex) {
      this.updateLtr()
      this.renderedQuestions = { startIndex, endIndex }
      if (this.scrollState === 'not scrolling') {
        this.setIntervalCallback = setInterval(() => {
          this.changeCurrentQuestionIfScrollingIsDone()
        }, 250)
        this.scrollState = 'scrolling'
      }
      this.timePassedSinceLastScroll = 0
    },
    changeCurrentQuestionToFirstQuestionInView () {
      const firstInViewQuestion = this.getFirstInViewQuestionNumber()
      if (firstInViewQuestion.id === this.currentQuestion.id) {
        return
      }
      this.changeQuestion(firstInViewQuestion.id, 'onlineQuiz.konkoorView')
    },
    // scrollTo (questionId) {
    //     if (this.quiz.questions.getQuestionById(questionId).isInView === false) {
    //         const questionIndex = this.quiz.questions.getQuestionIndexById(questionId)
    //         this.$refs.scroller.scrollToIndex(questionIndex)
    //         for (let i = 1; i < 4; i++) {
    //             setTimeout(() => {
    //                 this.$refs.scroller.scrollToIndex(questionIndex)
    //             },
    //             500 / Math.ceil(this.quiz.questions.list.length / 100) * i)
    //         }
    //     }
    // },
    scrollTo (questionId) {
      const questionIndex = this.getQuestionIndexById(questionId)
      this.$refs.scroller.scrollToItem(questionIndex)
      for (let i = 1; i < 4; i++) {
        setTimeout(() => {
          this.$refs.scroller.scrollToItem(questionIndex)
        },
        333 * i)
      }
    },
    // onIntersect (entries) {
    //     this.quiz.questions.getQuestionById(entries[0].target.id).isInView = (entries[0].intersectionRatio >= 0.5)
    // },
    // ToDo: check for removal
    getFirstInViewQuestionNumber () {
      // console.Log(this.renderedQuestions.startIndex, this.renderedQuestions.endIndex, 'haha2')
      let firstQuestionInView
      for (let i = this.renderedQuestions.startIndex; i <= this.renderedQuestions.endIndex; i++) {
        // console.Log(i, ': ', this.questions[i].isInView)
        if (this.questions[i].isInView === true) {
          firstQuestionInView = this.questions[i]
          break
        }
      }
      if (firstQuestionInView && firstQuestionInView.id !== null) {
        return firstQuestionInView
      } else {
        return false
      }
    },
    // isThisFirstQuestionInView (questionId) {
    //     if (this.getFirstInViewQuestionNumber().id === questionId) {
    //         return true
    //     }
    //     return false
    // },
    // getQuestionNumber (question) {
    //     if (question.isInView === false) {
    //         return '.question:nth-child('+(this.quiz.questions.getQuestionIndexById(question.id) + 2)+')'
    //     }
    //     return ''
    // },
    choiceClicked (questionId) {
      this.scrollTo(questionId)
      this.changeQuestion(questionId)
    }
    // changeCurrentQuestion (question) {
    //     if (question.id !== this.currentQuestion.id) {
    //         this.currentQuestion = question
    //     }
    // }
    // setHeights () {
    //   this.$refs.questionsColumn.style.height = this.windowSize.y + 'px'
    //   if (this.$refs.scroller.$el) {
    //     this.$refs.scroller.$el.style.height = this.windowSize.y + 'px'
    //   }
    //   this.$refs.leftSideList.style.height = (this.windowSize.y - 24) + 'px'
    // }
  }
}
</script>

<style lang="scss" scoped>
.konkoor-view{
  height: 100%;
  min-height: 100vh;
  background-color: rgb(244,244,244);
  .left-side{
    display: flex;
    flex-direction: column;
    min-height: 100%;
    overflow-y: auto;
    .bubbleSheet-top{
      width: 56vw;
      display: flex;
      justify-content: space-between;
    }
  }
  .timer-row {
    width: calc(58% - 150px);
    position: absolute;
    bottom: 12px;
    right: 100px;
  }
}
</style>
