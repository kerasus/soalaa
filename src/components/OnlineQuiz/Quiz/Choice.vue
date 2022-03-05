<template>
  <div class="answer-box"
    @click="answerClicked"
  >
    <div :class="{ 'answer-sheet': true, active: isSelected , 'bg-deep-purple-1': isSelected }">
      <div class="answer-text renderedPanel"
      >
        <vue-katex :input="choice.title" :ltr="!isRtl" />
      </div>
      <div class="answer-checkbox">
        <q-checkbox
          dense
          @click="answerClicked"
          size="60px"
          v-model="isSelected"
         />
      </div>
  </div>
  </div>
</template>

<script>
import { mixinQuiz } from 'src/mixin/Mixins'
import 'src/assets/scss/markdownKatex.scss'
import VueKatex from 'src/components/VueKatex'

export default {
  name: 'Choice',
  components: {
    VueKatex
  },
  mixins: [mixinQuiz],
  props: ['choice', 'questionId', 'isRtl'],
  computed: {
    isSelected () {
      return this.getUserQuestionData(this.quiz.id, this.questionId) && this.choice.id === this.getUserQuestionData(this.quiz.id, this.questionId).answered_choice_id
    }
  },
  methods: {
    answerClicked () {
      this.$emit('answerClicked', { questionId: this.questionId, choiceId: this.choice.id })
    }
  }
}
</script>

<style lang="scss">
    .answer-box .mdi-checkbox-marked::before,
    .answer-box .mdi-checkbox-blank-outline {
        size: 40px;
        font-size: 40px;
    }
    .answer-sheet.active .theme--light.q-input--selection-controls.q-input--is-disabled:not(.q-input--indeterminate) .q-icon {
        color: #d1c4e9 !important;
    }
    .answer-sheet.active {
        box-shadow: 0 3px 5px -1px rgba(150, 144, 228, 0.3), 0 5px 8px 0 rgba(150, 144, 228, 0.06), 0 1px 14px 0 rgba(150, 144, 228, 0.02) !important;
    }

    .answer-sheet p {
        margin-bottom: 0;
    }
</style>

<style scoped>

    .answer-box {
        display: flex;
        justify-content: center;
        min-height: 100px;
        align-items: center;
    }

    .answer-sheet {
        background: #fff;
        width: 100%;
        min-height: 130px;
        height: max-content;
        border-radius: 20px;
        cursor: pointer;
        transition: all ease 0.3s;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
    }

    .answer-text {
        height: max-content;
        width: 100%;
        color: #777;
        padding-left: 30px;
        display: block;
    }
    .answer-text .mesra {
      max-width: 100%;
    }
    .answer-sheet.active {
        /*background: #fffaee;*/
    }

    .answer-text {
        height: max-content;
        width: 100%;
    }

    .answer-checkbox {
        height: 70px;
        width: 85px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all ease-in-out 0.3s;
    }
</style>
