<template>
  <div class="main-container">
    <div class="row">
      <div ref="header" class="col-12 question-bank-header">
        <QuestionBankHeader/>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 question-bank-filter">
        <question-filter
          ref="filter"
          @onFilter="onFilter"
          @delete-filter="deleteFilterItem"
          :filterQuestions="filterQuestions"
        />
      </div>
      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <div class="question-bank-toolbar">
          <QuestionToolBar
            :check-box="checkBox"
            :selectedQuestions="selectedQuestions"
            @remove="RemoveChoice"
            @deleteAllQuestions="deleteAllQuestions"
            @selectAllQuestions="selectAllQuestions"
            :key="questionListKey"
          />
        </div>
        <div class="question-bank-content">
<!--          <question-item />-->
          <question-item v-if="questions.loading" :question="loadingQuestion" />
          <template v-else>
            <question-item
              v-for="question in questions.list"
              :key="question.id"
              :question="question"
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
import API_ADDRESS from 'src/api/Addresses'
import { Exam } from 'src/models/Exam'
import { Question, QuestionList } from 'src/models/Question'
import pagination from 'components/Question/QuestionBank/Pagination'
import QuestionItem from 'components/Question/QuestionItem/QuestionItem'
import QuestionFilter from 'components/Question/QuestionBank/QuestionFilter'
import QuestionToolBar from 'components/Question/QuestionBank/QuestionToolBar'
import QuestionBankHeader from 'components/Question/QuestionBank/components/QuestionBankHeader'

export default {
  name: 'QuestionBank',
  components: { QuestionBankHeader, QuestionToolBar, QuestionFilter, QuestionItem, pagination },
  data () {
    return {
      checkBox: false,
      filterQuestions: {
        major_type: [],
        reference_type: [],
        year_type: []
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
      }
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
  },
  emits: ['onFilter'],
  methods: {
    onFilter (filterData) {
      this.$emit('onFilter', filterData)
      const filters = this.getFiltersForRequest(filterData)
      this.getQuestionData(1, filters)
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
      this.getQuestionData(page)
    },
    deleteFilterItem (filter) {
      // this.$refs.filter.setTicked('tree', filter.id, false)
    },
    getFiltersForRequest (filterData) {
      return {
        tags: (filterData.tags) ? filterData.tags.map(item => item.id) : [],
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
          console.log(error)
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
        .catch(function (error) {
          console.log(error)
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

<style>

.q-checkbox__bg {
  border: 1px solid #65677F;
  box-sizing: border-box;
  border-radius: 5px;
}

.question-bank-header {
  padding-bottom: 30px;
}

.question-bank-filter {
  padding-right: 24px;
}

.question-bank-toolbar {
  padding-bottom: 24px;
}

.question-bank-content {
  margin-bottom: 16px;
}
@media only screen and (max-width: 1919px) {
  .main-container {
    padding-left: 0;
    padding-right: 24px;
  }
  .question-bank-filter {
    padding-right: 20px;
  }
}
@media only screen and (max-width: 1439px) {
  .main-container {
    padding-left: 30px;
  }
  .question-bank-header {
    padding-bottom: 20px;
  }

  .question-bank-filter {
    padding-right: 20px;
  }

  .question-bank-toolbar {
    padding-bottom: 20px;
  }
}
@media only screen and (max-width: 1023px) {
  .question-bank-filter {
    padding-right: 0px;
  }
}
@media only screen and (max-width: 599px) {
  .question-bank-toolbar {
    padding-bottom: 0;
  }
}
</style>
