<template>
  <div class="col-md-5 right-side">
    <pdf-question-field v-for="(question, questionIndex) in questions"
                        :key="'question-item-'+question.id"
                        v-model:height="question.height"
                        :source="question"
                        :index="questionIndex"
                        @questionLoaded="onQuestionLoaded(question)"
    />
  </div>
</template>

<script>
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins'
import PdfQuestionField from 'components/Utils/PDF/PdfQuestionField'
// import QuestionField from 'components/Question/QuestionPage/QuestionField'
export default {
  name: 'PDFContainer',
  components: { PdfQuestionField },
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
        }
      })
      if (pageQuestions.length > 0) {
        pages.push(pageQuestions)
        sumHeight = 0
        pageQuestions = []
      }

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
