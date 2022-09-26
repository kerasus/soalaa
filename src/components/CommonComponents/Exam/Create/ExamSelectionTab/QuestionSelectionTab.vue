<template>
  <div class="row main-container">
    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 question-bank-filter">
      <question-filter
        ref="filter"
        :filterQuestions="filterQuestions"
        @onFilter="onFilter"
        @delete-filter="deleteFilterItem"
      />
    </div>

    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
      <div class="question-list">
        <div class="question-bank-toolbar">
          <questions-general-info
            :key="questionListKey"
            :check-box="checkBox"
            :selectedQuestions="selectedQuestions"
            @remove="RemoveChoice"
            @nextTab="goToNextStep"
            @lastTab="goToLastStep"
            @deleteAllQuestions="deleteAllQuestions"
            @selectAllQuestions="selectAllQuestions"
          />
        </div>

        <div class="question-bank-content">
          <question-item
            v-if="questions.loading"
            :question="loadingQuestion"
          />
          <template v-else>
            <question-item
              v-for="question in questions.list"
              :key="question.id"
              :question="question"
              :report-options="reportTypeList"
              pageStrategy="question-bank"
              @checkSelect="onClickedCheckQuestionBtn"
            />
          </template>
        </div>

        <div class="pagination">
          <pagination
            :meta="paginationMeta"
            :disable="disablePagination"
            @updateCurrentPage="updatePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from 'components/Question/QuestionBank/Pagination'
import API_ADDRESS from 'src/api/Addresses'
import { Exam } from 'src/models/Exam'
import { Question, QuestionList } from 'src/models/Question'
import QuestionItem from 'components/CommonComponents/Exam/Create/QuestionTemplate/QuestionItem.vue'
import QuestionFilter from 'components/Question/QuestionBank/QuestionFilter'
import QuestionsGeneralInfo from 'components/CommonComponents/Exam/Create/ExamSelectionTab/QuestionsGeneralInfo'

