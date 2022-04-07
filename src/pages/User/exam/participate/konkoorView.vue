<template>
  <div class="konkoor-view row">
    <div
        id="questions"
        ref="questionsColumn"
        class="col-md-5 right-side"
      >
        <q-virtual-scroll
          class="konkoor-view-scroll"
          ref="scroller"
          :items="questions"
          virtual-scroll-slice-size="70"
          @virtual-scroll="onScroll"
        >
          <template v-slot="{ item, index }">
            <q-item
              class="question-field"
              :key="index"
              dense
            >
              <q-item-section>
                <Item
                  :source="item"
                  :questions-column="$refs.questionsColumn"
                  @inView="isInView"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-virtual-scroll>
      </div>
    <div class="left-side col-md-7">
      <div class="konkoor-view-navbar">
        <q-btn
          icon="mdi-table-split-cell"
          color="grey"
          flat
          fab-mini
          @click="changeView('alaa')"
        />
        <q-btn-dropdown
          class="dropdown-button"
          icon="account_circle"
          :label="user.full_name "
          color="grey-14"
          dropdown-icon="false"
          flat
        >
          <top-menu/>
        </q-btn-dropdown>
      </div>
      <div
        class="bubbleSheet-warpper"
      >
        <BubbleSheet
          :info="{ type: 'pasokh-barg'}"
          :delay-time="0"
          :questions="questions"
          :bubble-sheet-height="windowSize.y"
          @clickChoice="choiceClicked"
          @scrollTo="scrollTo"
        />
      </div>
      <div class="row timer-row">
        <q-btn
          v-if="false"
          class="end-exam-btn"
          @click="getConfirmation"
        >
          ارسال پاسخنامه
        </q-btn>
        <div
          class="col"
          :class="{ 'high-z-index': timerIsOpen}"
        >
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
  </div>
</template>

<script>
import 'src/assets/scss/markdownKatex.scss'
import Item from 'src/components/OnlineQuiz/Quiz/question/questionField'
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins'
import Timer from 'src/components/OnlineQuiz/Quiz/timer/timer'
import BubbleSheet from 'src/components/OnlineQuiz/Quiz/bubbleSheet/bubbleSheet'
import { Exam } from 'src/models/Exam'
import Assistant from 'src/plugins/assistant'
import TopMenu from 'src/components/Menu/topMenu/onlineQuizTopMenu'
import { ref } from 'vue'
import { mapGetters } from 'vuex'

