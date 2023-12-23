<template>
  <div class="col-md-5 right-side">
    <div v-if="pageChunks.length === 0"
         :key="prepareQuestionSection"
         class="prepare-question-section"
         :style="{ width: pageSize.w + 'px', paddingRight:parseInt(pdfConfig.rightMargin)+'mm', paddingLeft: parseInt(pdfConfig.leftMargin)+'mm' }">
      <!--      :style="{ width: pageSize.w + 'mm', paddingRight:parseInt(pdfConfig.rightMargin)+'mm', paddingLeft: parseInt(pdfConfig.leftMargin)+'mm' }"-->
      <pdf-question-field v-for="(question, questionIndex) in localQuestions"
                          :key="'question-item-'+question.id"
                          v-model:height="question.height"
                          :style="{paddingBottom: parseInt(pdfConfig.spaceBetweenQuestion)+'mm'}"
                          :question="localQuestions[questionIndex]"
                          :order="localQuestions[questionIndex].order"
                          :display-choices="mode === 'questionsNoAnswer'"
                          :display-statement="mode === 'questionsNoAnswer'"
                          :display-descriptive-answer="mode === 'onlyDescriptiveAnswers'"
                          :questionAndChoices="pdfConfig.questionAndChoices"
                          :betweenChoices="pdfConfig.betweenChoices"
                          @questionLoaded="onQuestionLoaded(localQuestions[questionIndex])"
                          @update:height="updateQuestionHeight($event, localQuestions[questionIndex])" />
    </div>
    <div v-else>
      <div v-if="mode === 'questionsNoAnswer'"
           class="questionsNoAnswer-mode">
        <pdf-page v-for="(pageQuestions, pageIndex) in pageChunks"
                  :key="pageIndex"
                  :ref="'pafPage' + pageIndex"
                  :is3a="is3a"
                  :title="exam.title"
                  :grade="exam.gradeTitle"
                  :major="exam.majorTitle"
                  :page="(pageIndex+parseInt(pdfConfig.paginateStart)).toString()"
                  :paddingRight="parseInt(pdfConfig.rightMargin)+9"
                  :paddingLeft="parseInt(pdfConfig.leftMargin)+9"
                  :pdf-config="pdfConfig">
          <template v-slot:body>
            <div v-for="(pageQuestion, pageQuestionIndex) in pageQuestions"
                 :key="'chunk-index-'+pageQuestionIndex">
              <pdf-question-field v-if="pageQuestion"
                                  :question="pageQuestion"
                                  :order="pageQuestion.order"
                                  :style="{paddingBottom: parseInt(pdfConfig.spaceBetweenQuestion)+'mm'}"
                                  :questionAndChoices="pdfConfig.questionAndChoices"
                                  :betweenChoices="pdfConfig.betweenChoices"
                                  :showLevel="pdfConfig.hasLevelAnswer"
                                  :showReference="pdfConfig.hasReferenceQuestion"
                                  :showYear="pdfConfig.hasYearQuestion"
                                  display-choices
                                  display-statement
                                  :display-descriptive-answer="false"
                                  @update:height="updateQuestionHeight($event, pageQuestion)" />
            </div>
          </template>
        </pdf-page>
        <div class="page-break" />
      </div>
      <div v-if="mode === 'onlyDescriptiveAnswers'"
           class="onlyDescriptiveAnswers-mode">
        <pdf-page v-for="(pageQuestions, pageIndex) in pageChunks"
                  :key="pageIndex"
                  :ref="'pafPage' + pageIndex"
                  :is3a="is3a"
                  :title="exam.title"
                  :grade="exam.gradeTitle"
                  :major="exam.majorTitle"
                  :page="(pageIndex+parseInt(pdfConfig.paginateStart)).toString()"
                  :paddingRight="parseInt(pdfConfig.rightMargin)+9"
                  :paddingLeft="parseInt(pdfConfig.leftMargin)+9"
                  :pdf-config="pdfConfig">
          <template v-slot:body>
            <div v-for="(pageQuestion, pageQuestionIndex) in pageQuestions"
                 :key="'chunk-index-'+pageQuestionIndex">
              <pdf-question-field v-if="pageQuestion"
                                  :question="pageQuestion"
                                  :order="pageQuestion.order"
                                  :style="{paddingBottom: parseInt(pdfConfig.spaceBetweenQuestion)+'mm'}"
                                  :display-choices="false"
                                  :display-statement="false"
                                  :questionAndChoices="pdfConfig.questionAndChoices"
                                  :betweenChoices="pdfConfig.betweenChoices"
                                  :showLevel="pdfConfig.hasLevelAnswer"
                                  :showReference="pdfConfig.hasReferenceAnswer"
                                  :showYear="pdfConfig.hasYearAnswer"
                                  display-descriptive-answer
                                  @update:height="updateQuestionHeight($event, pageQuestion)" />
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
import { Question } from 'src/models/Question'
// import QuestionField from 'components/Question/QuestionPage/QuestionField'

