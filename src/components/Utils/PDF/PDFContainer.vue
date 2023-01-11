<template>
  <div class="col-md-5 right-side">
    <div v-if="pageChunks.length === 0"
         :style="{ width: pageSize.w + 'px' }"
         class="prepare-question-section"
    >
      <pdf-question-field v-for="(question, questionIndex) in questions"
                          :key="'question-item-'+question.id"
                          v-model:height="question.height"
                          :source="question"
                          :index="questionIndex"
                          @questionLoaded="onQuestionLoaded(question)"
      />
    </div>
    <div v-else>
      <pdf-page v-for="(page, pageIndex) in pageChunks"
                :key="pageIndex"
                :title="exam.title"
                :grade="exam.gradeTitle"
                :major="exam.majorTitle"
                :page="(pageIndex+1).toString()"
      >
        <template v-slot:body>
          <div v-for="(pageQuestions, chunkIndex) in page"
               :key="'chunk-index-'+chunkIndex"
          >
            <pdf-question-field v-if="pageQuestions"
                                :source="pageQuestions"
                                :index="chunkIndex"
            />
          </div>
        </template>
      </pdf-page>
      <div class="page-break"></div>
    </div>
  </div>
</template>

<script>
import PdfPage from './PDFPage.vue'
import PdfQuestionField from 'src/components/Utils/PDF/PdfQuestionField.vue'
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins.js'
// import QuestionField from 'components/Question/QuestionPage/QuestionField'
export default {
  name: 'PDFContainer',
  components: { PdfQuestionField, PdfPage },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion],
  props: {
    exam: {
      type: Object,
      default () {
        return {
          title: '',
          gradeTitle: 'دوازدهم',
          majorTitle: 'ریاضی',
          n_questions: 0
        }
      }
    },
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
        w: 724,
        h: 900
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
    }
  }
}
</script>

<style scoped>
.prepare-question-section {
  margin: auto;
}
</style>
<style>
@media print {
  .page-break {
    clear: both;
    page-break-before: always;
  }
}
</style>
