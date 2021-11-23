<template>
  <v-container
    v-resize="updateWindowSize"
    class="konkoor-view"
    :fluid="true"
    :style="{ height: '100%', background: 'rgb(244,244,244)' }"
  >
    <v-row :style="{ 'min-height': '100%' }">
      <v-col
        id="questions"
        ref="questionsColumn"
        :md="5"
        class="questions"
        :style="{ height: windowSize.y }"
      >
        <!--                <div class="lesson">{{ currentLesson.title }}</div>-->
        <DynamicScroller
          ref="scroller"
          :items="questions"
          :min-item-size="70"
          class="scroller questionss"
          :emit-update="true"
          @update="onScroll"
        >
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
              :item="item"
              :active="active"
              :data-index="index"
            >
              <Item
                :source="item"
                :questions-column="$refs.questionsColumn"
                @inView="test"
              />
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </v-col>
      <v-col
        ref="leftSideList"
        :md="7"
        class="left-side-list"
      >
        <v-row>
          <v-col
            class="px-10 py-0 d-flex justify-space-between"
            dir="ltr"
          >
            <div class="rounded-b-xl rounded-r-xl">
              <v-menu
                bottom
                :offset-y="true"
                class="rounded-b-xl rounded-r-xl"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    large
                    tile
                    v-bind="attrs"
                    elevation="0"
                    class="pl-3"
                    v-on="on"
                  >
                    <v-icon
                      class="mr-2"
                      :size="30"
                      color="#666"
                    >
                      mdi-account-circle
                    </v-icon>
                    <span v-if="user.last_name">
                      {{ user.last_name }}
                    </span>
                    <span v-if="user.first_name">
                      {{ user.first_name }}
                    </span>
                  </v-btn>
                </template>
                <v-card
                  max-width="375"
                  class="mx-auto"
                  rounded="b-xl r-xl"
                >
                  <TopMenu/>
                </v-card>
              </v-menu>
            </div>
            <v-btn
              icon
              @click="changeView('alaa')"
            >
              <v-icon>mdi-table-split-cell</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <BubbleSheet
              :info="{ type: 'pasokh-barg' }"
              :delay-time="0"
              @clickChoice="choiceClicked"
              @scrollTo="scrollTo"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="timer-row">
      <v-btn
        v-if="false"
        class="end-exam-btn"
        @click="getConfirmation"
      >
        ارسال پاسخنامه
      </v-btn>
      <v-col :class="{ 'high-z-index': timerIsOpen }">
        <Timer
          :daftarche="'عمومی'"
          :quiz-started-at="1607963897"
          :daftarche-end-time="1607999897"
          :height="100"
          @timerOpen="timerOpen"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'src/assets/scss/markdownKatex.scss'
import Item from 'src/components/OnlineQuiz/Quiz/question/questionField'
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinWindowSize } from 'src/mixin/Mixins'
import Timer from 'src/components/OnlineQuiz/Quiz/Timer/Timer'
import BubbleSheet from 'src/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet'
import { Exam } from 'src/models/Exam'
import Assistant from 'src/plugins/assistant'
import TopMenu from 'src/components/Menu/topMenu/onlineQuizTopMenu'
export default {
  name: 'konkoorView',
  components: {
    Timer,
    TopMenu,
    BubbleSheet,
    Item
  },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinWindowSize],
  data () {
    return {
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
  watch: {
    'windowSize.y': function () {
      this.setHeights()
    },
    'windowSize.x': function () {
      this.$store.commit('AppLayout/updateDrawer', false)
    }
  },
  created () {
    const that = this
    this.startExam(this.$route.params.quizId, 'onlineQuiz.KonkoorView')
      .then(() => {
        // that.loadFirstActiveQuestionIfNeed()
        that.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
      })
      .catch((error) => {
        Assistant.reportErrors(error)
        that.$notify({
          group: 'notifs',
          title: 'توجه!',
          text: 'مشکلی در دریافت اطلاعات آژمون رخ داده است. لطفا دوباره امتحان کنید.',
          type: 'error'
        })
        // ToDo: uncomment
        // that.$router.push({ name: 'user.exam.list'})
      })
    if (this.windowSize.x > 959) {
      this.changeAppBarAndDrawer(false)
    } else {
      this.$router.push({
        name: 'onlineQuiz.alaaView',
        params: { quizId: 313, questNumber: this.$route.params.quizId }
      })
    }
    if (!this.questions.length) {
      this.questions = this.getCurrentExamQuestionsInArray()
    }
  },
  mounted () {
    this.setHeights()
    if (this.currentQuestion.id === null) {
      this.loadFirstQuestion()
    }
    this.scrollTo(this.currentQuestion.id)
    this.changeAppBarAndDrawer(false)
  },
  unmounted () {
    this.changeAppBarAndDrawer(true)
  },
  methods: {
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
    },
    // changeCurrentQuestion (question) {
    //     if (question.id !== this.currentQuestion.id) {
    //         this.currentQuestion = question
    //     }
    // }
    setHeights () {
      this.$refs.questionsColumn.style.height = this.windowSize.y + 'px'
      if (this.$refs.scroller.$el) {
        this.$refs.scroller.$el.style.height = this.windowSize.y + 'px'
      }
      this.$refs.leftSideList.style.height = (this.windowSize.y - 24) + 'px'
    }
  }
}
</script>

<style scoped>

</style>
