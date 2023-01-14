<template>
  <div class="col-md-5 right-side">
    <div v-if="pageChunks.length === 0"
         :style="{ width: pageSize.w + 'px', paddingRight:parseInt(pdfConfig.rightMargin)+'px', paddingLeft: parseInt(pdfConfig.leftMargin)+'px' }"
         class="prepare-question-section"
    >
      <pdf-question-field v-for="question in questions"
                          :key="'question-item-'+question.id"
                          v-model:height="question.height"
                          :style="{marginBottom: parseInt(pdfConfig.spaceBetweenQuestion)+'px'}"
                          :question="question"
                          :order="question.order"
                          :display-choices="mode === 'questionsNoAnswer'"
                          :display-statement="mode === 'questionsNoAnswer'"
                          :display-descriptive-answer="mode === 'onlyDescriptiveAnswers'"
                          @questionLoaded="onQuestionLoaded(question)"
      />
    </div>
    <div v-else>
      <div
        v-if="mode === 'questionsNoAnswer'"
        class="questionsNoAnswer-mode">
        <pdf-page v-for="(pageQuestions, pageIndex) in pageChunks"
                  :key="pageIndex"
                  :title="exam.title"
                  :grade="exam.gradeTitle"
                  :major="exam.majorTitle"
                  :page="pdfConfig.paginateExists ? (pageIndex+pdfConfig.paginateStart).toString(): ''"
                  :paddingRight="parseInt(pdfConfig.rightMargin)+35"
                  :paddingLeft="parseInt(pdfConfig.leftMargin)+35"
        >
          <template v-slot:body>
            <div v-for="(pageQuestion, pageQuestionIndex) in pageQuestions"
                 :key="'chunk-index-'+pageQuestionIndex"
            >
              <pdf-question-field v-if="pageQuestion"
                                  :question="pageQuestion"
                                  :order="pageQuestion.order"
                                  :style="{marginBottom: parseInt(pdfConfig.spaceBetweenQuestion)+'px'}"
                                  display-choices
                                  display-statement
                                  :display-descriptive-answer="false"
              />
            </div>
          </template>
        </pdf-page>
        <div class="page-break"></div>
      </div>
      <div
        v-if="mode === 'onlyDescriptiveAnswers'"
        class="onlyDescriptiveAnswers-mode">
        <pdf-page v-for="(pageQuestions, pageIndex) in pageChunks"
                  :key="pageIndex"
                  :title="exam.title"
                  :grade="exam.gradeTitle"
                  :major="exam.majorTitle"
                  :page="(pageIndex+pdfConfig.paginateStart).toString()"
        >
          <template v-slot:body>
            <div v-for="(pageQuestion, pageQuestionIndex) in pageQuestions"
                 :key="'chunk-index-'+pageQuestionIndex"
            >
              <pdf-question-field v-if="pageQuestion"
                                  :question="pageQuestion"
                                  :order="pageQuestion.order"
                                  :display-choices="false"
                                  :display-statement="false"
                                  display-descriptive-answer
              />
            </div>
          </template>
        </pdf-page>
        <div class="page-break"></div>
      </div>
    </div>
  </div>
</template>

<script>
// /onlyDescriptiveAnswers
import PdfPage from './PDFPage.vue'
import PdfQuestionField from 'src/components/Utils/PDF/PdfQuestionField.vue'
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion } from 'src/mixin/Mixins.js'
// import QuestionField from 'components/Question/QuestionPage/QuestionField'
export default {
  name: 'PDFContainer',
  components: { PdfQuestionField, PdfPage },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion],
  props: {
    pdfConfig: {
      type: Object,
      default () {
        return {
          paginateExists: true,
          paginateStart: 1,
          spaceBetweenQuestion: 1,
          rightMargin: 1,
          leftMargin: 1
        }
      }
    },
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
    },
    mode: {
      type: String,
      default () {
        return 'questionsNoAnswer'
      }
    }
  },
  emits: ['loaded'],
  data () {
    return {
      pageChunks: [],
      pageSize: {
        w: 724,
        h: 880
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
  mounted() {
    if (this.allQuestionLoaded) {
      this.calcQuestionsHeight()
    }
  },
  methods: {
    calcQuestionsHeight () {
      this.pageChunks = []
      this.questions.forEach(question => {
        question.loaded = false
      })
    },
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
      this.$nextTick(() => {
        this.$emit('loaded', this.pageChunks)
      })
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
