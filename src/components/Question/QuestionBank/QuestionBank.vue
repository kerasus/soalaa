<template>
  <div class="main-container">
    <div class="row">
      <div class="col-12 question-bank-header">
        <QuestionBankHeader/>
      </div>
      <div class="col-3 question-bank-filter">
        <QuestionBankFilter/>
      </div>
      <div class="col-9">
        <div class="question-bank-toolbar">
          <QuestionBankToolBar/>
        </div>
        <div class="question-bank-content">
          <QuestionBankContent/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionBankHeader from './components/QuestionBankHeader'
import QuestionBankToolBar from './components/QuestionBankToolBar'
import QuestionBankFilter from './components/QuestionBankFilter'
import QuestionBankContent from './components/QuestionBankContent'

export default {
  name: 'QuestionBank',
  components: { QuestionBankHeader, QuestionBankToolBar, QuestionBankFilter, QuestionBankContent }
}
</script>

<style scoped>

  .UI-shadow {
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 20px;
  }

  .main-container {
    padding: 0 100px 0 100px;
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
</style>
