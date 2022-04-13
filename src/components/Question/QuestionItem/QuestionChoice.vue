<template>
  <div class="choice-box">
    <div
      name="question-choice-number"
      class="question-choice-number"
      :class="questionData.answer ? 'correct-answer' : 'wrong-answer'"
    >
      {{ questionData.order }}
    </div>
    <div name="answer-text" class="answer-text">
      <vue-katex :input="questionData.title"/>
    </div>
  </div>

</template>

<script>
import VueKatex from 'components/VueKatex'

export default {
  components: {
    VueKatex
  },
  name: 'QuestionChoice',
  props: {
    questionData: {
      types: '',
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.choice-box{
  display: flex;
  align-items: flex-start;
  .answer-text{
  }
  .question-choice-number {
    margin-right: 10px;
    margin-top: 3px;
    border-radius: 50%;
    text-align: center;
    color: #ffffff;
    min-width: 20px;
    height: 20px;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  }
  .correct-answer {
    background: #4CAF50;
  }
  .wrong-answer {
    background: #9690E4;
  }
}

</style>
