<template>
  <div class="col-md-5 right-side">
    <div v-if="pageChunks.length === 0"
         :style="{ width: pageSize.w + 'mm', paddingRight:parseInt(pdfConfig.rightMargin)+'mm', paddingLeft: parseInt(pdfConfig.leftMargin)+'mm' }"
         class="prepare-question-section"
    >
      <pdf-question-field v-for="question in questions"
                          :key="'question-item-'+question.id"
                          v-model:height="question.height"
                          :style="{paddingBottom: parseInt(pdfConfig.spaceBetweenQuestion)+'mm'}"
                          :question="question"
                          :order="question.order"
                          :display-choices="mode === 'questionsNoAnswer'"
                          :display-statement="mode === 'questionsNoAnswer'"
                          :display-descriptive-answer="mode === 'onlyDescriptiveAnswers'"
                          :questionAndChoices="pdfConfig.questionAndChoices"
                          :betweenChoices="pdfConfig.betweenChoices"
                          @questionLoaded="onQuestionLoaded(question)"
                          @update:height="updateQuestionHeight($event, question)"
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
                  :page="(pageIndex+parseInt(pdfConfig.paginateStart)).toString()"
                  :paddingRight="parseInt(pdfConfig.rightMargin)+9"
                  :paddingLeft="parseInt(pdfConfig.leftMargin)+9"
                  :pdf-config="pdfConfig"
        >
          <template v-slot:body>
            <div v-for="(pageQuestion, pageQuestionIndex) in pageQuestions"
                 :key="'chunk-index-'+pageQuestionIndex"
            >
              <pdf-question-field v-if="pageQuestion"
                                  :question="pageQuestion"
                                  :order="pageQuestion.order"
                                  :style="{paddingBottom: parseInt(pdfConfig.spaceBetweenQuestion)+'mm'}"
                                  :questionAndChoices="pdfConfig.questionAndChoices"
                                  :betweenChoices="pdfConfig.betweenChoices"
                                  display-choices
                                  display-statement
                                  :display-descriptive-answer="false"
                                  @update:height="updateQuestionHeight($event, pageQuestion, pageQuestions.length === pageQuestionIndex + 1)"
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
                  :page="(pageIndex+parseInt(pdfConfig.paginateStart)).toString()"
                  :paddingRight="parseInt(pdfConfig.rightMargin)+9"
                  :paddingLeft="parseInt(pdfConfig.leftMargin)+9"
                  :pdf-config="pdfConfig"
        >
          <template v-slot:body>
            <div v-for="(pageQuestion, pageQuestionIndex) in pageQuestions"
                 :key="'chunk-index-'+pageQuestionIndex"
            >
              <pdf-question-field v-if="pageQuestion"
                                  :question="pageQuestion"
                                  :order="pageQuestion.order"
                                  :style="{paddingBottom: parseInt(pdfConfig.spaceBetweenQuestion)+'mm'}"
                                  :display-choices="false"
                                  :display-statement="false"
                                  :questionAndChoices="pdfConfig.questionAndChoices"
                                  :betweenChoices="pdfConfig.betweenChoices"
                                  display-descriptive-answer
              />
            </div>
          </template>
        </pdf-page>
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
          hasTitle: true,
          hasMajor: true,
          hasGrade: true,
          hasPaginate: true,
          paginateStart: 1,
          spaceBetweenQuestion: 5,
          rightMargin: 5,
          leftMargin: 5,
          questionAndChoices: 5,
          betweenChoices: 5
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
      loading: false,
      pageChunks: [],
      pageSize: {
        w: 724,
        h: 880
      },
      questionLoadFlag: false
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
    this.loading = true
    if (this.allQuestionLoaded) {
      this.calcQuestionsHeight()
    }
    this.loading = false
  },
  methods: {
    calcQuestionsHeight () {
      this.pageChunks = []
      this.questions.forEach(question => {
        question.loaded = false
      })
      this.loading = false
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
          if (pageQuestions.length > 0) {
            pages.push(pageQuestions)
          }
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
    },
    updateQuestionHeight(event, question, lastIndex) {
      question.height = event
      if (lastIndex) {
        this.createPageChunks(this.pageSize.h)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.prepare-question-section {
  margin: auto;
}
.loading {
  width: 100%;
  z-index: 9999;
  .pdf-skeleton {
    border-radius: 15px;
  }
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
