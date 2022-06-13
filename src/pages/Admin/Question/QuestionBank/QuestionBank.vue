<template>
  <div class="main-container">
    <div class="row">
      <div ref="header" class="col-12 question-bank-header">
        <QuestionBankHeader/>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 question-bank-filter">
        <QuestionFilter
          ref="filter"
          @delete-filter="deleteFilterItem"
          :filterQuestions = filterQuestions
        />
      </div>
      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <div class="question-bank-toolbar">
          <QuestionToolBar
            :selectedQuestions="selectedQuestions"
            @remove="RemoveChoice"
            :key="questionListKey"
          />
        </div>
        <div class="question-bank-content">
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
  watch: {
    selectedQuestions: function () {
      this.onClickedCheckQuestionBtn()
    }
  },
  created () {
    this.getQuestionData()
    this.getFilterOptions()
  },
  methods: {
    RemoveChoice (title) {
      const target = this.selectedQuestions.filter(question => question.tags.list.find(tag => tag.type === 'lesson' && tag.title === title))
      console.log(target)
      if (target.length) {
        target.forEach(question => {
          question.selected = !question.selected
          this.selectedQuestions.splice(question.index - 1, 1)
          this.questionListKey = Date.now()
        })
      }
    },
    toggleQuestionSelected (question) {
      question.selected = !question.selected
    },
    handleName (question) {
      if (question.selected) {
        this.addQuestionToSelectedList(question)
      } else {
        this.deleteQuestionFromSelectedList(question)
      }
    },
    onClickedCheckQuestionBtn (question) {
      this.toggleQuestionSelected(question)
      this.handleName(question)
    },
    addQuestionToSelectedList (question) {
      this.selectedQuestions.push(question)
      this.questionListKey = Date.now()
    },
    deleteQuestionFromSelectedList (question) {
      const target = this.selectedQuestions.findIndex(questionItem => questionItem.id === question.id)
      if (target === -1) {
        return
      }
      this.selectedQuestions.splice(target, 1)
      this.questionListKey = Date.now()
    },
    updatePage (page) {
      this.getQuestionData(page)
    },
    deleteFilterItem (filter) {
      console.log('Filter Deleted !!!', filter.id)
      this.$refs.filter.setTicked('tree', filter.id, false)
    },
    getFilters () {
      if (!this.$refs.filter) {
        return null
      }
      const filters = this.$refs.filter.getFilters()

      return {
        tags: filters.tags.map(tag => tag.id)
      }
    },
    getQuestionData (page) {
      if (!page) {
        page = 1
      }
      this.loadingQuestion.loading = true
      this.questions.loading = true
      this.$axios.get(API_ADDRESS.question.index(this.getFilters(), page))
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
    }
  }
}
</script>

<style>

.main-container {
  padding: 0 100px 0 96px;
}

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
