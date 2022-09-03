<template>
  <div class="choice-box">
    <div
      name="question-choice-number"
      class="question-choice-number"
      :class="choice.answer ? 'correct-answer' : 'wrong-answer'"
    >
      {{ choice.number }}
    </div>
    <div name="answer-text"
         class="answer-text">
      <vue-katex :input="choice.title" />
    </div>
  </div>

</template>

<script>
import VueKatex from 'src/components/VueKatex'

export default {
  components: {
    VueKatex
  },
  name: 'QuestionChoice',
  props: {
    choice: {
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
  margin-bottom: 18px;
  .answer-text{
    line-height: 24px;
  }
  .question-choice-number {
    margin:3px 10px 0 10px;
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
@media only screen and (max-width: 599px){
  .choice-box{
    margin-bottom: -7px;
  }
}

</style>
