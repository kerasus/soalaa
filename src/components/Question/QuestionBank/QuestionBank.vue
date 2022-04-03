<template>
  <div class="main-container">
    <div class="row">
      <div class="col-12 question-bank-header">
        <QuestionBankHeader/>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 question-bank-filter">
        <QuestionBankFilter/>
      </div>
      <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
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
    padding-right: 20px;
  }

  .question-bank-toolbar {
    padding-bottom: 24px;
  }
  @media only screen and (max-width: 1919px) {
    .main-container {
      padding-left: 0;
      padding-right: 30px;
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
