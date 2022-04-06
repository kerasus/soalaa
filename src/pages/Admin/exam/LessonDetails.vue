<template>
  <div>
    <div class="row justify-end q-pr-lg">
      <q-btn
        round
        color="primary"
        unelevated
        @click="this.$router.go(-1)"
      >
        <i class="fi-rr-angle-left row" />
      </q-btn>
    </div>
    <q-splitter
      v-model="splitterModel"
      separator-class="bg-primary"
      separator-style="width: 5px"
      style="height: 100%"
    >
      <template v-slot:before>
        <div class="q-pa-md">
            <q-card class="top-menu q-pa-lg">
              <div class="row items-center">
                <div class="col-8">
                  <q-btn-toggle
                    v-model="questionFilterMethod"
                    unelevated
                    no-caps
                    toggle-color="primary"
                    color="white"
                    text-color="black"
                    :options="[
                  {label: 'نمایش همه', value:'not-filtered'},
                  {label: ' کلا تایید نشده', value:'not-confirmed-at-all'},
                  {label: 'من تایید نکردم', value:'not-confirmed-by-me'}
                   ]"
                  />
                </div>
                <div class="col-4">
                  <div class="search-box">
                    <div>
                      <q-input
                        v-model.number="questionSearchNumber"
                        type="number"
                        outlined
                        dense
                        label="شماره سوال"
                      >
                        <template v-slot:append>
                          <div @click="scrollToQuestion">
                            <i class="fi fi-rr-search search-icon cursor-pointer"></i>
                          </div>
                        </template>
                      </q-input>
                    </div>
                    <i class="fi fi-rr-refresh refresh-icon cursor-pointer q-ml-md" @click="reload" ></i>
                  </div>
                </div>
              </div>
            </q-card>
          <q-virtual-scroll
            class="konkoor-view-scroll q-mt-md"
            style="max-height: calc(100vh - 250px);"
            ref="scroller"
            :items="filteredQuestions"
            :key="questionListKey"
            @virtual-scroll="onScroll"
          >
            <template v-slot="{ item, index }">
              <q-item
                class="question-field"
                :key="index"
                dense
              >
                <q-item-section>
                  <question
                    :sourcee="item"
                    :questionListOptions="questionsOptions"
                    :consider-active-category="false"
                    :questions-column="$refs.questionsColumn"
                    :exam-id="$route.params.quizId"
                    :sub-category="quizData.sub_categories"
                    @reloadPage="reload"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-virtual-scroll>

        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <BubbleSheet
            ref="bubbleSheetC"
            :delay-time="0"
            :questions="filteredQuestions"
            :info="{ type: 'pasokh-barg' }"
            @clickChoice="choiceClicked"
            @scrollTo="scrollTo"
          />
        </div>
      </template>

    </q-splitter>
  </div>
</template>

