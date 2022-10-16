<template>
  <div class="choice-box">
    <div class="choice-number-box">
      <div
        name="question-choice-number"
        class="question-choice-number"
        :class="[choice.answer ? 'correct-answer' : 'wrong-answer', isLtr ? 'ltr-margin' : 'rtl-margin']"
      >
        {{ choice.number }}
      </div>
    </div>
    <div
      name="answer-text"
      class="answer-text"
    >
      <vue-katex :input="choice.title" />
    </div>
  </div>
</template>

<script>
import VueKatex from 'src/components/VueKatex'

export default {
  name: 'MultipleChoicesTemplate',
  components: {
    VueKatex
  },
  props: {
    choice: {
      types: '',
      default: ''
    },
    isLtr: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.choice-box{
  display: flex;
  align-items: flex-start;
  margin-bottom: 42px;

  @media only screen and (max-width: 1023px) {
    margin-bottom: 32px;
  }

  @media only screen and (max-width: 1023px) {
    margin-bottom: 12px;
  }
  .choice-number-box{
    height: var(--katexLineHeight);
    display: flex;
    align-items: center;
  }
  .answer-text {
    &:deep(.html-katex) {
      p {
        margin-bottom: 0;
      }
    }
  }

  .question-choice-number {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    color: #ffffff;
    min-width: 20px;
    height: 20px;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    &.ltr-margin{
      margin-left: 8px;
    }
    &.rtl-margin{
      margin-right: 8px;
    }

    @media only screen and (max-width: 1023px) {
      margin-right: 10px;
    }
  }
  .correct-answer {
    background: #4CAF50;
  }
  .wrong-answer {
    background: #9690E4;
  }
}

</style>
