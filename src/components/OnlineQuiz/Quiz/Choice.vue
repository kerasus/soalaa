<template>
  <div
    class="answer-box col-md-6 col-12"
    @click="answerClicked"
  >
<!--   reminder: too class q-feild active is selected on she -->
    <q-field  :class="{ 'answer-sheet': true, active: isSelected }">
      <div
        class="answer-text renderedPanel"
      >
        یاریگر – مردان کامل – هم‌ردیف
<!--&lt;!&ndash;        <vue-katex :input="choice.title" :ltr="!isRtl" />&ndash;&gt;-->
      </div>
      <div class="answer-checkbox">
        <q-checkbox
          size="xl"
         model-value="isSelected"/>
<!--&lt;!&ndash;        v-model="isSelected"&ndash;&gt;-->
      </div>
    </q-field>
  </div>
</template>

<script>
import { mixinQuiz } from 'src/mixin/Mixins'
// import 'src/assets/scss/markdownKatex.scss'
// import VueKatex from 'src/components/VueKatex'

export default {
  name: 'Choice',
  components: {
    // VueKatex
  },
  mixins: [mixinQuiz],
  props: ['choice', 'questionId', 'isRtl'],
  data: function () {
    return {
      selected: false
    }
  },
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

<style>
    .answer-box .mdi-checkbox-marked::before,
    .answer-box .mdi-checkbox-blank-outline {
        size: 40px;
        font-size: 40px;
    }
    .answer-sheet.active .theme--light.q-input--selection-controls.q-input--is-disabled:not(.q-input--indeterminate) .q-icon {
        color: #fbc10c !important;
    }
    .answer-sheet.active {
        box-shadow: 0 3px 5px -1px rgba(255, 191, 7, 0.10), 0 5px 8px 0 rgba(255, 191, 7, 0.06), 0 1px 14px 0 rgba(255, 191, 7, 0.02) !important;
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
        padding: 12px 12px 12px 12px;
    }

    .answer-sheet {
        background: #fff;
        width: 100%;
        min-height: 130px;
        height: max-content;
        padding: 2% 3%;
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

    .answer-sheet.active {
        background: #fffaee;
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
