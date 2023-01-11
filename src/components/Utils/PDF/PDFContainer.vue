<template>
  <div class="col-md-5 right-side">
    <div v-if="pageChunks.length === 0">
      <pdf-question-field v-for="(question, questionIndex) in questions"
                          :key="'question-item-'+question.id"
                          v-model:height="question.height"
                          :source="question"
                          :index="questionIndex"
                          @questionLoaded="onQuestionLoaded(question)"
      />
    </div>
    <div v-else>
      <PDFPage v-for="(page, pageIndex) in pageChunks"
               :key="pageIndex"
               :title="'تست'"
               :grade="'تست'"
               :major="'تست'"
               :page="pageIndex+1"
      >
        <template v-slot:body>
          <div v-for="(pageQuestions, chunkIndex) in page"
               :key="'chunk-index-'+chunkIndex"
          >
            <pdf-question-field v-if="pageQuestions"
                                :source="pageQuestions"
                                :index="questionIndex"
            />
          </div>
        </template>
      </PDFPage>
    </div>
  </div>
</template>

<script>
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins'
import PdfQuestionField from 'components/Utils/PDF/PdfQuestionField'
import PDFPage from './PDFPage.vue'
// import QuestionField from 'components/Question/QuestionPage/QuestionField'
export default {
  name: 'PDFContainer',
  components: { PdfQuestionField, PDFPage },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion],
  props: {
    questions: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      pageChunks: [],
      pageSize: {
        w: 794,
        h: 1123
      }
    }
  },
  computed: {
    allQuestionLoaded () {
      const notLoaded = this.questions.find(question => !question.loaded)
      return !notLoaded
    }
  },
  watch: {
    allQuestionLoaded () {
      console.log('allQuestionLoaded')
      this.createPageChunks(this.pageSize.h)
    }
  },
  methods: {
    createPageChunks (pageHeight) {
      let sumHeight = 0
      let pageQuestions = []
      const pages = []
      this.questions.forEach((question, questionIndex) => {
        if (pageHeight > (sumHeight + question.height)) {
          sumHeight += question.height
          pageQuestions.push(question)
        } else {
          pages.push(pageQuestions)
          sumHeight = 0
          pageQuestions = []
          sumHeight += question.height
          pageQuestions.push(question)
        }
      })
      if (pageQuestions.length > 0) {
        pages.push(pageQuestions)
        sumHeight = 0
        pageQuestions = []
      }
      this.pageChunks = pages
      console.log('pages', pages)
    },
    onQuestionLoaded (question) {
      question.loaded = true
    },
    onScroll (details) {
      if (!this.questions[details.index]) {
        return
      }
      this.changeQuestion(this.questions[details.index].id, this.$route.name)

    // startIndex, endIndex
    // this.updateLtr()
    // this.renderedQuestions = { startIndex, endIndex }
    // if (this.scrollState === 'not scrolling') {
    //   this.setIntervalCallback = setInterval(() => {
    //     this.changeCurrentQuestionIfScrollingIsDone()
    //   }, 250)
    //   this.scrollState = 'scrolling'
    // }
    // this.timePassedSinceLastScroll = 0
    }
  }
}
</script>

<style scoped>

</style>