<script>
import BubbleSheet from 'src/components/OnlineQuiz/Quiz/bubbleSheet/bubbleSheet'
import Question from 'src/components/QuizEditor/Question'
import { mixinAuth, mixinQuiz } from 'src/mixin/Mixins'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { QuestionList } from 'src/models/Question'
import { Exam } from 'src/models/Exam'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'LessonDetails',
  components: {
    BubbleSheet,
    Question
  },
  mixins: [mixinAuth, mixinQuiz],
  data () {
    return {
      questionsOptions: {
        copy: true,
        detachQuestion: true,
        deleteQuestionFromDb: true,
        editQuestion: true,
        switch: true
      },
      questionListKey: 0,
      options: {
        bookmark: false,
        copy: false,
        deleteQuestion: false,
        deleteQuestionFromDb: false,
        editQuestion: false,
        switch: false
      },
      splitterModel: 50,
      subCategoriesList: new QuestSubcategoryList(),
      questionFilterMethod: 'not-filtered',
      bubbleSheet: 800,
      dragging: false,
      quizData: new Exam(),
      item: Question,
      lastTimeScrollRange: { start: 0, end: 29 },
      scrollState: 'not scrolling',
      timePassedSinceLastScroll: 0,
      setIntervalCallback: null,
      renderedQuestions: { startIndex: 0, endIndex: 0 },
      dialog: false,
      items: [
        'خارج از بودجه بندی آزمون ',
        'خارج از چارچوب کتاب درسی',
        'دارای غلط تایپی'
      ],
      inView: [],
      windowVisible: true,
      questionSearchNumber: 0,
      firstQuestionOrder: 0
    }
  },
  created () {
    this.loadQuizDataAndSubCategories()
  },
  computed: {
    filteredQuestions () {
      this.quizData.questions.list.forEach((item, index) => {
        item.questNumber = index + 1
      })
      let newList
      if (this.questionFilterMethod === 'not-confirmed-at-all') {
        newList = this.quizData.questions.list.filter(item => item.confirmers.length === 0)
      } else if (this.questionFilterMethod === 'not-confirmed-by-me') {
        newList = this.quizData.questions.list.filter(item => item.confirmed === false)
      } else {
        newList = this.quizData.questions.list
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.questionListKey = Date.now()
      return newList
    }
  },
  methods: {
    scrollToQuestion () {
      this.scrollTo(null, this.questionSearchNumber)
    },
    questionListHeight () {
      // box is a col-7 with 12px padding
      const boxSize = this.$refs.bubbleSheet.clientWidth - 24
      // each group width is 140px
      const horizontalGroupAmounts = Math.floor(boxSize / 140)
      const verticalGroupAmount = Math.ceil(this.questionsInGroups.length / horizontalGroupAmounts)
      return verticalGroupAmount * 182 + 20
    },
    changeAppBarAndDrawer (state) {
      this.$store.commit('AppLayout/updateAppBarAndDrawer', state)
    },
    async loadQuizDataAndSubCategories (reload = false) {
      try {
        const response = await this.getQuizDataAndSubCategories()
        if (response.data.data.length) {
          this.firstQuestionOrder = response.data.data[0].order
          this.loadSubCategories(response, reload)
        } else {
          this.$router.push({ name: 'onlineQuiz.exams' })
        }
      } catch (e) {
        console.log('err ', e)
      }
    },
    getQuizDataAndSubCategories () {
      return this.$axios.post(API_ADDRESS.exam.examQuestion(this.$route.params.quizId), {
        sub_categories: [this.$route.params.lessonId]
      })
    },
    loadSubCategories (quizResponse, reload) {
      const that = this
      this.$axios.get(API_ADDRESS.questionSubcategory.base)
        .then((response) => {
          if (reload) {
            that.$q.notify({
              message: 'اطلاعات بروزرسانی شد.',
              type: 'positive'
            })
          }
          that.quizData.sub_categories = new QuestSubcategoryList(response.data.data)
          const questions = quizResponse.data.data
          that.sortQuestions(questions)
          that.quizData.questions = new QuestionList(questions)
          this.questionListKey = Date.now()
        })
    },
    scrollTo (questionId, questionNumber) {
      let questionIndex
      if (questionId) {
        questionIndex = this.getQuestionIndexById(questionId)
      } else {
        questionIndex = questionNumber - this.firstQuestionOrder
      }
      this.$refs.scroller.scrollTo(questionIndex, 'start-force')
      for (let i = 1; i < 4; i++) {
        setTimeout(() => {
          this.$refs.scroller.scrollTo(questionIndex)
        },
        333 * i)
      }
    },
    choiceClicked (questionId) {
      this.scrollTo(questionId)
      // this.changeQuestion(questionId)
    },
    reload () {
      this.loadQuizDataAndSubCategories(true)
    },
    onScroll (startIndex, endIndex) {
      // this.updateLtr()
      this.renderedQuestions = { startIndex, endIndex }
      if (this.scrollState === 'not scrolling') {
        this.setIntervalCallback = setInterval(() => {
          this.changeCurrentQuestionIfScrollingIsDone()
        }, 250)
        this.scrollState = 'scrolling'
      }
      this.timePassedSinceLastScroll = 0
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
    changeCurrentQuestionToFirstQuestionInView () {
      const firstInViewQuestion = this.getFirstInViewQuestionNumber()
      if (firstInViewQuestion.id === this.currentQuestion.id) {
        return
      }
      this.changeQuestion(firstInViewQuestion.id, 'onlineQuiz.konkoorView')
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
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box{
  display: flex;
  align-items: center;
  .search-icon{
  display: flex;
  }
  .refresh-icon{
    display: flex;
    font-size: 25px;
    color: #7b7b7b;
  }
}
.top-menu{
  border-radius: 15px;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
}
</style>
<style>
.content-inside{
  height: calc(100vh - 110px)!important;
}
</style>