export default {
  name: 'konkoorView',
  components: {
    Timer,
    TopMenu,
    BubbleSheet,
    Item
  },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion],
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
      timerIsOpen: false,
      scroller: ref(null),
      leftSideList: ref(null)
    }
  },
  watch: {
    'windowSize.x': function () {
      this.view()
    },
    'windowSize.y': function () {
      this.setHeights()
    }
  },
  created () {
  },
  mounted () {
    if (this.$route.name === 'konkoorView') {
      this.changeAppBarAndDrawer(false)
    }
    this.startExamProcess()
    this.setHeights()
    this.view()
    if (this.currentQuestion) {
      if (this.currentQuestion.id) {
        this.scrollTo(this.currentQuestion.id)
      } else {
        this.loadFirstQuestion()
      }
    }
  },
  unmounted () {
    this.changeAppBarAndDrawer(true)
  },
  computed: {
    ...mapGetters('AppLayout', [
      'windowSize'
    ])
  },
  methods: {
    startExamProcess () {
      const that = this
      // this.updateOverlay(true)
      this.startExam(this.$route.params.quizId, 'onlineQuiz.KonkoorView')
        .then(() => {
          that.questions = that.getCurrentExamQuestionsInArray()
          const callbacks = {
            'question.file-link:update': {
              afterReload () {
                that.questions = that.getCurrentExamQuestionsInArray()
              }
            }
          }
          that.setSocket(that.$store.getters['Auth/accessToken'], that.quiz.id, callbacks)
          // this.updateOverlay(false)
        })
        .catch((error) => {
          Assistant.reportErrors(error)
          // this.updateOverlay(false)
          that.$router.push({ name: 'user.exam.list' })
        })
    },
    timerOpen (value) {
      this.timerIsOpen = value
    },
    getConfirmation () {
      const that = this
      // TODO --> conrim in store should be fix
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
          that.$store.commit('Exam/clearExamData', that.quiz.id)
          that.$q.notify({
            message: 'اطلاعات آزمون شما ثبت شد.',
            type: 'positive'
          })
          that.$router.push({ name: 'user.exam.list' })
        })
        .catch(() => {
          that.$q.notify({
            title: 'توجه!',
            message: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
            type: 'warning',
            duration: 30000
          })
          that.$router.push({ name: 'user.exam.list' })
        })
    },
    isInView (payload) {
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
      this.$store.commit('AppLayout/updateLayoutHeader', state)
      this.$store.commit('AppLayout/updateLayoutLeftDrawer', state)
      this.$store.commit('AppLayout/updateLayoutRightDrawerVisible', state)
    },
    changeCurrentQuestionIfScrollingIsDone () {
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
    scrollTo (questionId) {
      if (!this.$refs.scroller) {
        return
      }
      const questionIndex = this.getQuestionIndexById(questionId)
      this.$refs.scroller.scrollTo(questionIndex)
      for (let i = 1; i < 4; i++) {
        setTimeout(() => {
          if (this.$refs.scroller) {
            this.$refs.scroller.scrollTo(questionIndex)
          }
        },
        333 * i)
      }
    },
    getFirstInViewQuestionNumber () {
      let firstQuestionInView
      for (let i = this.renderedQuestions.startIndex; i <= this.renderedQuestions.endIndex; i++) {
        if (this.questions[i].isInView) {
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
    choiceClicked (questionId) {
      this.scrollTo(questionId)
      this.changeQuestion(questionId)
    },
    view () {
      if (this.windowSize.x > 959) {
        this.changeAppBarAndDrawer(false)
      } else {
        this.$router.push({
          name: 'onlineQuiz.alaaView',
          params: { quizId: this.$route.params.quizId, questNumber: 1 }
        })
      }
    },
    setHeights () {
      if (this.$refs.scroller.$el) {
        this.$refs.scroller.$el.style.height = this.windowSize.y + 'px'
      }
      // this.$refs.leftSideList.style.height = (this.windowSize.y - 127) + 'px'
    },
    updateOverlay (value) {
      this.$store.dispatch('loading/overlayLoading', { loading: value })
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.konkoor-view {
  max-height: 100vh;
  //background-color: rgb(244, 244, 244);

  .right-side {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0;

    .konkoor-view-scroll {
      max-height: 100%;

      .question-field {
        &.q-item {
          padding: 0;
        }
      }
    }
  }

  .left-side {
    .konkoor-view-navbar {
      display: flex;
      justify-content: space-between;
      padding: 0 40px;

      .dropdown-button {
        padding: 0;
        direction: rtl;
      }
    }

    .bubbleSheet-warpper {
      height: calc(100vh - 40px - 103px);
    }

    .timer-row {
      width: calc(58% - 150px);
      position: fixed;
      bottom: 0;
      right: 100px;

      .end-exam-btn {
        position: absolute;
        bottom: 0;
        background: rgb(76, 175, 80) !important;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        height: 103px !important;
        box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
        width: 200px;
        border-radius: 20px 20px 0 0;
      }

      .high-z-index {
        z-index: 3;
      }
    }
  }

}
</style>
<style lang="scss">
.konkoor-view {
  .left-side {
    height: 100vh;
    .konkoor-view-navbar {
      .dropdown-button {
        .q-icon {
          font-size: 30px;

          &.on-left {
            margin: 0 0 0 8px;
          }
        }
      }

      .q-btn--fab-mini {
        padding: 0;
        height: 36px;
        width: 36px;
      }
    }
  }
}
</style>
