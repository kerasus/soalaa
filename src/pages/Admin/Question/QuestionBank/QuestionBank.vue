<template>
  <div class="main-container">
    <div class="row">
      <div class="col-12 question-bank-header">
        <QuestionBankHeader/>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 question-bank-filter">
        <QuestionFilter/>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <div class="question-bank-toolbar">
          <QuestionToolBar/>
        </div>
        <div class="question-bank-content">
          <question-item v-if="questions.loading" :question="loadingQuestion"/>
          <template v-else>
            <question-item v-for="question in questions.list" :key="question.id" :question="question"/>
          </template>
        </div>
        <div class="pageInation">
          <page-ination :meta="paginationMeta"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionBankHeader from 'components/Question/QuestionBank/components/QuestionBankHeader'
import QuestionToolBar from 'components/Question/QuestionBank/QuestionToolBar'
import QuestionFilter from 'components/Question/QuestionBank/QuestionFilter'
import QuestionItem from 'components/Question/QuestionBank/QuestionItem'
import PageInation from 'components/Question/QuestionBank/PageInation'
import { Question, QuestionList } from 'src/models/Question'
import axios from 'axios'

export default {
  name: 'QuestionBank',
  components: { QuestionBankHeader, QuestionToolBar, QuestionFilter, QuestionItem, PageInation },
  data () {
    return {
      loadingQuestion: new Question(),
      questions: new QuestionList(),
      paginationMeta: null
    }
  },
  created () {
    this.loadingQuestion.loading = true
    this.questions.loading = true
    this.getQuestionData()
  },
  methods: {
    getQuestionData () {
      const that = this
      axios.get('https://office.alaatv.com:800/api/v1/question/search-monta')
        .then(function (response) {
          that.paginationMeta = response.data.meta
          that.questions = new QuestionList(response.data.data)
          console.log(that.questions)
          that.questions.loading = false
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>

.theme-v1-box-shadow {
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 20px;
}

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
