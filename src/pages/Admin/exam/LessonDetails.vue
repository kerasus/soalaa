<template>
    <div class="main-container">
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
          <div class="col-4 flex justify-between">
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
            <q-btn
              round
              color="primary"
              unelevated
              @click="this.$router.go(-1)"
            >
              <i class="fi-rr-angle-left row" />
            </q-btn>
          </div>
        </div>
      </q-card>
      <q-virtual-scroll
        class="konkoor-view-scroll q-pa-md q-mt-md"
        style="max-height: calc(100vh - 250px);"
        ref="scroller"
        :items="filteredQuestions"
        :key="questionListKey"
        @virtual-scroll="onScroll"
      >
        <template v-slot="{ item, index }">
          <q-item
            class="question-field no-padding"
            :key="index"
            dense
          >
            <q-item-section>
              <question-item
                pageStrategy="lesson-detail"
                :question="item"
                :confirmLoading="confirmQLoading"
                :questionListOptions="questionsOptions"
                :consider-active-category="false"
                :questions-column="$refs.questionsColumn"
                :exam-id="$route.params.quizId"
                :sub-category="quizData.sub_categories"
                @detachQuestion="detachQuestion"
                @deleteQuestion="deleteQuestion"
                @copyIdToClipboard="copyIdToClipboard"
                @confirmQuestion="confirmQuestion"
              />
            </q-item-section>
          </q-item>
        </template>
      </q-virtual-scroll>
    </div>
</template>

<script>
import Question from 'src/components/QuizEditor/Question'
import { mixinAuth, mixinQuiz } from 'src/mixin/Mixins'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { QuestionList } from 'src/models/Question'
import { Exam } from 'src/models/Exam'
import API_ADDRESS from 'src/api/Addresses'
import QuestionItem from 'components/Question/QuestionItem/QuestionItem'
import { copyToClipboard } from 'quasar'

export default {
  name: 'LessonDetails',
  components: {
    QuestionItem
  },
  mixins: [mixinAuth, mixinQuiz],
  data () {
    return {
      confirmQLoading: false,
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
      subCategoriesList: new QuestSubcategoryList(),
      questionFilterMethod: 'not-filtered',
      quizData: new Exam(),
      item: Question,
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
    detachQuestion (questionId) {
      this.$store.dispatch('AppLayout/showConfirmDialog', {
        show: true,
        message: 'از حذف سوال از آزمون اطمینان دارید؟',
        buttons: {
          no: 'خیر',
          yes: 'بله'
        },
        callback: async (confirm) => {
          if (!confirm) {
            this.closeConfirmModal()
          } else {
            try {
              this.closeConfirmModal()
              await this.detachQuestionReq(questionId)
              this.reload()
            } catch (e) {
              this.closeConfirmModal()
            }
          }
        }
      })
    },
    closeConfirmModal () {
      this.$store.commit('AppLayout/showConfirmDialog', {
        show: false
      })
    },
    detachQuestionReq (questionId) {
      return this.$axios.post(API_ADDRESS.question.detach(questionId), {
        exams: [this.examId]
      })
    },
    deleteQuestion (questionId) {
      this.$store.dispatch('AppLayout/showConfirmDialog', {
        show: true,
        message: 'از حذف کامل سوال از پایگاه داد و حذف از تمامی آزمون ها اطمینان دارید؟',
        buttons: {
          no: 'خیر',
          yes: 'بله'
        },
        callback: async (confirm) => {
          if (!confirm) {
            this.closeConfirmModal()
            return
          }
          try {
            this.closeConfirmModal()
            await this.deleteQuestionReq(questionId)
            this.reload()
          } catch (e) {
            this.reload()
            this.closeConfirmModal()
          }
        }
      })
    },
    deleteQuestionReq (questionId) {
      return this.$axios.delete(API_ADDRESS.question.delete(questionId), {
        exams: [this.examId]
      })
    },
    copyIdToClipboard (data) {
      copyToClipboard(data)
    },
    confirmQuestion (question) {
      this.confirmLoading = true
      question.confirmed ? this.unConfirmUser(question) : this.confirmUser(question)
    },
    async confirmUser (question) {
      try {
        const response = await this.sendConfirmReq(question)
        question.confirmed = response.data.data.confirmed
        question.confirmers = response.data.data.confirmers
        this.confirmLoading = false
      } catch (e) {
        question.confirmed = !question.confirmed
        this.confirmLoading = false
      }
    },
    async unConfirmUser (question) {
      try {
        const response = await this.sendUnConfirmReq(question)
        question.confirmed = response.data.data.confirmed
        question.confirmers = response.data.data.confirmers
        this.confirmLoading = false
      } catch (e) {
        question.confirmed = !question.confirmed
        this.confirmLoading = false
      }
    },
    sendUnConfirmReq (question) {
      return this.$axios.get(API_ADDRESS.question.unconfirm(question.id))
    },
    sendConfirmReq (question) {
      return this.$axios.get(API_ADDRESS.question.confirm(question.id))
    },
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
      console.log('scrollTo')
      let questionIndex
      if (questionId) {
        questionIndex = this.getQuestionIndexById(questionId)
      } else {
        // questionIndex = questionNumber - this.firstQuestionOrder
        questionIndex = questionNumber
      }
      console.log(questionIndex)
      console.log(this.$refs.scroller)
      // this.$refs.scroller.scrollTo(questionIndex, 'start-force')
      // for (let i = 1; i < 4; i++) {
      //   setTimeout(() => {
      //     this.$refs.scroller.scrollTo(questionIndex)
      //   },
      //   333 * i)
      // }
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
.main-container{
  padding : 10px 40px;
  @media only screen and (max-width: 1919px){
    padding : 10px 30px;
  }
  @media only screen and (max-width: 599px){
    padding : 10px 16px;
  }

}

</style>
<style>
.content-inside{
  height: calc(100vh - 110px)!important;
}
</style>