export default {
  name: 'PDFContainer',
  components: {
    PdfQuestionField,
    PdfPage
  },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion],
  props: {
    pdfConfig: {
      type: Object,
      default() {
        return {
          hasTitle: true,
          hasMajor: true,
          hasGrade: true,
          hasPaginate: true,
          hasLevelQuestion: true,
          hasLevelAnswer: true,
          hasReferenceQuestion: true,
          hasReferenceAnswer: true,
          hasYearQuestion: true,
          hasYearAnswer: true,
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
      default() {
        return {
          title: '',
          gradeTitle: 'دوازدهم',
          majorTitle: 'ریاضی',
          n_questions: 0
        }
      }
    },
    pages: {
      type: Array,
      default() {
        return []
      }
    },
    questions: {
      type: Array,
      default() {
        return []
      }
    },
    mode: {
      type: String,
      default() {
        return 'questionsNoAnswer'
      }
    },
    is3a: {
      type: Boolean,
      default: false
    }
  },
  emits: ['loaded', 'update:pages'],
  data () {
    return {
      loading: false,
      extraAnswer: [],
      extraHeight: 0,
      prepareQuestionSection: Date.now(),
      localQuestions: [],
      pageChunks: [],
      Key: Date.now(),
      pageSize: {
        w: 720,
        h: 880
      },
      questionLoadFlag: false
    }
  },
  computed: {
    allQuestionHeightCalculated() {
      const hasNotHeight = this.localQuestions.find(question => !question.height)
      return !hasNotHeight
    },
    allQuestionLoaded() {
      const notLoaded = this.localQuestions.find(question => !question.loaded)
      return !notLoaded
    }
  },
  watch: {
    allQuestionLoaded(newValue) {
      if (!newValue) {
        return
      }
      if (!this.allQuestionHeightCalculated) {
        return
      }
      this.createPageChunks(this.pageSize.h)
    },
    allQuestionHeightCalculated(newValue) {
      if (!newValue) {
        return
      }
      this.$nextTick(() => {
        // this.createPageChunks(this.pageSize.h)
      })
    }
  },
  beforeMount() {
    this.pageChunks = []
    this.localQuestions.forEach(question => {
      question.loaded = false
    })
  },
  mounted() {
    this.loading = true
    this.localQuestions = JSON.parse(JSON.stringify(this.questions))
    if (this.allQuestionLoaded) {
      this.$nextTick(() => {
        this.createPageChunks(this.pageSize.h)
        this.loading = false
      })
    } else {
      this.$nextTick(() => {
        this.prepareQuestionSection = Date.now()
      })
    }
  },
  methods: {
    createPageChunks(pageHeight) {
      let sumHeight = 0
      let pageQuestions = []
      const pages = []
      this.localQuestions.forEach((question, questionIndex) => {
        const lastQuestion = new Question(question)
        if (pageHeight >= (sumHeight + question.height)) {
          sumHeight += question.height
          pageQuestions.push(question)
        } else {
          if (pageQuestions.length > 0) {
            lastQuestion.height = question.height
            pages.push(pageQuestions)
            pageQuestions = []
          } else if (this.mode === 'onlyDescriptiveAnswers') {
            lastQuestion.isExternalAnswer = true
            lastQuestion.chunk = []
            lastQuestion.height = 0
            lastQuestion.descriptive_answer = ''
            const finalIndex = this.findFinalIndex(pageHeight - sumHeight, question)
            let newAnswer = ''
            question.chunk.forEach((item, index) => {
              if (index < finalIndex) {
                newAnswer += item.answer
              } else {
                question.height -= Number(item.height)
                lastQuestion.chunk.push(item)
                lastQuestion.height += Number(item.height)
                lastQuestion.descriptive_answer += item.answer
              }
            })
            question.chunk.slice(0, finalIndex)
            question.descriptive_answer = newAnswer
            pageQuestions.push(question)
            pages.push(pageQuestions)
          }
          pageQuestions = []
          sumHeight = 0
          sumHeight += lastQuestion.height
          pageQuestions.push(lastQuestion)
        }
      })
      if (pageQuestions.length > 0) {
        pages.push(pageQuestions)
        sumHeight = 0
        pageQuestions = []
      }

      this.pageChunks = pages
      this.$nextTick(() => {
        this.updatePages(this.pageChunks)
        this.$emit('loaded', this.pageChunks)
      })
    },
    findFinalIndex (remainHeight, question) {
      let lastIndex = 0
      question.chunk.forEach((item, index) => {
        remainHeight -= item.height
        if (remainHeight > 0) {
          lastIndex = index
        }
      })
      return lastIndex
    },
    updatePages (pageChunks) {
      const pagesArray = []
      pageChunks.forEach((page, pageIndex) => {
        pagesArray.push(this.$refs['pafPage' + pageIndex][0].$el)
      })
      this.$emit('update:pages', pagesArray)
    },
    onQuestionLoaded (question) {
      question.loaded = true
    },
    updateQuestionHeight(event, question, lastIndex) {
      question.height = event.event1
      if (this.mode === 'onlyDescriptiveAnswers') {
        question.descriptive_answer.match(/<p[^>]*>.*?<\/p>/gs).forEach((answer, index) => {
          if (!question.chunk) {
            question.chunk = []
          }
          question.chunk.push({ answer, height: event.event2.getElementsByTagName('p')[index].dataset.elementHeight })
        })
      }
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