export default {
  name: 'QuestionSelectionTab',
  components: { QuestionsGeneralInfo, QuestionFilter, QuestionItem, pagination },

  props: {},

  data () {
    return {
      filterData: null,
      checkBox: false,
      filterQuestions: {
        major_type: [],
        reference_type: [],
        year_type: [],
        levels: [
          {
            id: '1',
            value: 'آسان'
          },
          {
            id: '2',
            value: 'متوسط'
          },
          {
            id: '3',
            value: 'سخت'
          }
        ]
      },
      questionListKey: Date.now(),
      selectedQuestions: [],
      questionId: [],
      loadingQuestion: new Question(),
      questions: new QuestionList(),
      disablePagination: false,
      paginationMeta: {
        current_page: 1,
        from: 0,
        last_page: 1,
        links: [],
        path: '',
        per_page: 0,
        to: 0,
        total: 0
      },
      reportTypeList: []
    }
  },
  inject: {
    exam: {
      from: 'providedExam',
      default: new Exam()
    }
  },
  watch: {
    'selectedQuestions.length': {
      handler (newValue, oldValue) {
        this.exam.questions.list = []
        this.exam.questions.list = this.selectedQuestions
        this.questionListKey = Date.now()
      }
    }
  },
  created () {
    this.getQuestionData()
    this.getFilterOptions()
    this.getReportOptions()
  },
  emits: ['onFilter'],
  methods: {
    getReportOptions() {
      this.$axios.get(API_ADDRESS.exam.user.reportType)
        .then((response) => {
          this.reportTypeList = response.data.data
          // console.log(this.reportTypeList)
        })
    },
    goToLastStep () {
      this.$emit('lastTab')
    },
    goToNextStep () {
      this.$emit('nextTab')
    },
    onFilter (filterData) {
      this.$emit('onFilter', filterData)
      this.filterData = this.getFiltersForRequest(filterData)
      this.getQuestionData(1, this.filterData)
    },
    RemoveChoice (title) {
      const target = this.selectedQuestions.filter(question => question.tags.list.find(tag => tag.type === 'lesson' && tag.title === title))
      if (target.length) {
        target.forEach(question => {
          question.selected = !question.selected
          this.selectedQuestions.splice(question.index - 1, 1)
          this.deleteQuestionFromExam(question)
          this.questionListKey = Date.now()
        })
      }
    },
    toggleQuestionSelected (question) {
      question.selected = !question.selected
    },
    questionHandle (question) {
      if (question.selected) {
        this.addQuestionToSelectedList(question)
        // this.addQuestionToExam(question)
      } else {
        this.deleteQuestionFromSelectedList(question)
        // this.deleteQuestionFromExam(question)
      }
    },
    onClickedCheckQuestionBtn (question) {
      this.toggleQuestionSelected(question)
      this.questionHandle(question)
    },
    addQuestionToExam (question) {
      this.$emit('addQuestionToExam', question)
      this.questionListKey = Date.now()
    },
    deleteQuestionFromExam (question) {
      this.$emit('deleteQuestionFromExam', question)
      this.questionListKey = Date.now()
    },
    addQuestionToSelectedList (question) {
      this.selectedQuestions.push(question)
      if (this.selectedQuestions.length === this.questions.list.length) {
        this.checkBox = true
      } else this.checkBox = 'maybe'
      this.questionListKey = Date.now()
    },
    deleteQuestionFromSelectedList (question) {
      if (this.checkBox) {
        this.checkBox = false
      }
      const target = this.selectedQuestions.findIndex(questionItem => questionItem.id === question.id)
      if (target === -1) {
        return
      }
      this.selectedQuestions.splice(target, 1)
      this.deleteQuestionFromExam(question)
      this.questionListKey = Date.now()
    },
    updatePage (page) {
      this.getQuestionData(page, this.filterData)
    },
    deleteFilterItem (filter) {
      // this.$refs.filter.setTicked('tree', filter.id, false)
    },
    getFiltersForRequest (filterData) {
      return {
        tags: (filterData.tags) ? filterData.tags.map(item => item.id) : [],
        level: (filterData.level) ? filterData.level.map(item => item.id) : [],
        years: (filterData.years) ? filterData.years.map(item => item.id) : [],
        majors: (filterData.majors) ? filterData.majors.map(item => item.id) : [],
        reference: (filterData.reference) ? filterData.reference.map(item => item.id) : []
      }
    },
    getQuestionData (page, filters) {
      if (!page) {
        page = 1
      }
      this.loadingQuestion.loading = true
      this.questions.loading = true
      this.$axios.get(API_ADDRESS.question.index(filters, page))
        .then((response) => {
          this.questions = new QuestionList(response.data.data)
          this.paginationMeta = response.data.meta
          this.loadingQuestion.loading = false
          this.questions.loading = false
        })
        .catch(function (error) {
          console.error(error)
          this.loadingQuestion.loading = false
          this.questions.loading = false
        })
    },
    getFilterOptions () {
      this.$axios.get(API_ADDRESS.option.base)
        .then((response) => {
          response.data.data.forEach(option => {
            if (option.type === 'reference_type') {
              this.filterQuestions.reference_type.push(option)
            } else if (option.type === 'year_type') {
              this.filterQuestions.year_type.push(option)
            } else if (option.type === 'major_type') {
              this.filterQuestions.major_type.push(option)
            }
          })
        })
    },
    selectAllQuestions () {
      this.checkBox = !this.checkBox
      if (this.selectedQuestions.length) {
        this.questions.list.forEach(question => {
          question.selected = false
          this.selectedQuestions.splice(question)
        })
      }
      if (this.checkBox) {
        this.questions.list.forEach(question => {
          question.selected = true
          this.selectedQuestions.push(question)
        })
      } else {
        this.questions.list.forEach(question => {
          question.selected = false
          this.selectedQuestions.splice(question)
        })
      }
    },
    deleteAllQuestions () {
      if (this.checkBox) {
        this.checkBox = false
      }
      this.questions.list.forEach(question => {
        question.selected = false
        this.selectedQuestions.splice(question)
      })
    }
  }
}

</script>

<style lang="scss" scoped>

.q-checkbox__bg {
  border: 1px solid #65677F;
  box-sizing: border-box;
  border-radius: 5px;
}

.main-container {
  .question-bank-filter {}

  .question-list {
    margin-left: 30px;

    @media only screen and (max-width: 1023px) {
      margin-left: 0;
    }
    .question-bank-toolbar {
      padding-bottom: 24px;
    }

    .question-bank-content {
      margin-bottom: 16px;

      :deep(.question-card) {
        margin-bottom: 16px;
      }
    }
  }

}
@media only screen and (max-width: 1919px) {
}
@media only screen and (max-width: 1439px) {
  .question-bank-toolbar {
    padding-bottom: 20px;
  }
}
@media only screen and (max-width: 1023px) {
}
@media only screen and (max-width: 599px) {
}
</style>
