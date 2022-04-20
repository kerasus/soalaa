<template>
  <div class="main-container">
    <div class="row">
      <div ref="header" class="col-12 question-bank-header">
        <QuestionBankHeader/>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 question-bank-filter">
        <QuestionFilter ref="filter" @delete-filter="deleteFilterItem"/>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <div class="question-bank-toolbar">
          <QuestionToolBar
            @RemoveChoose="RemoveChoose"
          />
        </div>
        <div class="question-bank-content">
          <question-item v-if="questions.loading" :question="loadingQuestion" />
          <template v-else>
            <question-item
              v-for="question in questions.list"
              :key="question.id"
              :question="question"
              :isSelected="isSelected(question.id)"
              @checkSelect="QuestionDecreaseIncrease"
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
import QuestionBankHeader from 'components/Question/QuestionBank/components/QuestionBankHeader'
import QuestionToolBar from 'components/Question/QuestionBank/QuestionToolBar'
import QuestionFilter from 'components/Question/QuestionBank/QuestionFilter'
import QuestionItem from 'components/Question/QuestionItem/QuestionItem'
import pagination from 'components/Question/QuestionBank/Pagination'
import { Question, QuestionList } from 'src/models/Question'

export default {
  name: 'QuestionBank',
  components: { QuestionBankHeader, QuestionToolBar, QuestionFilter, QuestionItem, pagination },
  data () {
    return {
      selectedQuestions: [],
      test: false,
      questionId: [],
      loadingQuestion: new Question(),
      questions: new QuestionList(),
      disablePagination: false,
      filterQuestions: {
        majorId: null,
        levelId: null,
        gradeId: null,
        moduleGroupId: null,
        majorGroupId: null,
        moduleId: null,
        originId: null,
        publishYearId: null,
        difficultyLevelId: null
      },
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
  created () {
    this.getQuestionData()
  },
  methods: {
    RemoveChoose (subcategoryId) {
      console.log(subcategoryId)
      return subcategoryId
    },
    isSelected (questionId) {
      const target = this.selectedQuestions.find(question => question.id === questionId)
      return !!target
    },
    QuestionDecreaseIncrease (selected, question) {
      if (selected) {
        this.addQuestionToSelectedList(question)
      } else {
        this.deleteQuestionFromSelectedList(question)
      }
    },
    addQuestionToSelectedList (question) {
      this.selectedQuestions.push(question)
    },
    deleteQuestionFromSelectedList (question) {
      const target = this.selectedQuestions.findIndex(questionItem => questionItem.id === question.id)
      if (target === -1) {
        return
      }
      this.selectedQuestions.splice(target, 1)
    },
    updatePage (page) {
      this.getQuestionData(page)
    },
    deleteFilterItem (filter) {
      console.log('Filter Deleted !!!', filter.id)
      this.$refs.filter.setTicked('tree', filter.id, false)
    },
    getQuestionData (page) {
      if (!page) {
        page = 1
      }
      this.loadingQuestion.loading = true
      this.questions.loading = true
      this.$axios.get(API_ADDRESS.question.index([], page))
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
    padding-right: 0;
  }
}
</style>
